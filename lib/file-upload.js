/**
 * Upload file(s)
 */
const uploadFiles = async files => {
  let allResults = []

  let output = {
    status: true,
    files: []
  }

  for (let file of files) {
    // let fullName = __dirname + '/uploads/' + file.name
    let fullName = '/var/www/clients/hiq-worksample/' + '/uploads/' + file.name
    let name = ''

    // move the file 
    file.mv('./uploads/' + file.name)

    output.files.push({
      mimetype: file.mimetype,
      size: file.size
    })

    console.log((fullName, name, file.name))
    allResults.push(fullName)
    return fullName
  }

  return { output, allResults }
}

module.exports = { uploadFiles }
