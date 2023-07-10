import sharp from "sharp";
import path from "path";
import { imagesDirPath, smallDirPath, thumbnailsDirPath } from "./constants";
import ffmpeg from "fluent-ffmpeg";
import fs from "fs-extra";

interface thumbnail {
  width: number;
  height: number;
  imageName: string;
}

const resizer = async (
  width: number,
  height: number,
  imageName: string,
  blur?: number
): Promise<thumbnail> => {
  const isBlurred = blur && blur > 0.3 ? "_" + blur : "";
  const image = path.join(imagesDirPath, `${imageName}.webp`);

  const newImage = path.join(
    thumbnailsDirPath,
    `${imageName}_${width}x${height}${isBlurred}.webp`
  );

  await fs.ensureDir(smallDirPath);
  const smallImageForImagesDir = path.join(
    smallDirPath,
    `small-${imageName}.webp`
  );
  const isSmallImageForImagesDirExist = await fs.exists(smallImageForImagesDir);
  const smallImageForThumbnailsDirPath = path.join(
    smallDirPath,
    `small-${imageName}_${width}x${height}${isBlurred}.webp`
  );
  const isSmallImageExistForThumbnailDirPath = await fs.exists(
    smallImageForThumbnailsDirPath
  );
  if (!isSmallImageExistForThumbnailDirPath) {
    ffmpeg(image)
      .outputOptions("-vf", "scale=20:-1")
      .format("webp")
      .on("end", () => {
        console.log("Finished processing");
      })
      .on("error", err => {
        console.log(`Error: ${err.message}`);
      })
      .save(smallImageForThumbnailsDirPath);
  }
  if (!isSmallImageForImagesDirExist) {
    ffmpeg(image)
      .outputOptions("-vf", "scale=20:-1")
      .format("webp")
      .on("end", () => {
        console.log("Finished processing");
      })
      .on("error", err => {
        console.log(`Error: ${err.message}`);
      })
      .save(smallImageForImagesDir);
  }

  return await sharp(image)
    .resize(width, height)
    .blur(blur)
    .webp()
    .toFile(newImage)
    .catch(err => {
      throw err;
    })
    .then(() => ({ width, height, imageName }));
};

export default resizer;
