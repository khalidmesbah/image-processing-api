const express = require("express");
const fs = require('fs')
const path = require('path')


const PORT = process.env.PORT || 3000;

const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "Hello World 🌍",
  });
});
app.get("/a", (req, res) => {
  res.json({
    message: "Hello unisdverse 🌍",
  });
});

app.post('/process',(req,res)=>{
  console.log(res);
})

app.listen(PORT, () => {
  console.log(`Server is starting at prot: https://localhost:${PORT}`);
});
