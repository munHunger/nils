const logger = require("../log/logger");
const ik = require("../ik/ik-solver");
const path = require("./path");

let path = new path.Path([
  { pos: [15, 0, 0], rot: [0, 0, 0] },
  { pos: [5, 5, 0], rot: [0, 0, 0] },
  { pos: [0, 5, 0], rot: [0, 0, 0] },
  { pos: [0, 10, 0], rot: [0, 0, 0] }
]);
let config = {
  joints: [
    {
      length: 15,
      rotAxis: [0, 0, 1]
    },
    {
      length: 15,
      rotAxis: [0, 0, 1]
    },
    {
      length: 15,
      rotAxis: [0, 0, 1]
    }
  ]
};
function init(app) {
  app.post("/path/step", (req, res) => {
    logger.info("stepping path forwards");
    res.status(200).json(
      ik.jacobianIK({
        target: path.step(),
        joints: config.joints
      })
    );
    res.end();
  });
}

module.exports = { init };
