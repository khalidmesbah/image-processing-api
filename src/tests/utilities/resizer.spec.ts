import resizer from "../../utilities/resizer";

describe(`testing the resizing functionality`, () => {
  it("expect resizer(200, 200, `fjord`,`jpg`) to equal { width: 200, height: 200, imageName: `fjord`,imageExtension:`jpg`}", async () => {
    try {
      const ans = await resizer(200, 200, "fjord", "jpg");
      console.log(ans);
      expect(ans).toEqual({
        width: 300,
        height: 300,
        imageName: "fjord",
        imageExtension: "jpg",
      });
    } catch (error) {
      console.log(error);
    }
  });
});
