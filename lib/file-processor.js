/**
 * File processing methods
 */

const fs = require('fs')
const util = require('util')
const readFile = util.promisify(fs.readFile)
const { sortProperties } = require('./utils.js')

const countWords = (content) => {
  let words = String(content).split(' ')
  let count = {}

  words.forEach(word => {
    word = word.toLowerCase().replace(/[^a-z]/gi, '') // rempve non-alpha
    if (word.length > 1) {
      count[word] = (count[word]) ? count[word] + 1 : 1
    }
  })

  return count
}

const getMostPopularWord = async (content) => {
  let countedWords = countWords(content)
  let sorted = sortProperties(countedWords)
  let mostPopularWord = sorted[0][0]
  return mostPopularWord
}

const replaceMostPopularWord = (contents, find, replace) => {
  let re = new RegExp(find, 'ig')
  return String(contents).replace(re, replace)
}

const processFile = async (path) => {
  let contents = await readFile(path)
  let popularWord = await getMostPopularWord(contents)
  let replace = 'FOO' + popularWord + 'BAR'
  return replaceMostPopularWord(contents, popularWord, replace)
}

module.exports = {
  countWords,
  getMostPopularWord,
  processFile
}
