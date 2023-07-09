import express from "express";
import path from "path";
import router from "./routes/route";
import { PORT, statusCodes } from "./utilities/constants";
import morgan from "morgan";

// create the application object
const app = express();

// HTTP request logger middleware
app.use(morgan("tiny"));

// Embedded JavaScript templates
app.set("view engine", "ejs");

// add the router
app.use("/api", router);

// use static files
app.use(express.static(path.join(__dirname, "../public")));

// render the home page
app.get("/", (_req, res) => {
  res
    .status(statusCodes.OK)
    .render(path.join(__dirname, `../views`, `index.ejs`), { PORT });
});

// render the error page
app.use((_req, res) =>
  res
    .status(statusCodes.NotFound)
    .render(path.join(__dirname, "../views", "404.ejs"))
);

// create the webserver at the specified host and port
// run the server with an optional callback argument
app.listen(PORT, () => {
  console.log(`the server is running on port http://localhost:${PORT}`);
});

// export the application object to test the endpoints
export default app;
