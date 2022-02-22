import supertest from "supertest";
import app from "../../server";

const request = supertest(app);

describe(`testing the resize endpoint`, () => {
  it("ensuring that the resize endpoint is working", async () => {
    const res = await request.get(
      "/api/resize?width=1200&height=600&image=fjord.jpg"
    );
    expect(res.statusCode).toBe(200);
  });
});
