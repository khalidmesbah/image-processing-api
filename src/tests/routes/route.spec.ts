import fs from "fs";
import supertest from "supertest";
import app from "../../server";
import path from "path";
import {
  images,
  imagesDirPath,
  statusCodes,
  syncImages,
  syncThumbnails,
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

describe(`GET /api/resize`, async () => {
  const image = "fjord.jpg";
  const txt = "text.txt";

  const test = (
    text: string,
    result: string,
    width: number | string,
    height: number | string,
    image: string,
    status: number
  ) => {
    return it(`"${text}" request ${result}`, async () => {
      const res = await request.get(
        `/api/resize?width=${width}&height=${height}&image=${image}`
      );
      expect(res.status).toBe(status);
    });
  };

  // correct width, height and image
  test(
    "width and height of positive integers, and a correct image",
    result.succeeds,
    200,
    200,
    image,
    statusCodes.OK
  );
  test(
    "width and height of positive integers, and a correct image",
    result.succeeds,
    200,
    200,
    image,
    statusCodes.OK
  );
  // wrong width
  test("width is zero", result.fails, 0, 100, image, statusCodes.BadRequest);
  test(
    "width is negative",
    result.fails,
    -200,
    200,
    image,
    statusCodes.BadRequest
  );
  test(
    "width is float",
    result.fails,
    200.5,
    200,
    image,
    statusCodes.BadRequest
  );
  test(
    "width is non-numerical",
    result.fails,
    "not numerical",
    200,
    image,
    statusCodes.BadRequest
  );
  // wrong height
  test("height is zero", result.fails, 100, 0, image, statusCodes.BadRequest);
  test(
    "height is negative",
    result.fails,
    200,
    -200,
    image,
    statusCodes.BadRequest
  );
  test(
    "height is float",
    result.fails,
    200,
    200.5,
    image,
    statusCodes.BadRequest
  );
  test(
    "height is non-numerical",
    result.fails,
    200,
    "non numerical",
    image,
    statusCodes.BadRequest
  );
  // wrong image
  test(
    "image with a wrong format",
    result.fails,
    200,
    200,
    txt,
    statusCodes.BadRequest
  );
});

describe(`POST /api/resize`, async () => {
  const image = path.join(imagesDirPath, "fjord.jpg");
  const txt = path.join(imagesDirPath, "text.txt");

  const test = (
    text: string,
    result: string,
    width: number | string,
    height: number | string,
    image: string,
    status: number
  ) => {
    return it(`"${text}" request ${result}`, async () => {
      const res = await request
        .post("/api/resize")
        .field("width", width)
        .field("height", height)
        .attach("image", image)
        .then(res => res);
      expect(res.status).toBe(status);
    });
  };

  // correct width, height and image
  test(
    "width and height of positive integers, and a correct image",
    result.succeeds,
    100,
    100,
    image,
    statusCodes.OK
  );
  // wrong width
  test("width is zero", result.fails, 0, 100, image, statusCodes.BadRequest);
  test(
    "width is negative",
    result.fails,
    -100,
    100,
    image,
    statusCodes.BadRequest
  );
  test(
    "width is float",
    result.fails,
    100.5,
    100,
    image,
    statusCodes.BadRequest
  );
  test(
    "width is non-numerical",
    result.fails,
    "not numerical",
    100,
    image,
    statusCodes.BadRequest
  );
  // wrong height
  test("height is zero", result.fails, 100, 0, image, statusCodes.BadRequest);
  test(
    "height is negative",
    result.fails,
    100,
    -100,
    image,
    statusCodes.BadRequest
  );
  test(
    "height is float",
    result.fails,
    100,
    100.5,
    image,
    statusCodes.BadRequest
  );
  test(
    "height is non-numerical",
    result.fails,
    100,
    "non numerical",
    image,
    statusCodes.BadRequest
  );
  // wrong image
  test("image with a wrong format", result.fails, 100, 100, txt, 500);
});

describe("GET /api/images", () => {
  beforeAll(() => {
    console.log(`beforeAll`);
    syncImages();
  });
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
  it(`"get the first image from the /public/images/ folder with id = 1" request ${result.succeeds}`, async () => {
    const res = await request.get("/api/image/1");
    expect(res.status).toBe(statusCodes.OK);
  });
  it(`"get the last image from the /public/images/ folder with id = ${images.length}" request ${result.succeeds}`, async () => {
    const res = await request.get(`/api/image/${images.length}`);
    expect(res.status).toBe(statusCodes.OK);
  });
  it(`"get an image from the /public/images/ folder with id = 0" request ${result.fails}`, async () => {
    const res = await request.get("/api/image/0");
    expect(res.status).toBe(statusCodes.BadRequest);
  });
  it(`"get an image from the /public/images/ folder with id = ${
    images.length + 1
  }" request ${result.fails}`, async () => {
    const res = await request.get(`/api/image/${images.length + 1}`);
    expect(res.status).toBe(statusCodes.BadRequest);
  });
});

describe("GET /api/thumbnails", () => {
  beforeAll(() => {
    console.log(`beforeAll`);
    syncThumbnails();
  });
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

describe("GET /api/thumbnail/?:id", () => {
  it(`"get the first thumbnail from the /public/thumbnails/ folder with id = 1" request ${result.succeeds}`, async () => {
    const res = await request.get("/api/thumbnail/1");
    expect(res.status).toBe(statusCodes.OK);
  });
  it(`"get the last thumbnail from the /public/thumbnails/ folder with id = ${thumbnails.length}" request ${result.succeeds}`, async () => {
    const res = await request.get(`/api/thumbnail/${thumbnails.length}`);
    expect(res.status).toBe(statusCodes.OK);
  });
  it(`"get an thumbnail from the /public/thumbnails/ folder with id = 0" request ${result.fails}`, async () => {
    const res = await request.get("/api/thumbnail/0");
    expect(res.status).toBe(statusCodes.BadRequest);
  });
  it(`"get an thumbnail from the /public/thumbnails/ folder with id = ${
    thumbnails.length + 1
  }" request ${result.fails}`, async () => {
    const res = await request.get(`/api/thumbnail/${thumbnails.length + 1}`);
    expect(res.status).toBe(statusCodes.BadRequest);
  });
  afterAll(async () => {
    console.log(`afterAll`);
    await fs.promises.rm(thumbnailsDirPath, { recursive: true, force: true });
  });
});
