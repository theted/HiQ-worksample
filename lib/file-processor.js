/**
 * File processing methods
 */
const { sortProperties, readFile } = require('./utils.js')

const splitWords = (content) => String(content).replace(/\n/g, ' ').split(' ')
const removeNonAlpha = (word) => word.toLowerCase().replace(/[^a-zåäö]/gi, '')

/**
 * Count words in a block of text
 */
const countWords = (content) => {
  const words = splitWords(content)
  const count = {}

  // TODO: reduce
  words.forEach(word => {
    word = removeNonAlpha(word)
    if (word.length > 1) {
      count[word] = (count[word]) ? count[word] + 1 : 1
    }
  })

  return count
}

/**
 * Get the most commonly occuring word(s) in a text
 */
const getMostPopularWord = async (content) => {
  const countedWords = countWords(content)
  const sorted = sortProperties(countedWords)

  // TODO: remove sort
  // find max number of word occurencies
  let mostPopularOccurencies = 0;
  sorted.forEach(x => {
    if(x[1] > mostPopularOccurencies) {
      mostPopularOccurencies = x[1]
    }
  })

  // get word(s) with most occurencies
  return sorted.filter((x) => x[1] === mostPopularOccurencies).map(x => x[0]);
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
const processText = async (contents) => {
  const popularWord = await getMostPopularWord(contents)

  for (const word of popularWord) {
    const replace = 'foo' + word + 'bar'
    contents = replaceAllWords(contents, word, replace)
  }

  return String(contents).trim()
}

/**
 * Perform text processing on a given file
 * @param {string} path Path to local file
 * @returns {string} Processed text
 */
const processFile = async (path) => {
  try {
    const contents = await readFile(path)
    return processText(contents)
  } catch {
    return '(empty file)'
  }
}

module.exports = {
  countWords,
  getMostPopularWord,
  processText,
  processFile
}
