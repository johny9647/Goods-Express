const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const FUNCTIONS_REGION              = functions.region('asia-northeast1');
const FUNCTIONS_HTTPS               = FUNCTIONS_REGION.https; // FUNCTIONS.https

/* FRONT ROUTES */
const front_controller              = require('./controllers/FrontController');
exports.frontRegistration           = FUNCTIONS_HTTPS.onCall(front_controller.registration);
