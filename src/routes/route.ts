import express, { Request, Response } from "express";
import resizer from "../utilities/resizer";
import path from "path";
import fs from "fs";

const router = express.Router();

router.get("/", (req: Request, res: Response): void => {
  const image = (req.query.image as unknown as string).slice(0, -4);
  const width = Math.abs(parseInt(req.query.width as string));
  const height = Math.abs(parseInt(req.query.height as string));
  if (
    fs.existsSync(
      path.join(
        __dirname,
        `/public/resized_images/${image}_${width}_${height}.jpg`
      )
    )
  ) {
    res.sendFile(
      path.join(
        __dirname,
        `../../public/resized_images`,
        `${image}_${width}_${height}.jpg`
      )
    );
  } else {
    const sendImage = async (): Promise<void> => {
      try {
        await resizer(image, width, height).then(async (e) => {
          res.sendFile(
            path.join(
              __dirname,
              `../../public/resized_images`,
              `${e.image}_${e.width}_${e.height}.jpg`
            )
          );
        });
      } catch (error) {
        console.log(error);

        res.redirect(path.join(__dirname, `/views`, `404.js`));
      }
    };
    sendImage();
  }
});

export default router;
