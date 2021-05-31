const dotenv = require('dotenv');
dotenv.config();

const FUNCTIONS                     = require('firebase-functions');
const nodemailer                    = require('nodemailer');
const FUNCTIONS_REGION              = FUNCTIONS.region('asia-northeast1');
const FUNCTIONS_HTTPS               = FUNCTIONS_REGION.https; // FUNCTIONS.https
const FUNCTIONS_PUBSUB              = FUNCTIONS_REGION.pubsub; // FUNCTIONS.https
const FUNCTIONS_FIRESTORE           = FUNCTIONS_REGION.firestore; // For triggers

/* FRONT ROUTES */
const front_controller              = require('./controllers/FrontController');
exports.frontRegistration           = FUNCTIONS_HTTPS.onCall(front_controller.registration);


