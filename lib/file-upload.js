/**
 * Upload file(s)
 */
const uploadFiles = async files => {
  let uploadedFiles = []

  for (let file of files) {
    let fullName = '../uploads/' + file.name
    file.mv(fullName)
    uploadedFiles.push(fullName)
  }

  return uploadedFiles
}

module.exports = { uploadFiles }
