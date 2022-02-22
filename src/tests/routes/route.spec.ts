import supertest from "supertest";
import router from "../../routes/route";

const request = supertest(router);
describe(`testing the resize endpoint`, () => {
  it("ensuring that the resize endpoint is working", async () => {
    const res = await request.get(
      "/resize?width=1200&height=600&image=fjord.jpg"
    );
    expect(res.status).toBe(200);
  });
});
