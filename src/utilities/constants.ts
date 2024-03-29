import dotenv from "dotenv";
import path from "path";
import fs from "fs-extra";

// configure the environment variables
dotenv.config();

const PORT = process.env.PORT || 3003;
const HOST = process.env.HOST || "http://localhost:" + PORT;
const ENV = process.env.ENV || "development";

const imagesDirPath = path.join(__dirname, `../../public`, `images`);
const thumbnailsDirPath = path.join(__dirname, `../../public`, `thumbnails`);
const listImagesDirPath = path.join(
  __dirname,
  "../../views/",
  "listImages.ejs"
);
const smallDirPath = path.join(__dirname, "../../public", "small");
const sampleDirPath = path.join(__dirname, "../../public", "sample");

const supportedFormats = [
  "png",
  "jpeg",
  "jpg",
  "webp",
  "avif",
  "tiff",
  "gif",
  "svg",
];
let images: string[] = [];
const syncImages = async () => {
  try {
    await fs.ensureDir(imagesDirPath);
    images = await fs.readdir(imagesDirPath);
    images = images.filter((image: string) => {
      const [, imageFormat] = image.split(".");
      return supportedFormats.includes(imageFormat);
    });
  } catch (err) {
    console.error(err);
  }
  return images;
};

let thumbnails: string[] = [];
const syncThumbnails = async () => {
  try {
    await fs.ensureDir(thumbnailsDirPath);
    thumbnails = await fs.readdir(thumbnailsDirPath);
  } catch (err) {
    console.error(err);
  }
  return thumbnails;
};

const statusCodes = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  OK: 200,
  Created: 201,
  Accepted: 202,
  "Non-AuthoritativeInformation": 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  "Multi-Status": 207,
  AlreadyReported: 208,
  IMUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  URITooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  "I'mateapot": 418,
  MisdirectedRequest: 421,
  UnprocessableContent: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HTTPVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
};

export {
  images,
  syncImages,
  thumbnails,
  syncThumbnails,
  imagesDirPath,
  thumbnailsDirPath,
  listImagesDirPath,
  smallDirPath,
  sampleDirPath,
  PORT,
  HOST,
  ENV,
  supportedFormats,
  statusCodes,
};
