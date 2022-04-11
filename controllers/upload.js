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

  // const allResults = await uploadFiles(files)
  const rawResults = await processRaw(files)

  // debug
  // const contents = await readFile(allResults[0])
  const contents = rawResults
  console.log({contents})

  // TODO: support for multiple files
  const output = await processText(contents)
  // const output = await processFile(allResults[0])

  return res.send(output)
}

module.exports = { upload }
