const ACCOUNT_CLASS = require('../classess/AccountClass');
const {HTTPS_ERROR}= require('../plugin/firebase');
module.exports =
{
    async registration(data, context)
    {
        data =
        {
            full_name           : 'Super Admin',
            contact_number      : '09171587078',
            email               : 'developer3@example.com',
            password            : 'water123',
            location            : 'Pandi',
            confirm_password    : 'water123',
            gender              : 'Male',
            country             : { name: 'Philippines', code: 'PH' },
        }
        const ACCOUNT = new ACCOUNT_CLASS();
        await ACCOUNT.createAccount(data);
         
    },
};