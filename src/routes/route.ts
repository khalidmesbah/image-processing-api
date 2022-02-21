import express, { Request, Response } from "express";
import resizer from "../utilities/resizer";
import path from "path";

const resized_images: string[] = [];
const isResized = (image: string, width: number, height: number) => {
  for (let i = 0; i < resized_images.length; i++)
    if (resized_images[i] === `${image}_${width}_${height}.jpg`) return true;
  return false;
};
const router = express.Router();
let image: string, width: number, height: number;

router.get("/resize", (req: Request, res: Response) => {
  image = (req.query.image as unknown as string).slice(0, -4);
  width = Math.abs(parseInt(req.query.width as string));
  height = Math.abs(parseInt(req.query.height as string));
  if (isResized(image, width, height)) {
    res.sendFile(
      path.join(
        __dirname,
        `../../public/resized_images/${image}_${width}_${height}.jpg`
      )
    );
  } else {
    resized_images.push(`${image}_${width}_${height}.jpg`);
    const sendImage = async () => {
      try {
        await resizer(image, width, height).then(async (e) => {
          res.sendFile(
            path.join(
              __dirname,
              `../../public/resized_images/${e.image}_${e.width}_${e.height}.jpg`
            )
          );
        });
      } catch (error) {
        console.log(error);
      }
    };
    sendImage();
  }
});

export default router;
