import admin from 'firebase-admin'

const db = admin.database();
const one_day = 1000 * 60 * 60 * 24;
//const five_min  = 1000 * 60 * 5 // for testing
const one_min  = 1000 * 60 * 1  // for testing
const cutoff = Date.now() - (one_min);

const clean = (notes) => {
  // delete old posts
  return new Promise((resolve, reject) => {
    const ref_notes = db.ref(`${notes}`);
    ref_notes.on("child_added", (snapshot) => {
      const channel_name = snapshot.key;
      snapshot.forEach( (child_snap) => {
        const key_id = child_snap.key;
        if(child_snap.val().createdAt < cutoff){
          db.ref(`${notes}/${channel_name}/${key_id}`).remove();
        }
      });
      resolve()
    })
  })
}

module.exports = {
  clean,
};