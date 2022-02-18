const express = require("express");
const fs = require("fs").promises;
const path = require("path");
const sharp = require("sharp");

const resize = (image, width, height) => {
  sharp(`./images/${image}`)
    .resize(width, height)
    .toFile(`./resized_images/${image}_${width}_${height}`, function (err) {
      console.error(err);
    });
};
const logger = (req, res, next) => {
  resize(req.body.image, +req.body.width, +req.body.height);
  next();
};

const isFound = (req, res, next) => {
  try {
    if (
      fs.existsSync(
        path.join(
          __dirname,
          `../resized_images/${req.body.image}_${+req.body.width}_${+req.body
            .height}`
        )
      )
    ) {
      res.sendFile(
        path.join(
          __dirname,
          `../resized_images/${req.body.image}_${+req.body.width}_${+req.body
            .height}`
        )
      );
      next();
    } else {
      resize(req.body.image, +req.body.width, +req.body.height);
      setTimeout(next(), 1000);
    }
  } catch (error) {
    console.log(error);
  }
};

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.urlencoded({ extended: true }));

app.post("/process", logger, isFound, (req, res) => {
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
