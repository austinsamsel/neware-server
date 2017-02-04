const firebase = require('firebase')
const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_ID,
    clientEmail: process.env.FIREBASE_EMAIL,
    privateKey: process.env.FIREBASE_KEY.replace(/\\n/g, '\n')
  }),
  databaseURL: process.env.FIREBASE_URL
});
