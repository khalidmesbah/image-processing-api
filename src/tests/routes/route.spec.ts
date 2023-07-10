import fs from "fs-extra";
import supertest from "supertest";
import app from "../../server";
import path from "path";
import {
  images,
  imagesDirPath,
  sampleDirPath,
  smallDirPath,
  statusCodes,
  thumbnails,
  thumbnailsDirPath,
} from "../../utilities/constants";

const request = supertest(app);

const result = {
  succeeds: "succeeds",
  fails: "fails",
};

describe(`GET /api/`, () => {
  it(`"the /api/" request ${result.succeeds}`, async () => {
    const res = await request.get("/api/");
    expect(res.status).toBe(statusCodes.OK);
    expect(res.text).toContain("the server is working fine");
  });
});

describe(`POST /api/resize`, async () => {
  const image = path.join(sampleDirPath, "fjord.jpg");
  const txt = path.join(sampleDirPath, "text.txt");

  const test = (
    text: string,
    result: string,
    width: number | string,
    height: number | string,
    blur: number,
    image: string,
    status: number
  ) => {
    return it(`"${text}" request ${result}`, async () => {
      const res = await request
        .post("/api/resize")
        .field("width", width)
        .field("height", height)
        .field("blur", blur)
        .attach("image", image)
        .then(res => res);
      expect(res.status).toBe(status);
    });
  };

  // correct width, height, blur and image
  test(
    "width and height of positive integers, and a correct image",
    result.succeeds,
    100,
    100,
    0.3,
    image,
    statusCodes.OK
  );
  // wrong width
  test(
    "width is zero",
    result.fails,
    0,
    100,
    0.3,
    image,
    statusCodes.BadRequest
  );
  test(
    "width is negative",
    result.fails,
    -100,
    100,
    0.3,
    image,
    statusCodes.BadRequest
  );
  test(
    "width is float",
    result.fails,
    100.5,
    100,
    0.3,
    image,
    statusCodes.BadRequest
  );
  test(
    "width is non-numerical",
    result.fails,
    "not numerical",
    100,
    0.3,
    image,
    statusCodes.BadRequest
  );
  // wrong height
  test(
    "height is zero",
    result.fails,
    100,
    0,
    0.3,
    image,
    statusCodes.BadRequest
  );
  test(
    "height is negative",
    result.fails,
    100,
    -100,
    0.3,
    image,
    statusCodes.BadRequest
  );
  test(
    "height is float",
    result.fails,
    100,
    100.5,
    0.3,
    image,
    statusCodes.BadRequest
  );
  test(
    "height is non-numerical",
    result.fails,
    100,
    "non numerical",
    0.3,
    image,
    statusCodes.BadRequest
  );
  // wrong blur
  test(
    "blur is negative",
    result.fails,
    100,
    100,
    -0.3,
    image,
    statusCodes.BadRequest
  );
  test("blur is 0", result.fails, 100, 100, 0, image, statusCodes.BadRequest);
  test(
    "blur is more than 1000",
    result.fails,
    100,
    100,
    1001,
    image,
    statusCodes.BadRequest
  );
  test(
    "blur is less than 0.3",
    result.fails,
    100,
    100,
    0.2,
    image,
    statusCodes.BadRequest
  );
  // wrong image
  test("image with a wrong format", result.fails, 100, 100, 0.3, txt, 500);
});

describe("GET /api/images", () => {
  it(`"get all images in the /public/images/ folder" request ${result.succeeds}`, async () => {
    const res = await request.get("/api/images");
    expect(res.status).toBe(statusCodes.OK);
  });
});

describe("GET /api/image", () => {
  it(`"get an image from the /public/images/ folder without id" request ${result.fails}`, async () => {
    const res = await request.get("/api/image");
    expect(res.status).toBe(statusCodes.BadRequest);
  });
});

describe("GET /api/image/?:id", () => {
  it(`"get the first image from the /public/images/ folder" request ${result.succeeds}`, async () => {
    const res = await request.get("/api/image/1");
    expect(res.status).toBe(statusCodes.OK);
  });
  it(`"get the last image from the /public/images/ folder" request ${result.succeeds}`, async () => {
    const res = await request.get(`/api/image/${images.length}`);
    expect(res.status).toBe(statusCodes.OK);
  });
  it(`"get an image from the /public/images/ folder with id = 0" request ${result.fails}`, async () => {
    const res = await request.get("/api/image/0");
    expect(res.status).toBe(statusCodes.BadRequest);
  });
  it(`"get an image from the /public/images/ folder with id = -2" request ${result.fails}`, async () => {
    const res = await request.get("/api/image/-2");
    expect(res.status).toBe(statusCodes.BadRequest);
  });
  it(`"get an image from the /public/images/ folder with id bigger than the number of images" request ${result.fails}`, async () => {
    const res = await request.get(`/api/image/${images.length + 1}`);
    expect(res.status).toBe(statusCodes.BadRequest);
  });
});

describe("GET /api/thumbnails", () => {
  it(`"get all thumbnails in the /public/thumbnails/ folder" request ${result.succeeds}`, async () => {
    const res = await request.get("/api/thumbnails");
    expect(res.status).toBe(statusCodes.OK);
  });
});

describe("GET /api/thumbnail", () => {
  it(`"get a thumbnail from the /public/thumbnails/ folder without id" request ${result.fails}`, async () => {
    const res = await request.get("/api/thumbnail");
    expect(res.status).toBe(statusCodes.BadRequest);
  });
});

describe("GET /api/thumbnail/?:id", async () => {
  it(`"get the first thumbnail from the /public/thumbnails/ folder" request ${result.succeeds}`, async () => {
    const res = await request.get("/api/thumbnail/1");
    expect(res.status).toBe(statusCodes.OK);
  });
  it(`"get the last thumbnail from the /public/thumbnails/ folder" request ${result.succeeds}`, async () => {
    const res = await request.get(`/api/thumbnail/${thumbnails.length}`);
    expect(res.status).toBe(statusCodes.OK);
  });
  it(`"get a thumbnail from the /public/thumbnails/ folder with id = 0" request ${result.fails}`, async () => {
    const res = await request.get("/api/thumbnail/0");
    expect(res.status).toBe(statusCodes.BadRequest);
  });
  it(`"get a thumbnail from the /public/thumbnails/ folder with id = -2" request ${result.fails}`, async () => {
    const res = await request.get("/api/thumbnail/-2");
    expect(res.status).toBe(statusCodes.BadRequest);
  });
  it(`"get a thumbnail from the /public/thumbnails/ folder with id bigger than the number of thumbnails" request ${result.fails}`, async () => {
    const res = await request.get(`/api/thumbnail/${thumbnails.length + 1}`);
    expect(res.status).toBe(statusCodes.BadRequest);
  });
});

// clean up
afterAll(async () => {
  await fs.promises.rm(thumbnailsDirPath, { recursive: true, force: true });
  await fs.promises.rm(smallDirPath, { recursive: true, force: true });
  await fs.promises.rm(imagesDirPath, { recursive: true, force: true });
});
