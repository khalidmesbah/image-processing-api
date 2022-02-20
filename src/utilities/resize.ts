import { stringify } from "querystring";
import sharp from "sharp";
interface resizedImage {
  image: string,
  width:number;
  height:number;
}

const resizer = async (
  image: string,
  width: number,
  height: number
): Promise<resizedImage> => {
  return sharp(`./images/${image}`)
    .resize(width, height)
    .toFile(`./resized_images/${image.slice(0, -4)}_${width}_${height}.jpg`)
    .then(() => {
      return { "image": `${image.slice(0, -4)}`, "width": width, "height": height } ;
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
