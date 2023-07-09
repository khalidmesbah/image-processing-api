import express, { Response } from "express";
import {
  body,
  matchedData,
  param,
  query,
  validationResult,
} from "express-validator";
import fs from "fs-extra";
import multer from "multer";
import path from "path";
import {
  PORT,
  images,
  imagesDirPath,
  listImagesDirPath,
  supportedFormats,
  syncImages,
  syncThumbnails,
  thumbnails,
  thumbnailsDirPath,
  statusCodes,
} from "../utilities/constants";
import resizer from "../utilities/resizer";

/* variables */
const upload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => {
      cb(null, imagesDirPath);
    },
    filename: async (_req, file, cb) => {
      const isUploaded = await fs.pathExists(
        path.join(imagesDirPath, file.originalname)
      );
      cb(null, isUploaded ? "placeholder" : file.originalname);
    },
  }),
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
  imageExtension: string
) => {
  syncImages();
  syncThumbnails();
  if (
    await fs.pathExists(
      path.join(
        thumbnailsDirPath,
        `${imageName}_${width}x${height}.${imageExtension}`
      )
    )
  ) {
    res
      .status(statusCodes.OK)
      .sendFile(
        path.join(
          thumbnailsDirPath,
          `${imageName}_${width}x${height}.${imageExtension}`
        )
      );
  } else {
    try {
      const {
        width: w,
        height: h,
        imageName: n,
        imageExtension: e,
      } = await resizer(width, height, imageName, imageExtension);

      res
        .status(statusCodes.OK)
        .sendFile(path.join(thumbnailsDirPath, `${n}_${w}x${h}.${e}`));
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

// route for resizing an image from the images directory
router.get(
  "/resize",
  query("width").isInt({ min: 1 }),
  query("height").isInt({ min: 1 }),
  query("image").isString().trim().notEmpty(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(statusCodes.BadRequest).send(`
      <h1>Invalid image, height or width.</h1>
      <h2>width and height must be positive integers</h2>
      <h2>image must be with the following extensions:</h2>
      <p>(png, jpeg, jpg, webp, avif, tiff, gif, svg)</p>
      `);
      return;
    }

    const data = matchedData(req);
    const width = Math.abs(parseInt(data.width));
    const height = Math.abs(parseInt(data.height));
    const [imageName, imageExtension] = data.image.split(".");
    const isValidImage = supportedFormats.some(
      format => format === imageExtension
    );
    if (!isValidImage) {
      res.status(statusCodes.BadRequest).send(`
      <h1>Invalid image, height or width.</h1>
      <h2>width and height must be positive integers</h2>
      <h2>image must be with the following extensions:</h2>
      <p>(png, jpeg, jpg, webp, avif, tiff, gif, svg)</p>
      `);
      return;
    }
    resize(res, width, height, imageName, imageExtension);
  }
);

// route for resizing any image
router.post(
  "/resize",
  upload,
  body("width").isInt({ min: 1 }),
  body("height").isInt({ min: 1 }),
  (req, res) => {
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
    const [imageName, imageExtension] = (
      req.file?.originalname as string
    ).split(".");
    resize(res, width, height, imageName, imageExtension);
  }
);

// routes for displaying images
router
  .get("/images", async (_req, res) => {
    if ((await syncImages()).length === 0) {
      res.status(statusCodes.OK).send("the images folder is empty");
      return;
    }
    res.status(statusCodes.OK).render(listImagesDirPath, {
      PORT,
      dir: "images",
      images: images,
    });
  })
  .get("/image", async (_req, res) => {
    if ((await syncImages()).length === 0) {
      res.status(statusCodes.OK).send("the images folder is empty");
      return;
    }
    res.status(statusCodes.BadRequest).send(`Type the id of the image`);
  })
  .get(
    "/image/?:id",
    param("id").isInt({
      min: 1,
    }),
    async (req, res) => {
      if ((await syncImages()).length === 0) {
        res.status(statusCodes.OK).send("the images folder is empty");
        return;
      }
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
    }
  );

// routes for displaying the thumbnails
router
  .get("/thumbnails", async (_req, res) => {
    if ((await syncThumbnails()).length === 0) {
      res.status(statusCodes.OK).send("the thumbnails folder is empty");
      return;
    }
    res.status(statusCodes.OK).render(listImagesDirPath, {
      PORT,
      dir: "thumbnails",
      images: thumbnails,
    });
  })
  .get("/thumbnail", async (_req, res) => {
    if ((await syncThumbnails()).length === 0) {
      res.status(statusCodes.OK).send("the thumbnails folder is empty");
      return;
    }
    res.status(statusCodes.BadRequest).send(`Type the id of the resized image`);
  })
  .get(
    "/thumbnail/?:id",
    param("id").isInt({
      min: 1,
    }),
    async (req, res) => {
      if ((await syncThumbnails()).length === 0) {
        res.status(statusCodes.OK).send("the thumbnails folder is empty");
        return;
      }
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
    }
  );

export default router;
