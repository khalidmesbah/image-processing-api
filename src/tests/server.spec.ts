import supertest from "supertest";
import app from "../server";

const request = supertest(app);

describe("testing the endpoints", () => {
  it("expect our server to be running", async () => {
    const response = await request.get("/");
    expect(response.status).toBe(200);
  });
  it("testing the /api/resize endpoint", async () => {
    const response = await request.get("/api/resize");
    expect(response.status).toBe(200);
  });
  it("testing the /api/images endpoint", async () => {
    const response = await request.get("/api/images");
    expect(response.status).toBe(200);
  });
  it("testing the /api/image endpoint", async () => {
    const response = await request.get("/api/image");
    expect(response.status).toBe(200);
  });
  it("testing the /api/image/1 endpoint", async () => {
    const response = await request.get("/api/image/1");
    expect(response.status).toBe(200);
  });
});
