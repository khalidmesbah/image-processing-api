import express, { Request, response, Response } from "express";
import resizer from "../utilities/resize";
import fs from "fs";
const resized_images: string[] = [];
import path from "path";

const isResized = (image: string, width: number, height: number) => {
  for (let i = 0; i < resized_images.length; i++) {
    console.log(`======>`, resized_images[i]);
    if (resized_images[i] === `${image.slice(0, -4)}_${width}_${height}.jpg`) {
      return true;
    }
  }
  return false;
};

const router = express.Router();
let image: string, width: number, height: number;

router.get("/resize", (req: Request, res: Response) => {
  image = (req.query.image as string)! || "";
  width = parseInt(req.query.width as string);
  height = parseInt(req.query.height as string);
  if (isResized(image, width, height)) {
    console.log(`if =>${image.slice(0, -4)}_${width}_${height}.jpg`);
    res.sendFile(
      path.join(
        __dirname,
        `../../resized_images/${image.slice(0, -4)}_${width}_${height}.jpg`
      )
    );
  } else {
    console.log(`else =>${image.slice(0, -4)}_${width}_${height}.jpg`);
    resized_images.push(`${image.slice(0, -4)}_${width}_${height}.jpg`);
    const sendImage = async () => {
      await resizer(image, width, height).then(async (e) => {
        console.log(
          `../../resized_images/${e.image}_${e.width}_${e.height}.jpg`
        );
        res.sendFile(
          path.join(
            __dirname,
            `../../resized_images/${e.image}_${e.width}_${e.height}.jpg`
          )
        );
      });
    };
    sendImage();
  }
});

export default router;
