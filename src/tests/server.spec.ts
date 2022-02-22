import supertest from "supertest";
import app from "../server";

const request = supertest(app);

describe("testing endpoint responses", () => {
  it("gets the test endpoint", async () => {
    const response = await request.get("/test");
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("pass!");
  });
});
