const express = require('express')
const router = express.Router()
const controller = require('../controllers/upload.js')

router.post('/', controller.upload)

module.exports = router
