# Answers

#### 1. How long time did you end up spending on this coding test?
~12 hours - I had a lot of functionality that could be copied from another project - I did ending up spending a lot of time fine-tuning though.

#### 2. Explain why you chose the code structure(s) you used in your solution.
The backend is pretty much structured like a standard [Express] application - controllers, libraries, routes, etc. Modules are kept as small as possible (example: `lib/file-processor.js`). Keeping a common structure and small single-purpose modules allows the project to grow in complexity, as well as being easier to maintain by others.

The frontend (located in the `src` directory) is grouped into components and services. Each component can be styled separately ([stylus] is the CSS-preprocessor used), and have separated templates (separation of concerns!).

#### 3. What would you add to your solution if you had more time? This question is especially important if you did not spend much time on the coding test - use this as an opportunity to explain what your solution is missing.
- Add more tests
- Improve layout
- More code comments & documentation
- A more well-rounded API
- More Vue cool-stuff
- Should have uses TypeScript!
- Fixing known bugs / corner-cases
- Error handling, eg. disallowing user to upload non-text files
- Adding support for multiple simultaneous file uploads (almost there!)

#### 4. What did you think of this recruitment test?
Fun task! A bit more complex than it would seem at first - support for multiple words of the same occurence, line endings, etc.

The test also gives great freedom on how to structure projects/applications. Loved the example files! ;)

<!-- References -->
[vue]: https://vuejs.org/
[webpack]: https://webpack.js.org/
[stylus]: http://stylus-lang.com/
[pug]: https://pugjs.org/
[node]: https://nodejs.org/
[express]: https://expressjs.com/
[express-fileupload]: https://www.npmjs.com/package/express-fileupload
