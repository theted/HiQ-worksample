# HiQ worksample
Simple file upload application with some processing - replaces the most common word(s) in a text file.

## Development
**NOTE: the backend and frontend should run as separated processes in development**
```sh
npm install   # install dependencies
npm start     # start backend
npm run dev   # start frontend dev-server
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
