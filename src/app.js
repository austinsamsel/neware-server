// import admin from 'firebase-admin'
import express from 'express';
const app = express();
require('dotenv').config()   // helps parse config
require('./config/firebase/live_server') // firebase config
// firebase service worker: clean old posts
const fb_clean = require('./modules/fb_clean');

app.set('port', (process.env.PORT || 5000));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (request, response) {
  const greeting = process.env.GREETING;
  response.writeHead(200)
  response.end(greeting)
});

// To run on server startup
const startup = () => {
  //start firebase clean up.
  fb_clean.clean('notes');   
}
// listen for requests :)
// we'll ping every 24 hours.
// which will kick off all the firebase stuff.
app.listen(app.get('port'), function() {
  console.log('Your app is listening on port ' + app.get('port'));
  startup();
});


