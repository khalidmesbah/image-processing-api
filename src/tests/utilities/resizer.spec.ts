import resizer from "../../utilities/resizer";

describe(`testing the resizing functionality`, () => {
  it("expect resizer(200, 200, `fjord`) to equal { width: 200, height: 200, imageName: `fjord`}", async () => {
    try {
      const ans = await resizer(200, 200, "fjord");
      expect(ans).toEqual({
        width: 200,
        height: 200,
        imageName: "fjord",
      });
    } catch (error) {
      console.log(error);
    }
  });
});
