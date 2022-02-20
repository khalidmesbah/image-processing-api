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
  return sharp(`./images/${image}`)
    .resize(Math.abs(width), Math.abs(height))
    .toFile(`./resized_images/${image.slice(0, -4)}_${width}_${height}.jpg`)
    .then(() => {
      return { image: `${image.slice(0, -4)}`, width: width, height: height };
    });
};

export default resizer;
