const validator         = require('validator');
const { ADMIN_AUTH, HTTPS_ERROR }   = require('../plugin/firebase');
const ADMIN_ACCESS_CODE = '0SlO051O';
const FieldValue        = require("firebase-admin").firestore.FieldValue;

module.exports = class AccountClass
{
    constructor()
    {
        this.mail_class = new MAIL_CLASS();   
    }

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

}