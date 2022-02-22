# Image-Processing-API

Advanced Full-Stack Web Development Nanodegree Program

> ## Functionalities
- resizer : to resize an image
- isResized : to check wheather the image is resized or not


> ## End points
`api/resize` : the api that is responsible for resizing the image
### usage
/api/resize?image=imageName&width:theWidth&height:theWidth  

> ## Scripts

### build : to compile typescript

` 
    npm run build
`

### run : to run the server

` 
    npm run start
`

### build and run : to compile typescript and run the server 

` 
    npm run start:prod
`

### prettify : to format the code

` 
    npm run prettier
`

### lint : to accelerate development and reduce errors

` 
    npm run lint
`

### test : to test our code        

` 
    npm run test
`

> ## Project Stack
- Run Time Environment: node.js
- Languages: JavaScript & TypeScript
- Unit Testing: jasmine
- End Point Testing: jasmine & supertest
- Modules/Packages: sharp package 
- Frameworks: express & ejs
- Linting: esLint
- Fromatting: prettier


> ## Suggestions to Make Your Project Stand Out!
1. [ ] Add additional processing to accept and output other image formats than JPG.
2. [x] Modify the thumbnail filename to include the image size to allow for multiple sizes of the same image.
3. [ ] Further explore the options in the Sharp module and add additional processing options.
4. [ ] Add in logging to record when images are processed or accessed.
5. [ ] Create a front-end for uploading more images to the full-size directory.
6. [x] Create a front-end that displays a thumbnail directory.
7. [ ] Create a front-end that allows for the selection of how to process a selected image.