const request = require('supertest')
const path = require('path')
const app = require('../server')

afterAll(() => {
  app.close()
})

describe('File upload endpoints', () => {
  it('processes files according to specification', async () => {
    const res = await request(app)
      .post('/upload')
      .attach('data', path.join(__dirname, 'data', 'wat.txt'))

    expect(res.text).toEqual('this fooisbar fooisbar a simple test')
    expect(res.statusCode).toEqual(200)
  })

  it('handles multiple most popular words', async () => {
    const res = await request(app)
      .post('/upload')
      .attach('data', path.join(__dirname, 'data', 'tripple.txt'))

    expect(res.text).toEqual('foohellobar foohellobar fooworldbar fooworldbar foobazbar foobazbar hej')
    expect(res.statusCode).toEqual(200)
  })

  it('handles empty file', async () => {
    const res = await request(app)
      .post('/upload')
      .attach('data', Buffer.from(''), 'empty.txt')

    expect(res.text).toEqual('')
    expect(res.statusCode).toEqual(200)
  })

  it('handles multiple files', async () => {
    const res = await request(app)
      .post('/upload')
      .attach('helo', Buffer.from('hello'), 'hello.txt')
      .attach('world', Buffer.from('world'), 'world.txt')

    expect(res.text).toEqual('foohellobar\nfooworldbar')
    expect(res.statusCode).toEqual(200)
  })

  it('handles no files passed', async () => {
    const res = await request(app)
      .post('/upload')

    expect(res.text).toEqual('No files were uploaded.')
    expect(res.statusCode).toEqual(400)
  })

  it('only accepts text files', async () => {
    const res = await request(app)
      .post('/upload')
      .attach('data', path.join(__dirname, 'data', 'img.jpg'))

    expect(res.text).toEqual('No valid files uploaded')
    expect(res.statusCode).toEqual(200)
  })

  it('handles long files', async () => {
    const str = 'foo foo bar '
    const num = 1024 * 1024
    const data = Buffer.from(str.repeat(num)) // roughlty 12mb text = bigger than most books
    const res = await request(app)
      .post('/upload')
      .attach('data', data, 'long.txt')

    // TODO: would be nice to log performance
    expect(res.text).toEqual('foofoobar foofoobar bar '.repeat(num).trim())
    expect(res.statusCode).toEqual(200)
  })

  it('should show a response for GET requests', async () => {
    const res = await request(app)
      .get('/upload')

    expect(res.text).toEqual('Upload file please')
    expect(res.statusCode).toEqual(200)
  })
})
