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
const env = process.env.NODE_ENV || 'development'
const config = { port: (env !== 'test') ? 4244 : 8899 }

debug('In', env, 'environment')

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
app.use(fileUpload({ createParentPath: true }))

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

app.exit = () => {
  process.exit(0)
}

module.exports = app
