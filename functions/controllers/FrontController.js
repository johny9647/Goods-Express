const ACCOUNT_CLASS = require('../classess/AccountClass');
const {HTTPS_ERROR}= require('../plugin/firebase');
module.exports =
{
    async registration(data, context)
    {
        const ACCOUNT = new ACCOUNT_CLASS();
        await ACCOUNT.createAccount(data);
         
    },
};