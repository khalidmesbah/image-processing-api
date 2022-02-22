import supertest from "supertest";
import app from "../server";

const request = supertest(app);

describe("testing that the server is running", () => {
  it("gets the test endpoint", async () => {
    const response = await request.get("/");
    expect(response.status).toBe(200);
  });
});
