const admin = require('firebase-admin')

const db = admin.database();
const ref = db.ref('channel');
const cutoff = Date.now() - (1000 * 60 * 60 * 24); // 24 hr old.
// 24 hours:  1000 * 60 * 60 * 24
// 5 minutes: 1000 * 60 * 5

const clean = () => {
  console.log('cleaning')
  ref.on("child_added", function(snapshot) {
    var channelName = snapshot.key;
    snapshot.forEach(function(childSnap) {
      var key = childSnap.key;
      if(childSnap.val().createdAt < cutoff){
        db.ref('channel/' + channelName + '/' + key).remove();
      }
    });
  });
  
  // delete old posts from redux version as well.
  var refNotes = db.ref('notes');
  refNotes.on("child_added", function(snapshot) {
    var channelName = snapshot.key;
    snapshot.forEach(function(childSnap) {
      var key = childSnap.key;
      if(childSnap.val().createdAt < cutoff){
        db.ref('notes/' + channelName + '/' + key).remove();
      }
    });
  });
}

module.exports = {
  clean,
};