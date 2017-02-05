const admin = require('firebase-admin')

const fb_key = process.env.FIREBASE_KEY
const fb_suffix = 'END PRIVATE KEY-----\n'
const fb_concat = fb_key + fb_suffix 
const firebase_key = fb_concat.replace(/\\n/g, '\n')

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_ID,
    clientEmail: process.env.FIREBASE_EMAIL,
    //privateKey: fb_replace
    privateKey: firebase_key
  }),
  databaseURL: process.env.FIREBASE_URL
});
//

// const serviceAccount = require('./config.json');
//
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: 'https://anywhere-32729.firebaseio.com'
// });
//
