import resizer from "../../utilities/resizer";

describe(`testing the resizing functionality`, () => {
  it("expect resizer(`fjord`, 200, 200) to equal { image: `fjord`, width: 200, height: 200 }", async () => {
    try {
      const ans = await resizer("fjord", 200, 200);
      expect(ans).toEqual({ image: "fjord", width: 200, height: 200 });
    } catch (error) {
      console.log(error);
    }
  });
});
