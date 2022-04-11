const request = require('supertest')
const path = require('path')
const app = require('../server')

afterAll(() => {
  app.close();
});


describe('File upload endpoints', () => {
  it('should process files as expected', async () => {
    const res = await request(app)
      .post('/upload')
      .attach('data', path.join(__dirname, 'data', 'wat.txt'))

    expect(res.text).toEqual('this fooisbar fooisbar a simple test')
    expect(res.statusCode).toEqual(200)
  })

  it('should handle multiple most popular words', async () => {
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

  it('should show a response for GET requests', async () => {
    const res = await request(app)
      .get('/upload')

    expect(res.text).toEqual('Upload file please')
    expect(res.statusCode).toEqual(200)
  })
})
