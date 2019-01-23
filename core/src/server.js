const chalk = require("chalk");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const logger = require("./log/logger");

const ikSolver = require("./ik/ik-solver");

const port = 8000;
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
app.use(bodyParser.json({ type: "application/json" }));
app.listen(port, () => {
  logger.info("NILS core is awake and listening on " + port);
});

module.exports = app;
