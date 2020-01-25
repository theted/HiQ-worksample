/**
 * Upload file(s)
 */
const uploadFiles = async files => {
  const uploadedFiles = []

  for (const file of files) {
    const fullName = '../uploads/' + file.name
    file.mv(fullName)
    uploadedFiles.push(fullName)
  }

  return uploadedFiles
}

module.exports = { uploadFiles }
