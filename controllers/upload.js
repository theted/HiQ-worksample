const { uploadFiles } = require('../lib/file-upload.js')
const { processFile } = require('../lib/file-processor.js')

const upload = async (req, res) => {
  if (!req.files) return res.status(400).send('No files were uploaded.')
  let files = req.files.data
  if (!Array.isArray(files)) files = [files]

  let allResults = await uploadFiles(files)
  let output = await processFile(allResults[0])

  return res.send(output)
}

module.exports = { upload }
