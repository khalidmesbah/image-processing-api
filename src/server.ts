import express from "express";
import path from "path";
import router from "./routes/route";
import { HOST, PORT, ENV, statusCodes } from "./utilities/constants";
import morgan from "morgan";

// create the application object
const app = express();

// HTTP request logger middleware
if (ENV === "development") {
  app.use(morgan("tiny"));
}

// Embedded JavaScript templates
app.set("view engine", "ejs");

// add the router
app.use("/api", router);

// use static files
app.use(express.static(path.join(__dirname, "../public")));

// render the home page
app.get("/", (req, res) => {
  console.log(`req`, req.hostname);
  res
    .status(statusCodes.OK)
    .render(path.join(__dirname, `../views`, `index.ejs`), { HOST });
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
  console.log(`the server is running on ${HOST}`);
});

// export the application object to test the endpoints
export default app;
