const { countWords, getMostPopularWord, processText } = require('../lib/file-processor.js')

const oneOfSameWordOccurence = 'hello hello world'
const twoOfSameWordOccurence = 'hello world hello world'
const withSpecialChars = 'foo bar_? bar baz'
const withSwedishChars = 'häst häst test'
const caseInsensitive = 'FOO FoO foo BaZ baZ'

describe('Word counting', () => {
  it('Handle single most popular word', () => {
    expect(countWords(oneOfSameWordOccurence)).toEqual({ hello: 2, world: 1 })
  })

  it('Handles multiple words with the same number of occurencies', () => {
    expect(countWords(twoOfSameWordOccurence)).toEqual({ hello: 2, world: 2 })
  })

  it('Counts case-insensitively', () => {
    expect(countWords(caseInsensitive)).toEqual({ foo: 3, baz: 2 })
  })

  it('Handles swedish characters', () => {
    expect(countWords(withSwedishChars)).toEqual({ häst: 2, test: 1 })
  })

  it('Handles special characters', () => {
    expect(countWords(withSpecialChars)).toEqual({ foo: 1, bar: 2, baz: 1 })
  })
})

describe('Get most pupular word(s)', () => {
  it('Handle single most popular word', async () => {
    expect(await getMostPopularWord(oneOfSameWordOccurence)).toEqual(['hello'])
  })

  it('Handles multiple words with the same number of occurencies', async () => {
    expect(await getMostPopularWord(twoOfSameWordOccurence)).toEqual(['hello', 'world'])
    expect(await getMostPopularWord('foo, bar, baz')).toEqual(['foo', 'bar', 'baz'])
  })
})

describe('Text processing', () => {
  it('Process text into expected output', async () => {
    expect(await processText(oneOfSameWordOccurence)).toEqual('foohellobar foohellobar world')
  })

  it('Handles multiple words', async () => {
    expect(await processText(twoOfSameWordOccurence)).toEqual('foohellobar fooworldbar foohellobar fooworldbar')
    expect(await processText('hello hello world world baz baz')).toEqual('foohellobar foohellobar fooworldbar fooworldbar foobazbar foobazbar')
  })

  it('Supports swedish characters', async () => {
    expect(await processText(withSwedishChars)).toEqual('foohästbar foohästbar test')
  })

  it('Handles "foo bar" corner-cases', async () => {
    expect(await processText('foo foo bar bar')).toEqual('foofoobar foofoobar foobarbar foobarbar')
    expect(await processText('foo foo bar')).toEqual('foofoobar foofoobar bar')
    expect(await processText('foofoo foofoo foobar foobar')).toEqual('foofoofoobar foofoofoobar foofoobarbar foofoobarbar')
  })
})
