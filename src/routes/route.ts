import express, { Response } from "express";
import { body, matchedData, param, validationResult } from "express-validator";
import fs from "fs-extra";
import multer from "multer";
import path from "path";
import {
  HOST,
  images,
  imagesDirPath,
  listImagesDirPath,
  supportedFormats,
  syncImages,
  syncThumbnails,
  thumbnails,
  thumbnailsDirPath,
  statusCodes,
  smallDirPath,
} from "../utilities/constants";
import resizer from "../utilities/resizer";
import sharp from "sharp";

/* variables */
const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (_req, file, cb) => {
    const isSupportedFormat = supportedFormats
      .map(f => `image/${f}`)
      .includes(file.mimetype);
    if (!isSupportedFormat) {
      cb(
        Error(
          `You can upload only image files with one of the following formats: (jpg, jpeg, png, webp, tiff, avif, gif, svg)`
        )
      );
    }
    cb(null, true);
  },
}).single("image");

const router = express.Router();

/* functions */
const resize = async (
  res: Response,
  width: number,
  height: number,
  imageName: string,
  blur?: number
) => {
  const isBlurred = blur && blur >= 0.3 ? "_" + blur : "";

  await fs.ensureDir(thumbnailsDirPath);
  const expectedImage = path.join(
    thumbnailsDirPath,
    `${imageName}_${width}x${height}${isBlurred}.webp`
  );

  if (await fs.pathExists(expectedImage)) {
    res.status(statusCodes.OK).sendFile(expectedImage);
  } else {
    try {
      const {
        width: w,
        height: h,
        imageName: n,
      } = await resizer(width, height, imageName, blur);

      res
        .status(statusCodes.OK)
        .sendFile(
          path.join(thumbnailsDirPath, `${n}_${w}x${h}${isBlurred}.webp`)
        );
    } catch (error) {
      res.status(404).send(`couldn't resize the image: ${error}`);
    }
  }
};

/* routes */
// route for testing
router.get("/", (_req, res) => {
  res
    .status(statusCodes.OK)
    .send("<h1><b><i>the server is working fine.</i></b></h1>");
});

// route for clearing the cache
router.delete("/clear", async (_req, res) => {
  try {
    await fs.rm(imagesDirPath, { force: true, recursive: true });
    await fs.rm(thumbnailsDirPath, { force: true, recursive: true });
    await fs.rm(smallDirPath, { force: true, recursive: true });
    res
      .status(statusCodes.OK)
      .send("<h1><b><i>the server has been cleared</i></b></h1>");
  } catch (error) {
    res
      .status(statusCodes.BadRequest)
      .send("<h1><b><i>the server couldn't be cleared</i></b></h1>");
  }
});

// route for resizing an image
router.post(
  "/resize",
  upload,
  body("width").isInt({ min: 1 }),
  body("height").isInt({ min: 1 }),
  body("blur").isFloat({ min: 0, max: 1000 }),
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.status(statusCodes.BadRequest).send(`
      <h1>Invalid image, height or width.</h1>
      <h2>width and height must be positive integers</h2>
      <h2>image must be with the following extensions:</h2>
      <p>(png, jpeg, jpg, webp, aviv, tiff, gif, svg)</p>
      `);
      return;
    }
    const data = matchedData(req);
    const width = Math.abs(parseInt(data.width));
    const height = Math.abs(parseInt(data.height));
    const blur = Math.abs(parseFloat(data.blur));
    const [imageName] = (req.file?.originalname as string).split(".");
    await fs.ensureDir(imagesDirPath);
    await sharp(req.file?.buffer)
      .webp()
      .toFile(path.join(imagesDirPath, `${imageName}.webp`));
    resize(res, width, height, imageName, blur);
  }
);

// route for displaying images
router.get(
  "/images/:id?",
  param("id").isInt({ min: 1 }).optional(),
  async (req, res) => {
    if ((await syncImages()).length === 0) {
      res.status(statusCodes.OK).send("the images folder is empty");
      return;
    }

    if (!isNaN(req.params?.id)) {
      const result = validationResult(req);
      const id = parseInt(matchedData(req).id);

      if (!result.isEmpty() || id > images.length) {
        res.status(statusCodes.BadRequest).send(`
        <h1>image with id = ${req.params?.id} is not found</h1>
        <h2>the id must be in the range of [1, ${images.length}]`);
        return;
      }

      res
        .status(statusCodes.OK)
        .sendFile(path.join(imagesDirPath, images[id - 1]));
      return;
    }

    res.status(statusCodes.OK).render(listImagesDirPath, {
      HOST,
      dir: "images",
      images,
    });
  }
);

// route for displaying the thumbnails
router.get(
  "/thumbnails/:id?",
  param("id").isInt({ min: 1 }).optional(),
  async (req, res) => {
    if ((await syncThumbnails()).length === 0) {
      res.status(statusCodes.OK).send("the thumbnails folder is empty");
      return;
    }
    if (!isNaN(req.params?.id)) {
      const result = validationResult(req);
      const id = parseInt(matchedData(req).id);

      if (!result.isEmpty() || id > thumbnails.length) {
        res.status(statusCodes.BadRequest).send(`
        <h1>thumbnail with id = ${req.params?.id} is not found</h1>
        <h2>the id must be in the range of [1, ${thumbnails.length}]`);
        return;
      }

      res
        .status(statusCodes.OK)
        .sendFile(path.join(thumbnailsDirPath, thumbnails[id - 1]));
      return;
    }
    res.status(statusCodes.OK).render(listImagesDirPath, {
      HOST,
      dir: "thumbnails",
      images: thumbnails,
    });
  }
);

export default router;
