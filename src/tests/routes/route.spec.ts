import supertest from "supertest";
import router from "../../routes/route";

const request = supertest(router);
it("gets the test endpoint", async () => {
  const response = await request.get("/api/resize");
  expect(response).toBeNull;
});
