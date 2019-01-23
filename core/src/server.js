const chalk = require("chalk");
const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
const app = express();
const logger = require("./log/logger");

const ikSolver = require("./ik/ik-solver");

const port = 9000;
app.use(cors());
app.options("*", cors());
app.use(bodyParser.json({ type: "application/json" }));

app.get("/ik", function(req, res) {
  logger.info("solving demo IK");
  res.status(200).json(
    ikSolver.solveIK({
      start: { x: 0, y: 0 },
      end: { x: 5, y: 0 },
      jointLengths: [5, 5]
    })
  );
  res.end();
});

app.listen(port, () => {
  logger.info("NILS core is awake and listening on " + port);
});

module.exports = app;
