# Image-Processing-API

> the API handles resizing and serving stored images.
> Advanced Full-Stack Web Development Nanodegree Program From Udacity.

## Can be used in two different ways

1. a placeholder API: place images into your front end with the size set via URL parameters.
2. a library: serve properly scaled versions of your images to the front end to reduce page load size.

> ## Functionalities

- resize an image.
- read and write to your disk via a Node.js express server rather than a database.

> ## Endpoints

```sh
GET / # the main endpoint

GET /api # the api endpoint

GET /api/resize # resize an image from the images folder
POST /api/resize # resize any image

GET /api/images # list all the images in the images folder
GET /api/image # list a specific image from the images folder
GET /api/image/?:id # list a specific image from the images folder

GET /api/thumbnails # list all the thumbnails in the thumbnails folder
GET /api/thumbnail # list a specific image from the thumbnails folder
GET /api/thumbnail/?:id # list a specific image from the thumbnails folder
```

> ## Scripts

```bash
    # install the dependencies
    npm i
    # run the project
    npm run start:prod
    # run the tests
    npm run test
```

> ## Project's Stack

### devDependencies

- @types/ejs: TypeScript type definitions for EJS templating engine.
- @types/express: TypeScript type definitions for Express web framework.
- @types/jasmine: TypeScript type definitions for Jasmine testing framework.
- @types/morgan: TypeScript type definitions for Morgan logging middleware.
- @types/multer: TypeScript type definitions for Multer middleware for handling file uploads.
- @types/node: TypeScript type definitions for Node.js.
- @types/sharp: TypeScript type definitions for Sharp image processing library.
- @types/supertest: TypeScript type definitions for Supertest HTTP testing library.
- @typescript-eslint/eslint-plugin: ESLint plugin for TypeScript.
- @typescript-eslint/parser: TypeScript parser for ESLint.
- ejs: Embedded JavaScript templating engine.
- eslint: JavaScript and TypeScript linter.
- eslint-config-prettier: ESLint configuration that disables formatting-related rules to avoid conflicts with Prettier.
- eslint-plugin-prettier: ESLint plugin that adds Prettier as a rule.
- jasmine: Testing framework.
- jasmine-spec-reporter: Custom Jasmine reporter that outputs test results in a readable format.
- nodemon: Utility that automatically restarts the Node.js application when changes are detected.
- prettier: Opinionated code formatter.
- supertest: HTTP testing library for Node.js.
- ts-node: TypeScript execution environment and REPL for Node.js.
- typescript: TypeScript compiler.

### dependencies

- body-parser: Middleware for parsing HTTP request bodies.
- dotenv: Loads environment variables from a .env file.
- express: Web framework.
- express-validator: Middleware for validating and sanitizing HTTP requests.
- fs-extra: Adds file system methods that are not included in the Node.js fs module.
- morgan: HTTP request logger middleware.
- multer: Middleware for handling HTTP requests that contain files.
- sharp: Image processing library.

> ## project-rubric
>
> ### Setup and Architecture

- [x] Source code is kept separate from compiled code.
- [x] All tests should be contained in their own folder.
- [x] Separate modules are created for any processing.
- [x] Package.json should contain both devDependencies, and dependencies.
- [x] Scripts should be created for testing, linting/prettier, starting the server, and compiling TS.
- [x] Build script should run without error.

> ### Functionality

- [x] Start script should run without error
- [x] Provided endpoint should open in the browser with status 200
- [x] Accessing the provided URL with image information should successfully resize an image and save it to disk on first access, then pull from disk on subsequent access attempts.
- [x] An error message should be provided to the user when an image has failed to process or does not exist.

> ### Code Quality

- [x] Test script runs and all tests created pass.
- [x] There is at least 1 test per endpoint and at least one test for image processing.
- [x] All code in the SRC folder should use the .ts filetype.
- [x] Functions should include typed parameters and return types and not use the any type.
- [x] Import and Export used for modules.
- [x] Build script should successfully compile TS to JS.
- [x] Prettier and Lint scripts should run without producing any error messages.

> ### Suggestions to Make Your Project Stand Out

1. [x] Add additional processing to accept and output other image formats than JPG.
2. [x] Modify the thumbnail filename to include the image size to allow for multiple sizes of the same image.
3. [ ] Further explore the options in the Sharp module and add additional processing options.
4. [x] Add in logging to record when images are processed or accessed.
5. [x] Create a front-end for uploading more images to the full-size directory.
6. [x] Create a front-end that displays a thumbnail directory.
7. [x] Create a front-end that allows for the selection of how to process a selected image.
8. [x] Make a logger middleware.
9. [x] Add endpoint tests & more tests to the app.
10. [ ] Make images load faster.
