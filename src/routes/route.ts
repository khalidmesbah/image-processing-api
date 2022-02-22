import express, { Request, Response } from "express";
import resizer from "../utilities/resizer";
import isResized from "../utilities/isResized";
import path from "path";

// i used an array for chaching , is there a better way?
const resized_images: string[] = [];

const router = express.Router();

router.get("/resize", (req: Request, res: Response): void => {
  const image = (req.query.image as unknown as string).slice(0, -4);
  const width = Math.abs(parseInt(req.query.width as string));
  const height = Math.abs(parseInt(req.query.height as string));

  if (isResized(image, width, height, resized_images)) {
    res.sendFile(
      path.join(
        __dirname,
        `../../public/resized_images/${image}_${width}_${height}.jpg`
      )
    );
  } else {
    resized_images.push(`${image}_${width}_${height}.jpg`);
    const sendImage = async (): Promise<void> => {
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
        console.error(error);
      }
    };
    sendImage();
  }
});

export default router;
