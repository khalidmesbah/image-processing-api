import express, { Application, Request, Response } from "express";
import router from "./routes/index";

const PORT = process.env.PORT || 3000;
const app: Application = express();

app.use("/api", router);

app.listen(PORT, () => {
  console.log("the server is running.....");
});
