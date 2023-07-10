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
GET / # go to the main page

GET /api # test the api endpoint

DELETE /api/clear # clear the cache

POST /api/resize # resize an image

GET /api/images # list all the images in the images folder
GET /api/image # list a specific image from the images folder
GET /api/image/?:id # list a specific image from the images folder

GET /api/thumbnails # list all the thumbnails in the thumbnails folder
GET /api/thumbnail # list a specific image from the thumbnails folder
GET /api/thumbnail/?:id # list a specific image from the thumbnails folder
```

> ## Scripts

```sh
    # install the dependencies
    npm i
    # run the project
    npm run start:prod
    # run the tests
    npm run test
```

> ## Project's Stack

### Development Dependencies

- @types/ejs: TypeScript typings for the EJS templating engine.
- @types/express: TypeScript typings for the Express web framework.
- @types/fluent-ffmpeg: TypeScript typings for the Fluent FFmpeg video processing library.
- @types/jasmine: TypeScript typings for the Jasmine testing framework.
- @types/morgan: TypeScript typings for the Morgan HTTP request logger middleware.
- @types/multer: TypeScript typings for the Multer middleware for handling file uploads.
- @types/node: TypeScript typings for the Node.js runtime environment.
- @types/sharp: TypeScript typings for the Sharp image processing library.
- @types/supertest: TypeScript typings for the Supertest HTTP testing library.
- @typescript-eslint/eslint-plugin and @typescript-eslint/parser: ESLint integration for TypeScript.
- ejs: EJS templating engine for rendering dynamic HTML pages.
- eslint, eslint-config-prettier, and eslint-plugin-prettier: code linting and formatting.
- jasmine and jasmine-spec-reporter: Jasmine testing framework and a reporter for displaying test results.
- nodemon: development tool that automatically restarts the server when changes are made to the code.
- prettier: code formatter.
- supertest: HTTP testing library.
- ts-node: TypeScript execution environment.
- typescript: TypeScript language compiler.

### Production Dependencies

- @types/fs-extra: TypeScript typings for the fs-extra library, which provides additional functionality for the Node.js fs module.
- dotenv: module for loading environment variables from a .env file.
- express: Express web framework.
- express-validator: library for validating incoming HTTP requests in Express.
- fluent-ffmpeg: video processing library.
- fs-extra: library that provides additional functionality for the Node.js fs module.
- morgan: HTTP request logger middleware.
- multer: middleware for handling file uploads in Express.
- sharp: image processing library.

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
3. [x] Further explore the options in the Sharp module and add additional processing options.
4. [x] Add in logging to record when images are processed or accessed.
5. [x] Create a front-end for uploading more images to the full-size directory.
6. [x] Create a front-end that displays a thumbnail directory.
7. [x] Create a front-end that allows for the selection of how to process a selected image.
8. [x] Make a logger middleware.
9. [x] Add endpoint tests & more tests to the app.
10. [x] Make images load faster.
