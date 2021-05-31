const validator         = require('validator');
const { ADMIN_AUTH, HTTPS_ERROR }   = require('../plugin/firebase');
const MDB_USER          = require('../models/MDB_USER');
const MDB_USER_SECRET   = require('../models/MDB_USER_SECRET');
const _MDB_USER         = new MDB_USER();
const ADMIN_ACCESS_CODE = '0SlO051O';
const FieldValue        = require("firebase-admin").firestore.FieldValue;
const STAT_CLASS        = require('../classess/StatClass');
const MAIL_CLASS        = require('../classess/MailClass');

module.exports = class AccountClass
{
    constructor()
    {
        this.mail_class = new MAIL_CLASS();   
    }

    /**
     * ~> Promotes a (/users) to an administrator
     * @param {string} uid              id of the user
     * @param {string} access_code      password to promote a user 
     */
    async promoteToAdmin(uid, access_code)
    {
        if (access_code === ADMIN_ACCESS_CODE)
        {
            return await _MDB_USER.update(uid, { admin: true, developer: true });
        }
        else
        {
            HTTPS_ERROR('failed-precondition', 'Invalid Access Code');
        }
    }

    /**
     * ~> Updates the profile of a (/users)
     * @param {string} uid                      id of the user
     * @param {object} data                     update parameters
     * @param {string} data.profile_picture     profile picture
     * @param {object} data.country             country
     * @param {string} data.country.name        country name
     * @param {string} data.country.code        country code
     * @param {string} data.contact_number      contact number
     */
    async updateProfile(uid, data)
    {
        let update =
        {
            profile_picture: data.profile_picture,
            country: data.country,
            contact_number: data.contact_number,
        }

        await _MDB_USER.update(uid, update);
        await _MDB_USER.syncSlot(uid);
    }

    /**
     * ~> Registers a new (/users) 
     * @param {object} data                     data container
     * @param {string} data.full_name           full name of user 
     * @param {string} data.gender              gender of user`
     * @param {string} data.email               email of user`
     * @param {string} data.password            password of user 
     * @param {object} data.country             country
     * @param {string} data.country.code        country code of user
     * @param {string} data.country.name        country name of user
     * @param {string} data.contact_number      contact number of user
     */
    async createAccount(data)
    {
        let res         = 0;
        data.full_name  = data.full_name.trim();
        data.email      = data.email.trim().toLowerCase();

        if(!validator.isLength(data.full_name, 3) || !validator.isLength(data.gender, 1) || !validator.isLength(data.email, 1 || !validator.isLength(data.password, 1)))
        {
            HTTPS_ERROR('failed-precondition', 'All fields with * are required.');
        }
        else if(!validator.isEmail(data.email))
        {
            HTTPS_ERROR('failed-precondition', 'Invalid e-mail format.');
        }
        else if(await _MDB_USER.checkEmailExist(data.email))
        {
            HTTPS_ERROR('failed-precondition', 'The email you are trying to use was already used.');
        }
        else
        {
            /* CREATE AUTH ACCOUNT */
            const create_user = await ADMIN_AUTH.createUser({ email : data.email, password: data.password, displayName: data.full_name }).then(function(userRecord)
            {
                return { data : userRecord.toJSON(), error: null }
            }).catch(function (error)
            {
                HTTPS_ERROR('invalid-argument', error.errorInfo.message)
            });

            /* RECORD ACCOUNT TO DB */
            let user_data            = {};
            user_data.full_name      = data.full_name;
            user_data.email          = data.email;
            user_data.gender         = data.gender;
            user_data.country        = data.country;
            user_data.country_code   = data.country.code;
            user_data.contact_number = data.contact_number;
            user_data.uid            = create_user.data.uid;
            user_data.status         = "active";
            user_data.slot_owned     = 0;
            user_data.total_earnings = 0;
            user_data.wallet         = 0;
            user_data.created_date   = new Date();
            user_data.filters        = [user_data.full_name.toLowerCase(), user_data.email.toLowerCase(), user_data.uid];

            if(data.hasOwnProperty('sponsor'))
            {
                user_data.sponsor = data.sponsor;
            }

            let r1                   = _MDB_USER.update(user_data.uid, user_data);
            let r2                   = new MDB_USER_SECRET(user_data.uid).update('password', { value: data.password });
            
            /* record member stats */
            let update               = { count : FieldValue.increment(1) };
            let q_stat               = new STAT_CLASS('members').record(update);

            await Promise.all([r1, r2, q_stat]);
            await Promise.all([r1, r2]);

            res                      = user_data.uid;
        }

        return res;
    }

    /**
     * ~> Information of existing (/users)
     * @param {object} data                     data container
     * @param {string} data.id                  user id
     * @param {string} data.name                full name of user 
     * @param {string} data.contact_number      contact number of user
     * @param {object} data.country             country of user 
     * @param {string} data.country.code        country code of user
     * @param {string} data.country.name        country name of user
     * @param {string} data.secret              password for the user account
     */
    async updateAccount(data)        
    {
        data.name  = data.name.trim();
        if(!validator.isLength(data.name, 3))
        {
            HTTPS_ERROR('failed-precondition', 'Invalid Name.');
        }
        else if(!validator.isLength(data.contactNumber, 3))
        {
            HTTPS_ERROR('failed-precondition', 'Invalid contact number.');
        }
        else
        {
            let update_data = { full_name: data.name, contact_number: data.contactNumber, country: { code: data.country.code, name: data.country.name}, gender: data.gender };
            await _MDB_USER.update(data.id, update_data);
            await _MDB_USER.syncSlot(data.id);

            await new MDB_USER_SECRET(data.id).update('password', { value: data.secret });
            await ADMIN_AUTH.updateUser(data.id, { password: data.secret }).catch(function (error)
            {
                HTTPS_ERROR('invalid-argument', error.errorInfo.message)
            });
        }
    }

    /**
     * ~> Block/Activate account of (/user)
     * @param {object} data             data container
     * @param {string} data.id          id of user to block/activate
     * @param {string} data.status      current status of the user
     */
    async blockingAccount(data)
    {
        let pasdata={};

        if(data.status=="active" || data.status=="deactivated")
        {                   
            const block_user = await ADMIN_AUTH.updateUser(data.id, {disabled: true}).then(function()
            {
                pasdata.status= "blocked"; 
               _MDB_USER.update(data.id, pasdata);
            }).catch(function (error)
            {
                HTTPS_ERROR('invalid-argument', error.errorInfo.message)
            });
                    
        }
        else
        {
            const block_user = await ADMIN_AUTH.updateUser(data.id, {disabled: false}).then(function()
            {
                pasdata.status= "active";
                _MDB_USER.update(data.id, pasdata);
            }).catch(function (error)
            {
                HTTPS_ERROR('invalid-argument', error.errorInfo.message)
            });
        }
    }

    /**
     * ~> Activate/Deactivate account of (/user)
     * @param {object} data             data container
     * @param {string} data.id          id of user to deactivate/activate
     * @param {string} data.status      current status of the user
     */
    async deactivatingAccount(data)
    {
        
        if(data.status=="active" || data.status=="blocked")
        {   
            let pasdat ={};
            pasdat.status="deactivated";
            const deactivate_user = await ADMIN_AUTH.updateUser(data.id, {disabled: false}).catch(function (error)
            {
                HTTPS_ERROR('invalid-argument', error.errorInfo.message)
            });
            await _MDB_USER.update(data.id, pasdat);
        }
        else
        {
            let pasdat ={};
            pasdat.status="active";
            await _MDB_USER.update(data.id, pasdat);
        }
    }

    /**
     * ~> Change Password of (/users)
     * @param {object} data
     * @param {string} data.uid                 id of user that will update password
     * @param {string} data.old_password        old password of the user
     * @param {string} data.new_password        new password of the user
     * @param {string} data.confirm_password    new password confirmation
     */
    async changingPassword(data)
    {
        let secret="";
        secret = await new MDB_USER_SECRET(data.uid).get('password');
        if(data.old_password != secret.value)
        {
            HTTPS_ERROR('failed-precondition', 'Old Password doesn\'t Match.');
        }
        else
        {
            if(!validator.isLength(data.new_password, 1))
            {
                 HTTPS_ERROR('failed-precondition', 'Your password must be at least 1 characters long. Please try another');
            }
            else
            {
               if (data.new_password != data.confirm_password)
                {
                    HTTPS_ERROR('failed-precondition', 'The specified new password do not match.');

                }
                else
                {
                   await new MDB_USER_SECRET(data.uid).update('password', { value: data.new_password });

                   const update_user = await ADMIN_AUTH.updateUser(data.uid, {password: data.new_password}).catch(function (error)
                    {
                        HTTPS_ERROR('invalid-argument', error.errorInfo.message)
                    });
                    
                }
            }
        }
    }

    /**
     * ~> Forgot Password
     * @param {object} email    email of the user who forgot the password
     * @returns {string}        return password change code
     */
    async forgotPass(email)
    {
        let code    = this.makeCode();
        let message = '<p style="font-size: 16px;">Please use the following code to reset your password < '+ code +' ><br/>If you did not request this password change please feel free to ignore it.<br/><br/>thank you,</p>';
        let user_info = await ADMIN_AUTH.getUserByEmail(email).then(async function() {
        let details = await ADMIN_AUTH.getUserByEmail(email);
        let update =  await new MDB_USER_SECRET(details.uid).update('password_reset_code', { value: code });
        let subject = 'Reset your Password';
        let send = await new MAIL_CLASS().sendEmail(email, message, subject);
        
        }).catch(async function (error)
        {
            HTTPS_ERROR('invalid-argument', error.message)
        });

        return code;
    }

    /**
     * ~> Generate a random string
     * @returns {string}
     */
    makeCode()
    {
        let result = '';
        let characters='0123456789';
        let charLength=characters.length;

        for ( var i = 0; i < 6; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charLength));
        }
        return (result);
    }

    async verifyingCode(data)
    {
        let details = await ADMIN_AUTH.getUserByEmail(data.email);
        let det = await new MDB_USER_SECRET(details.uid).get('password_reset_code');
        let iscodecorrect = "";
        if (det.value==data.code)
            {
                iscodecorrect = true;
                let pasData={};
                pasData.uid=details.uid;
                pasData.iscodecorrect=iscodecorrect;
                
                return pasData;
            }
            else
            {
                HTTPS_ERROR('failed-precondition', 'Verification code did not match.');                
            }
        
    }
    async resettingPassword(data)
    {   
        if(!validator.isLength(data.new_password, 1))
        {
                HTTPS_ERROR('failed-precondition', 'Your password must be at least 1 characters long. Please try another.');
        }
        else
        {
            if (data.new_password != data.confirm_password)
            {
                HTTPS_ERROR('failed-precondition', 'The specified new password do not match.');

            }
            else
            {
                await new MDB_USER_SECRET(data.uid).update('password', { value: data.new_password });

                const update_user = await ADMIN_AUTH.updateUser(data.uid, {password: data.new_password}).catch(function (error)
                {
                    HTTPS_ERROR('invalid-argument', error.errorInfo.message)
                })
            }
        }
    }
}