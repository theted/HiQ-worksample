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
  const words = String(content).replace(/\n/g, ' ').split(' ')
  const count = {}

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
 * TODO: fix corner-case when the most common word is `foo` or `bar`
 */
const getMostPopularWord = async (content) => {
  const countedWords = countWords(content)
  const sorted = sortProperties(countedWords)
  let hasMoreWordsOfSameOccurence = true
  let position = 0
  const allWords = []

  // check if we have multiple words of the same occurence
  while (hasMoreWordsOfSameOccurence) {
    if (sorted[position][1] === sorted[0][1]) {
      allWords.push(sorted[position][0])
      ++position
    } else {
      hasMoreWordsOfSameOccurence = false
    }
  }

  console.log('Now have all words:', allWords)

  return allWords
}

/**
 * Replace all occurencies of a word within a string - case insensitive
 */
const replaceAllWords = (contents, find, replace) => {
  const re = new RegExp('\\b' + find + '\\b', 'ig')
  return String(contents).replace(re, replace)
}

/**
 * Replace all occurenies of the most popular word(s) with `foo`word`bar`
 */
const processFile = async (path) => {
  let contents = await readFile(path)
  const popularWord = await getMostPopularWord(contents)

  for (const word of popularWord) {
    const replace = 'foo' + word + 'bar'
    contents = replaceAllWords(contents, word, replace)
  }

  return contents
}

module.exports = {
  countWords,
  getMostPopularWord,
  processFile
}
