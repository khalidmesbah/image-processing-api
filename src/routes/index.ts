const express = require("express");
const routes = express.Router();

routes.get("/", (req, res) => {
  res.send("main api route");
});

export default routes;
