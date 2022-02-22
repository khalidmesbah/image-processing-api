import isResized from "../../utilities/isResized";
const resized_images: string[] = ["image1_100_100.jpg", "image3_100_100.jpg"];

describe(`testing the isResized function`, () => {
  it(`is image1_100_100.jpg a resized images to be true`, () =>
    expect(isResized("image1", 100, 100, resized_images)).toBe(true));

  it(`is image2_100_100.jpg a resized images to be false`, () =>
    expect(isResized("image2", 100, 100, resized_images)).toBe(false));

  it(`is image3_100_100.jpg a resized images to be true`, () =>
    expect(isResized("image3", 100, 100, resized_images)).toBe(true));
});
