import express, { Application, Request, Response } from "express";
import router from "./routes/index";
import resizer from "./utilities/resize";
// define the port
const PORT = process.env.PORT || 3000;

// create an instance server
const app: Application = express();

app.use("/api", router);

// start express server
app.listen(PORT, () => {
  console.log("the server is running.....");
});
