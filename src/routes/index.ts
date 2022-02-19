import express, { Request, response, Response } from "express";
const router = express.Router();
let image, width, height;

router.route("/resize").get((req: Request, res: Response) => {
  console.log(req.query.image, req.query.width, req.query.height);
  image = req.query.image;
  width = req.query.width;
  height = req.query.height;
  res.send(`${req.query.image} ${req.query.height} ${req.query.width}`);
});

export default router;
