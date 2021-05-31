const MODEL= require("./MODEL");
const { HTTPS_ERROR } = require('../plugin/firebase');

module.exports = class MDB_USER extends MODEL
{
    constructor(uid)
    {
        super(`users/${uid}/secret`);
    }
}