const validator         = require('validator');
const { ADMIN_AUTH, HTTPS_ERROR }   = require('../plugin/firebase');
const ADMIN_ACCESS_CODE = '0SlO051O';
const MDB_USER_SECRET          = require('../models/MDB_USER_SECRET');
const MDB_USER          = require('../models/MDB_USER');
const _MDB_USER         = new MDB_USER();
const FieldValue        = require("firebase-admin").firestore.FieldValue;

module.exports = class AccountClass
{
    constructor()
    {
    }

    async createAccount(data)
    {
        let res         = 0;
        data.email      = data.email.trim().toLowerCase();
        data.first_name      = data.first_name.trim();
        data.last_name          = data.last_name.trim();
        data.phone_number    = data.phone_number.trim();
        data.address    = data.phone_number.trim();
        if(!validator.isLength(data.first_name, 3) || !validator.isLength(data.last_name, 3) || !validator.isLength(data.email, 1) || !validator.isLength(data.phone_number, 1) || !validator.isLength(data.address, 3))
        {
            HTTPS_ERROR('failed-precondition', 'All fields with * are required.');
        }
        else if(!validator.isEmail(data.email))
        {
            HTTPS_ERROR('failed-precondition', 'Invalid e-mail format.');
        }
        else if(data.password.length < 6)
        {
            HTTPS_ERROR('failed-precondition', 'Password must contains 6 characters.');
        }
        else if(!validator.isMobilePhone(data.phone_number, 'en-PH'))
        {
            HTTPS_ERROR('failed-precondition', 'Invalid phone number.');
        }
        else if(await _MDB_USER.checkEmailExist(data.email))
        {
            HTTPS_ERROR('failed-precondition', 'The email you are trying to use was already used.');
        }
        else
        {
            const create_user = await ADMIN_AUTH.createUser({ email : data.email, password: data.password, displayName: data.first_name+" "+data.last_name }).then(function(userRecord)
            {
                return { data : userRecord.toJSON(), error: null }
            }).catch(function (error)
            {
                HTTPS_ERROR('invalid-argument', error.errorInfo.message)
            });

            let user_data            = {};
            user_data.full_name      = data.first_name+" "+data.last_name;
            user_data.first_name     = data.first_name;
            user_data.last_name      = data.last_name;
            user_data.email          = data.email;
            user_data.contact_number = data.phone_number;
            user_data.uid            = create_user.data.uid;
            user_data.created_date   = new Date();
            user_data.filters        = [user_data.full_name.toLowerCase(), user_data.email.toLowerCase(), user_data.uid];


            let filtername = user_data.full_name.toLowerCase()+ " " +user_data.email.toLowerCase();
            let generated_keywords = this.createKeywords(filtername);
            user_data.keywords = generated_keywords;

            let r1                   = _MDB_USER.update(user_data.uid, user_data);
            let r2                   = new MDB_USER_SECRET(user_data.uid).update('password', { value: data.password });
            
        //     /* record member stats */
        //     let update               = { count : FieldValue.increment(1) };
        //     // let q_stat               = new STAT_CLASS('members').record(update);

            await Promise.all([r1, r2]);
            res                      = user_data.uid;
        }
        // console.log('natapos');
        return res;
    }
    createKeywords(filtername)
    {
        let result = new Set(
        [
            ''
        ]);
        const createKeywords = (name) =>
        {
            const arrName = [];
            let curName = '';
                
            name.split('').forEach((letter) =>
            {
                curName += letter;
                arrName.push(curName);
            });

            return arrName;
        }

        if (filtername)
        {
            let splitted_product_name = filtername.toLowerCase().split(' ');
            let keywords = [];
            keywords.push(splitted_product_name.join(' '));
            for (let i = 0; i < splitted_product_name.length - 1; i++)
            {
                let new_product_name = splitted_product_name.slice();
                let array_to_be_removed = [];    

                for (let new_i = i; new_i >= 0; new_i--)
                {
                    array_to_be_removed.push(new_i);
                }
                    
                new_product_name = new_product_name.filter((value, index) =>
                {
                    return array_to_be_removed.indexOf(index) == -1;
                })

                keywords.push(new_product_name.join(' '));
            }
            keywords.forEach(keyword =>
            {
                let generated_keywords = createKeywords(keyword);

                generated_keywords.forEach(keyword =>
                {
                    if(result.size<1000) result.add(keyword);
                });
            });
        }
        return Array.from(result);
    }
}