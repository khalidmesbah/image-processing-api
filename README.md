# Image-Processing-API

Advanced Full-Stack Web Development Nanodegree Program

> ## Functionalities
- resizer : to resize an image
- Modify the thumbnail filename to include the image size to allow for multiple sizes of the same image.
- Create a front-end that displays a thumbnail directory.


> ## Endpoints
1. `/` : the endpoint that is responsible for displaying the home page

   usage

   <a href="http://localhost:3000/" target="_blank">http://localhost:3000/</a> 

2. `/api/resize` : the endpoint that is responsible for resizing the image

   usage

   <a href="http://localhost:3000/api/resize?width=theWidth&height=theHeight&image=imageName" target="_blank">http://localhost:3000/api/resize?width=theWidth&height=theHeight&image=imageName</a>

   example

   <a href="http://localhost:3000/api/resize?width=1200&height=600&image=fjord.jpg" target="_blank">http://localhost:3000/api/resize?width=1200&height=600&image=fjord.jpg</a>

3. `api/images` : the endpoint that is responsible for displaying the available images

   <a href="http://localhost:3000/api/images" target="_blank">http://localhost:3000/api/images</a>

4. `api/image/:id` : the endpoint that is responsible for displaying a specific image

   <a href="http://localhost:3000/api/image/1" target="_blank">http://localhost:3000/api/image/1</a>

   <a href="http://localhost:3000/api/image/5" target="_blank">http://localhost:3000/api/image/5</a>

   <a href="http://localhost:3000/api/image/8" target="_blank">http://localhost:3000/api/image/8</a>

   <a href="http://localhost:3000/api/image/0" target="_blank">http://localhost:3000/api/image/0</a>

   <a href="http://localhost:3000/api/image" target="_blank">http://localhost:3000/api/image</a>


> ## Scripts

### install all the dependencies
``` bash
    npm i
```

### build : to compile typescript

``` bash
    npm run build
```

### run : to run the server

``` bash
    npm run start
```

### build and run : to compile typescript and run the server 

``` bash
    npm run start:prod
```

### prettify : to format the code

``` bash
    npm run prettier
```

### lint : to accelerate development and reduce errors

``` bash
    npm run lint
```

### test : to test our code        

``` bash
    npm run test
```

> ## Project Stack
- Run Time Environment: node.js
- Languages: JavaScript & TypeScript
- Unit Testing: jasmine
- End Point Testing: jasmine & supertest
- Modules/Packages: sharp package 
- Frameworks: express 
- Template engines : ejs
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
8. [ ] make a logger middleware
