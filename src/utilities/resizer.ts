import sharp from "sharp";
import path from "path";
import { imagesDirPath, thumbnailsDirPath } from "./constants";

interface thumbnail {
  width: number;
  height: number;
  imageName: string;
  imageExtension: string;
}

const resizer = async (
  width: number,
  height: number,
  imageName: string,
  imageExtension: string
): Promise<thumbnail> => {
  const image = path.join(imagesDirPath, `${imageName}.${imageExtension}`);
  const newImage = path.join(
    thumbnailsDirPath,
    `${imageName}_${width}x${height}.${imageExtension}`
  );

  return await sharp(image)
    .resize(width, height, {
      fit: "cover",
      background: { r: 255, g: 255, b: 255 },
      withoutEnlargement: true,
    })
    .flatten({ background: { r: 0, g: 255, b: 0 } })
    .toFile(newImage)
    .catch(err => {
      throw err;
    })
    .then(() => ({ width, height, imageName, imageExtension }));
};

export default resizer;
