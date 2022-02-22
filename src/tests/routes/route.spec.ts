import supertest from "supertest";
import router from "../../routes/route";

const request = supertest(router);
describe(`testing`, () => {
  it("ensuring that the endpoint is working", async (done) => {
    const res = await request.get("/resize");
    expect(res.status).toBe(200);
    done();
  });
});
