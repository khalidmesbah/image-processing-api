import supertest from "supertest";
import app from "../server";

const request = supertest(app);

describe("testing that the server is running", () => {
  it("expect our server to be running", async () => {
    const response = await request.get("/");
    expect(response.status).toBe(200);
  });
});
