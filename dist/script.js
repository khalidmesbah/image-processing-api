const express = require("express");
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const { convertToObject } = require("typescript");
const fsPromises = require("fs").promises;

/* let image = `fjord`,
  extention = `.jpg`;
let width = 100,
  height = 100; */

/* const resize = (image,extention,width,height) => {
  sharp(`./images/${image}${extention}`)
    .resize(width, height)
    .toFile(
      `./resized_images/${image}_${width}_${height}${extention}`,
      function (err) {
        console.error(err);
      }
    );
};
 */
const PORT = process.env.PORT || 3000;

const app = express();

app.get("/a", (req, res) => {
  // res.sendFile(`../resized_images/${image}_${width}_${height}${extention}`);
  res.send("hello kal")
});

app.post("/", (req, res) => {
  console.log(req);
  console.log(`============================================`);
  console.log(res);
});



app.listen(PORT, () => {
  console.log(`Server is starting at prot: https://localhost:${PORT}`);
});
