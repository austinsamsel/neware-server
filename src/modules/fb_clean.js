import admin from 'firebase-admin'
import winston from 'winston'
import moment from 'moment'

// CONFIGURATION
require('dotenv').config() // helps parse config
require('../config/firebase/live_server') // firebase config

const db = admin.database()

const olderThanADay = the_date => {
  return moment(the_date).add(1, 'days') < moment().valueOf()
}

const clean = notes => {
  const count_total = []
  const count_deleted = []

  const ref_notes = db.ref(`${notes}`)
  ref_notes.on('value', snapshot => {
    const channel_name = snapshot.key
    winston.info('indexing: ', channel_name)

    snapshot.forEach(child_snap => {
      const key_id = child_snap.key
      const createdAt = child_snap.val().createdAt
      count_total.push(createdAt)

      if (olderThanADay(createdAt)) {
        winston.info('deleting: ', channel_name, key_id)
        count_deleted.push(child_snap)
        db.ref(`${channel_name}/${key_id}`).remove()
      }
    })
    winston.info('total scanned: ', count_total.length)
    winston.info('total deleted: ', count_deleted.length)
  })
}

module.exports = {
  clean
}
