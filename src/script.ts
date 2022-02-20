import express, { Application, Request, Response } from "express";
import router from "./routes/index";
import path from "path";
// define the port
const PORT = process.env.PORT || 3000;

// create an instance server
const app: Application = express();

app.use("/api", router);

app.get("/sendImage", async (req, res) => {
  res.sendFile(
    path.join(
      __dirname,
      `../../resized_images/${
        ((req.query.image as string)!.slice(0, -4) as string) || ""
      }_${req.query.width}_${req.query.height}.jpg`
    )
  );
});
// start express server
app.listen(PORT, () => {
  console.log("the server is running.....");
});
