"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
// import express module
const express_1 = __importDefault(require("express"));
// import our routes
const index_1 = __importDefault(require("./routes/index"));
// define the port
const PORT = process.env.PORT || 3000;
// create the application object
const app = (0, express_1.default)();
// set ejs
app.set("view engine", "ejs");
// add the router
app.use("/api", index_1.default);
// use static files
app.use(express_1.default.static("public"));
// render the main page
app.get("/", (req, res) => res.render("./../views/index.ejs"));
// render the error page
app.use((req, res) => res.status(404).render("./../views/404.ejs"));
// run the server
app.listen(PORT, () => {
  console.log(`the server is running on port http://localhost:${PORT}`);
});
