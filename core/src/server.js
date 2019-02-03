const chalk = require("chalk");
const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
const app = express();
const logger = require("./log/logger").logger("server");

const ikSolver = require("./ik/ik-solver");

const pathRoute = require("./path/route");

const port = 9000;
app.use(cors());
app.options("*", cors());
app.use(bodyParser.json({ type: "application/json" }));

pathRoute.init(app);

app.post("/ik", function(req, res) {
  logger.info("solving IK");
  var body = req.body;
  logger.info(JSON.stringify(body));
  var result = ikSolver.jacobianIK(body);
  logger.info("solved IK");
  logger.info(JSON.stringify(result));
  res.status(200).json(result);
  res.end();
});

app.listen(port, () => {
  logger.info("NILS core is awake and listening on " + port);
});

module.exports = app;
