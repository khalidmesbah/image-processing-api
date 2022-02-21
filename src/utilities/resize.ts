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
  return sharp(`./public/images/${image}.jpg`)
    .resize(width, height)
    .toFile(`./public/resized_images/${image}_${width}_${height}.jpg`)
    .catch((err) => console.error(err))
    .then(() => {
      return { image: `${image}`, width: width, height: height };
    });
};

export default resizer;
