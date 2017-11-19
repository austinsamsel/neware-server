// SERVER
import express from 'express'
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')

// LOGS
// require('now-logs')(process.env.LOGS_SECRET)

// IMPORT ROUTES
import root_route from './routes/root.js'

// FIREBASE
const fb_clean = require('./modules/fb_clean.js')

// SET UP APP
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.set('port', process.env.PORT || 5000)

// SET UP ROUTES
const router = express.Router()
root_route(app, router)

// REGISTER OUR ROUTES
app.use('/', router)

// START THE SERVER
app.listen(app.get('port'), function() {
  console.log('Magic happens on port ' + app.get('port'))
  // run firebase cleaner
  fb_clean.clean('notes')
})
