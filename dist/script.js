const express = require("express");
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const { convertToObject } = require("typescript");
const fsPromises = require("fs").promises;
const bodyParser = require("body-parser");

const resize = async (image, width, height) => {
  try {
    sharp(`./images/${image}`)
      .resize(width, height)
      .toFile(`./resized_images/${image}_${width}_${height}`, function (err) {
        console.error(err);
      });
  } catch (error) {
    console.log(error);
  }
};

const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// app.get("/", (req, res) => {
//   resize(image,width,height)
//   res.send("done")
// });

app.post("/process", (req, res) => {
  resize(req.body.image, +req.body.width, +req.body.height);
  res.sendFile(
    path.join(
      __dirname,
      `../resized_images/${req.body.image}_${+req.body.width}_${+req.body
        .height}`
    )
  );
  });

app.listen(PORT, () => {
  console.log(`Server is starting at prot: http://localhost:${PORT}`);
});
