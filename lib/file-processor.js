/**
 * File processing methods
 */

const fs = require('fs')
const util = require('util')
const readFile = util.promisify(fs.readFile)
const { sortProperties } = require('./utils.js')


/**
 * Count words in a block of text
 */
const countWords = (content) => {
  let words = String(content).replace(/\n/g, " ").split(" ")
  let count = {}

  words.forEach(word => {
    word = word.toLowerCase().replace(/[^a-z]/gi, '') // rempve non-alpha characters
    if (word.length > 1) {
      count[word] = (count[word]) ? count[word] + 1 : 1
    }
  })

  return count
}

/**
 * Get the most commonly occuring word in a text content
 */
const getMostPopularWord = async (content) => {
  let countedWords = countWords(content)
  let sorted = sortProperties(countedWords)
  let mostPopularWord = sorted[0][0]

  // support for 2 of the same popular word
  // TODO: add support for arbitrary number of words..
  if (mostPopularWord === sorted[1][0]) return [mostPopularWord, sorted[1][0]]
  return mostPopularWord
}

const replaceAllWords = (contents, find, replace) => {
  let re = new RegExp(find, 'ig')
  return String(contents).replace(re, replace)
}

const processFile = async (path) => {
  let contents = await readFile(path)
  let popularWord = await getMostPopularWord(contents)
  let replace = 'foo' + popularWord + 'bar'

  // TODO: add support for multiple popular words

  return replaceAllWords(contents, popularWord, replace)
}

module.exports = {
  countWords,
  getMostPopularWord,
  processFile
}
