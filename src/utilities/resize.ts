import sharp from "sharp";

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
  return sharp(`./public/images/${image}`)
    .resize(Math.abs(width), Math.abs(height))
    .toFile(
      `./public/resized_images/${image.slice(0, -4)}_${width}_${height}.jpg`
    )
    .catch((err) => {
      console.error(err);
    })
    .then(() => {
      return { image: `${image.slice(0, -4)}`, width: width, height: height };
    });
};

export default resizer;
