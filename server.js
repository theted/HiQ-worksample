/**
 * Server
 */

const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const helmet = require('helmet')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const debug = require('debug')('app')
const app = express()
const config = { port: 4244 }

require('dotenv').config()

// set filesize limits
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true
}))

// allow CORS
app.use(cors())

// safety first
app.use(helmet())

// enable files upload
app.use(fileUpload({ createParentPath: true, debug: true }))

// serve static files
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'src')))

// setup routes
app.use('/upload', require('./routes/upload'))

// serve index.html to all other GET requests
app.get('/*', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

// start server
app.listen(config.port, () => debug('Server runining @ port ' + config.port))
