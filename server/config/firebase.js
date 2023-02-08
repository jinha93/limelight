
var admin = require("firebase-admin");

var serviceAccount = "";
var databaseURL = "";

if (process.env.NODE_ENV === 'development') {
  serviceAccount = require("./serviceAccountKey-dev.json");
  databaseURL = "https://dev-limelight-default-rtdb.firebaseio.com"
} else {
  serviceAccount = require("./serviceAccountKey.json");
  databaseURL = "https://limelight-3fe8f-default-rtdb.firebaseio.com"
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: databaseURL
});

const database = admin.database();

module.exports = database;
