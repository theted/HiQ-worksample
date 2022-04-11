const { uploadFiles } = require('../lib/file-upload.js')
const { processFile, processText } = require('../lib/file-processor.js')
const { readFile } = require('../lib/utils.js')

const processRaw = async (files) => {
  return files[0].data.toString()
}

const upload = async (req, res) => {
  if (!req.files) return res.status(400).send('No files were uploaded.')

  // TODO: proper support for multiple files
  let files = req.files.data

  if (!Array.isArray(files)) files = [files]

  const rawText = await processRaw(files)

  // TODO: support for multiple files
  const output = await processText(rawText)

  return res.send(output)
}

module.exports = { upload }
