//The server file acts as the entry point or title page to the book

// import the express module
const express = require('express')
// create the application object
const app = express();
// define the port
const PORT = process.env.on || 3000;

// an endpoint is created that gets the route API and sends a message back to the browser
app.get('/api',(req,res)=>{
    res.send('hello universe!');
})

// create the server and listen on the port
app.listen(PORT, () => {
  console.log(`the server is running at: http://localhost/${PORT}`);
});
