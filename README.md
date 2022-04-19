# HiQ worksample
Simple file upload application with some processing - replaces the most common word(s) in a text file.

## Updates since last iteration
- Added unit tests for file-processing methods
- Fixed corner cases not correctly handled by the API
- Added github action pipeline to ensure tests are passing
- Added (simple) deployment to AWS EC2 instance
- Improved backend - there's no need to actually save the files on the server - just read the data posted, parse into expected format and output back in the request response - this also makes sure integration tests can be run in the workflow (I guess since the runner does not have access to disk?) This could be solved by service containers.


## Development
**NOTE: the backend and frontend should run as separated processes in development**
```sh
npm install --force     # install dependencies (currently there are conflicts :/)
npm start               # start backend
npm run dev             # start frontend dev-server
```

## Production
```sh
npm run build
```

## Testing
Using [jest]
```sh
npm test
```

## Tech stack
[Vue] for the frontend, [Stylus] as CSS pre-processor, [Pug] for HTML templates.

On the backend; a simple [Node] + [Express] server. Utilizing [express-fileupload] middleware for handling file uploads (why reinvent the wheel?)

<!-- Refernces -->
[vue]: https://vuejs.org/
[webpack]: https://webpack.js.org/
[docker]: https://www.docker.com/
[stylus]: http://stylus-lang.com/
[pug]: https://pugjs.org/
[node]: https://nodejs.org/
[express]: https://expressjs.com/
[express-fileupload]: https://www.npmjs.com/package/express-fileupload
[jest]: https://jestjs.io/
