import supertest from "supertest";
import app from "../server";

const request = supertest(app);

describe("testing the main endpoint", () => {
  it("expect our server to be running", async () => {
    const response = await request.get("/");
    expect(response.status).toBe(200);
  });
});
