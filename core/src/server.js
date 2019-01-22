const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const port = 8000;
app.get("/", function(req, res) {
  res.status(200).json({ status: "it's kay" });
  res.end();
});
app.use(bodyParser.json({ type: "application/json" }));
app.listen(port, () => {
  console.log("We are live on " + port);
});

module.exports = app;
