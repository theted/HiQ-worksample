const { processText } = require('../lib/file-processor.js')

const ALLOWED_MIMES = [
  'text/plain'
]

const processFiles = async (files) => {
  const promises = files.map(file => processText(file.data.toString()))
  return await Promise.all(promises)
}

// checking mimetype is not really a sane way of sanitizing files..
const sanitizeFiles = files => files.filter(file =>
  ALLOWED_MIMES.includes(file.mimetype)
)

const upload = async (req, res) => {
  if (!req.files) return res.status(400).send('No files were uploaded.')
  const saneFiles = sanitizeFiles(Object.values(req.files))
  if(!saneFiles.length) return res.send('No valid files uploaded')
  const promisedResults = await processFiles(saneFiles)
  return res.send(promisedResults.join('\n').trim())
}

module.exports = { upload }
