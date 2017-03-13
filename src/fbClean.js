// var firebase = require('firebase');

// module.exports = {
//   init: function() {
  
//     // Initialize the app with a service account, granting admin privileges
//     firebase.initializeApp({
//       databaseURL: "https://anywhere-32729.firebaseio.com",
//       serviceAccount: "fb_config.json"
//     });
    
//   },
  
//   clean: function(){
//     var db = firebase.database();
//     var ref = db.ref('channel');
//     // posts older than 24 hours.
//     var cutoff = Date.now() - 60 * 60 * 24 * 1000; // 24 hr old.
    
//     ref.on("child_added", function(snapshot) {
//       var channelName = snapshot.key;
//       snapshot.forEach(function(childSnap) {
//         var key = childSnap.key;
//         if(childSnap.val().createdAt < cutoff){
//           db.ref('channel/' + channelName + '/' + key).remove();
//         }
//       });
//     });
    
//     // delete old posts from redux version as well.
//     var refNotes = db.ref('notes');
//     refNotes.on("child_added", function(snapshot) {
//       var channelName = snapshot.key;
//       snapshot.forEach(function(childSnap) {
//         var key = childSnap.key;
//         if(childSnap.val().createdAt < cutoff){
//           db.ref('notes/' + channelName + '/' + key).remove();
//         }
//       });
//     });
    
//   }
  
// };