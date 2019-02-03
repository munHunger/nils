const logger = require("../log/logger").logger("path");
const ik = require("../ik/ik-solver");
const pathSolver = require("./path");

let path = new pathSolver.Path([
  { pos: [0, 10, 0], rot: [0, 0, 0] },
  { pos: [15, 0, 0], rot: [0, 0, 0] },
  { pos: [5, 5, 0], rot: [0, 0, 0] },
  { pos: [0, 5, 0], rot: [0, 0, 0] },
  { pos: [0, 10, 0], rot: [0, 0, 0] },
  { pos: [15, 0, 0], rot: [0, 0, 0] }
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
  app.get("/path/step", (req, res) => {
    logger.info("stepping path forwards");
    let setup = {
      target: path.step(),
      joints: config.joints
    };
    logger.info("sending config to IK:" + JSON.stringify(setup));
    let response = ik.jacobianIK(setup);
    config.joints.forEach((joint, index) => (joint.rot = response[index].rot));
    logger.info("stepped into:" + JSON.stringify(response));
    res.status(200).json(response);
    res.end();
  });
}

module.exports = { init };
