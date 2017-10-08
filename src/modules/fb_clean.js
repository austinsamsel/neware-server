import admin from 'firebase-admin'
import winston from 'winston'

// CONFIGURATION
require('dotenv').config() // helps parse config
require('../config/firebase/live_server') // firebase config

const db = admin.database()
const one_day = 1000 * 60 * 60 * 24
//const five_min  = 1000 * 60 * 5 // for testing
const one_min = 1000 * 60 * 1 // for testing

const cutoff = Date.now() - one_day
// TODO: tests should say we are measuring one day.

const clean = notes => {
  // delete old posts

  //winston.info('invoked notes()')
  const count_total = []
  const count_deleted = []

  const ref_notes = db.ref(`${notes}`)
  ref_notes.on('value', snapshot => {
    const channel_name = snapshot.key
    winston.info('indexing: ', channel_name)

    snapshot.forEach(child_snap => {
      const key_id = child_snap.key
      count_total.push(child_snap.val().createdAt)
      if (child_snap.val().createdAt < cutoff) {
        winston.info('deleting: ', channel_name, key_id)
        count_deleted.push(child_snap)
        console.log(`${notes}/${channel_name}/${key_id}`)
        db.ref(`${channel_name}/${key_id}`).remove()
      }
    })
    winston.info('total scanned: ', count_total.length)
    winston.info('total deleted: ', count_deleted.length)
  })

  // admin.database().ref('notes').update({
  //   channelname01: {
  //     somecrazyid1: {
  //       createdAt: 0,
  //       text: 'hi'
  //     }
  //   },
  //   channelname02: {
  //     somecrazyid2: {
  //       createdAt: 1,
  //       text: 'hi'
  //     }
  //   },
  //   channelname03: {
  //     somecrazyid3: {
  //       createdAt: 1,
  //       text: 'hi'
  //     }
  //   },
  // });
}

module.exports = {
  clean
}
