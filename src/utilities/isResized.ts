const isResized = (
  image: string,
  width: number,
  height: number,
  resized_images: string[]
): boolean => {
  for (let i = 0; i < resized_images.length; i++)
    if (resized_images[i] === `${image}_${width}_${height}.jpg`) return true;
  return false;
};

export default isResized;
