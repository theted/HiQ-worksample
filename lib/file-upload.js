const path = require('path')

/**
 * Upload file(s)
 */
const uploadFiles = async files => {
  const uploadedFiles = []

  for (const file of files) {
    const fullName =  path.join(__dirname, '../uploads', file.name)
    file.mv(fullName)
    uploadedFiles.push(fullName)
  }

  return uploadedFiles
}

module.exports = { uploadFiles }
