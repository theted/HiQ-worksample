/**
 * File processing methods
 */
const splitWords = (content) => String(content).replace(/\n/g, ' ').split(' ')
const removeNonAlpha = (word) => word.toLowerCase().replace(/[^a-zåäö]/gi, '')

/**
 * Count words in a block of text
 */
const countWords = (content) => {
  const words = splitWords(content)
  const count = {}

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
  // imagine this was a very heavy operation - we'd like to exit early!
  if (!content.length) return ''

  const countedWords = countWords(content)

  const mostPopularOccurencies = Object
    .values(countedWords)
    .reduce((word, curr) =>
      (word > curr) ? word : curr
    )

  // get word(s) with most occurencies
  return Object
    .entries(countedWords)
    .filter((x) => x[1] === mostPopularOccurencies)
    .map(x => x[0])
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

module.exports = {
  countWords,
  getMostPopularWord,
  processText
}
