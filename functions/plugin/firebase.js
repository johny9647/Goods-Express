const ADMIN                     = require('firebase-admin');
const FUNCTIONS                 = require('firebase-functions');
let service_account;

let service_account_file_name   = process.env.SERVICE_ACCOUNT;
if(!service_account_file_name)
{
    service_account_file_name   = "service-account.json";
}
service_account = require("../service-accounts/" + service_account_file_name);

ADMIN.initializeApp({
    credential  : ADMIN.credential.cert(service_account),
    databaseURL : `https://${service_account.project_id}.firebaseio.com`,
});

exports.DB              = ADMIN.firestore();
exports.ADMIN_AUTH      = ADMIN.auth();
exports.SERVICE_ACCOUNT = service_account;
exports.HTTPS_ERROR = (code, message) => {throw new FUNCTIONS.https.HttpsError(code, message)};