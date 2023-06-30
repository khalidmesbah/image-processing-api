// import express module
import express, { Application, Request, Response } from "express";

// import the path module
import path from "path";

// import our route
import router from "./routes/route";

// import the environment variables
import dotenv from "dotenv";

// configure the environment variables
dotenv.config();

// define the port
const PORT = process.env.PORT || 3003;

// create the application object
const app: Application = express();

// set ejs
app.set("view engine", "ejs");

// add the router
app.use("/api", router);

// use static files
app.use(express.static(path.join(__dirname, "../public")));

// render the home page
app.get("/", (_req: Request, res: Response) =>
  res
    .status(200)
    .render(path.resolve(__dirname, `../views`, `index.ejs`), { PORT })
);

// render the error page
app.use((_req: Request, res: Response) =>
  res.status(404).render(path.join(__dirname, "../views", "404.ejs"))
);

// create the webserver at the specified host and port
// run the server with an optional callback argument
app.listen(PORT, () => {
  console.log(`the server is running on port http://localhost:${PORT}`);
});

// export the application object to test the endpoints
export default app;
