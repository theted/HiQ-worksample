/**
 * File processing methods
 */

const fs = require('fs')

const countWords = async (content) => {
  let words = content.split('')
  let count = {}
  console.log('Got words:', words)

  words.forEach(word => {
    count[word] += 1
  })

  return count
}

const getMostPopularWord = async (content) => {
  let countedWords = await countWords(content)

  // sort list
  // return most popular word
  return countedWords
}

const processFile = async (fullName) => {
  // read the file
  fs.readFile(fullName, 'utf8', function (err, contents) {
    if (err) console.log('ERR:', err)
    console.log(contents)

    // process file
    let mostPopular = getMostPopularWord(contents)
    console.log(mostPopular)
    return contents
  })
}

module.exports = {
  countWords,
  getMostPopularWord,
  processFile
}
