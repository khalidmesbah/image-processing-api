import sharp from "sharp";
import path from "path";

interface resizedImage {
  image: string;
  width: number;
  height: number;
}

const resizer = async (
  image: string,
  width: number,
  height: number
): Promise<resizedImage> => {
  return await sharp(path.join(__dirname, `/public/images`, `${image}.jpg`))
    .resize(width, height)
    .toFile(
      path.join(
        __dirname,
        `/public/resized_images`,
        `${image}_${width}_${height}.jpg`
      )
    )
    .catch(err => {
      throw err;
    })
    .then(() => {
      return { image, width, height };
    });
};

export default resizer;
