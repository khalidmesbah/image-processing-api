import express, { Request, response, Response } from "express";
import resizer from "../utilities/resize";
import fs from "fs";

const router = express.Router();
let image: string, width: number, height: number;

router.get("/resize", (req: Request, res: Response) => {
  // console.log(`from get `, req.query.image, req.query.width, req.query.height);
  image = (req.query.image as string)! || '';
  width = parseInt(req.query.width as string);
  height = parseInt(req.query.height as string);

  res.send(`${req.query.image} ${req.query.height} ${req.query.width}`);
  resizer(image, width, height);
  // if (
  //   fs.existsSync(
  //     `../../resized_images/${image.slice(0, -4)}_${width})}_${height}.jpg`
  //   )
  // ) {
  //   console.log(`yeeeeeeeeeeeeeeeeees`);
  // }
});

export default router;
