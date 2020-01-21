const ENVIRONMENT = (window.location.hostname === 'localhost') ? 'development' : 'production'
const PORT = 4244
const ENDPOINT = (ENVIRONMENT === 'production') ? 'https://' + window.location.hostname + '/' : 'http://localhost:' + PORT + '/'

console.log('use endpoint:', ENDPOINT)

const config = {
  endpoint: ENDPOINT
}

export default config
