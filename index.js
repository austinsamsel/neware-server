const micro = require('micro')
require('dotenv').config()
const admin = require('firebase-admin')
const firebase_config = require('./config/firebase')

const server = micro(async (req, res) => {
  const greeting = process.env.GREETING;
  res.writeHead(200)
  res.end(greeting)
})

server.listen(3000)

console.log('hi')

//console.log(process.env.FIREBASE_KEY.replace(/\\n/g, '\n'))

var db = admin.database();
var ref = db.ref("testttt");

var usersRef = ref.child("test_users");
usersRef.set({
  alanisawesome: {
      date_of_birth: "June 23, 1912",
      full_name: "Alan Turing"
    },
  gracehop: {
      date_of_birth: "December 9, 1906",
      full_name: "Grace Hopper"
    }
});
