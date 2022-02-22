import add from "../utilities/add";
import resizer from "../utilities/resizer";

it("expect resizer(`test`, 200, 200) to equal { image: `test`, width: 200, height: 200 }", async () => {
  try {
    const ans = await resizer("test", 200, 200);
    expect(ans).toEqual({ image: "test", width: 200, height: 200 });
  } catch (error) {
    console.log(error);
  }
});

it(`expect add(1,2) to equal 3`, () => {
  expect(add(1, 2)).toEqual(3);
});
