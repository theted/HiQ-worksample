const express = require('express')
const router = express.Router()
const controller = require('../controllers/upload.js')

router.get('/', (req, res) => res.send('Upload file please'))
router.post('/', controller.upload)

module.exports = router
