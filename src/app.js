// init project
var express = require('express');
var app = express();
// config
require('dotenv').config()
// firebase
const admin = require('firebase-admin')
const firebase_config = require('./config/firebase')
// firebase service worker: clean old posts
var fbClean = require('./fbClean');

app.set('port', (process.env.PORT || 5000));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  const greeting = process.env.GREETING;
  response.writeHead(200)
  response.end(greeting)
});

// To run on server startup
const startup = () => {
  // initialize firebase
  // fbClean.init()
  // start firebase clean up.
  // fbClean.clean();   
}
// listen for requests :)
// instead of setInterval or some scheduled worker...
// because hyperdev puts apps to sleep
// I'm using uptime robot to ping every 24 hours.
// which will kick off all the firebase stuff. (hopefully)
app.listen(app.get('port'), function() {
  //console.log('Your app is listening on port ' + listener.address().port);
  startup();
});

// server.listen(3000)

console.log('hi')

// var db = admin.database();
// var ref = db.ref("testttt");

// var usersRef = ref.child("test_users");
// usersRef.set({
//   alanisawesome: {
//       date_of_birth: "June 23, 1912",
//       full_name: "Alan Turing"
//     },
//   gracehop: {
//       date_of_birth: "December 9, 1906",
//       full_name: "Grace Hopper"
//     }
// });
