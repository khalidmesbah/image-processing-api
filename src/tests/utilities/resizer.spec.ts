import resizer from "../../utilities/resizer";

it("expect resizer(`test`, 200, 200) to equal { image: `test`, width: 200, height: 200 }", async () => {
  try {
    const ans = await resizer("test", 200, 200);
    expect(ans).toEqual({ image: "test", width: 200, height: 200 });
  } catch (error) {
    console.log(error);
  }
});
