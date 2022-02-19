import sharp from "sharp";

const resizer = (image :string, width:number, height:number) => {
    console.log(image,width,height);
    
  sharp(`./images/${image}`)
    .resize(width, height)
    .toFile(`./resized_images/${image.slice(-3)}_${width}_${height}.jpg`, function (err) {
      console.error(err);
    });
};

export default resizer;



/* const fs = require("fs").promises;
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
}; */
