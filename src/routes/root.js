const fb_clean = require('../modules/fb_clean.js')

module.exports = function(app, router) {
  router.use((req, res, next) => {
    console.log('Something is happening.', req.query)
    next()
  })

  router.get('/', (req, res) => {
    // return json
    res.json({ message: 'welcome to the api!' })

    // run cleaner
    fb_clean.clean('notes')

    // write greeting
    const greeting = process.env.GREETING
    res.writeHead(200)
    res.end(greeting)
  })
}
