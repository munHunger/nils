const logger = require("../log/logger").logger("path");
const ik = require("../ik/ik-solver");
const pathSolver = require("./path");
const config = require("../config/config");
const bezierRoute = require("./bezier/route");

let path = new pathSolver.Path([
  { pos: [3, 10, 0], rot: [0, 0, 0] },
  { pos: [5, 1, 0], rot: [0, 0, 0] },
  { pos: [5, 5, 1], rot: [0, 0, 0] },
  { pos: [0, 5, 3], rot: [0, 0, 0] },
  { pos: [0, 1, 2], rot: [0, 0, 0] },
  { pos: [5, 2, 1], rot: [0, 0, 0] }
]);

/**
 * configures the app by adding some routes for the path system
 * @param {Express} app the app to configure
 * @returns {void} configures the app as a side effect
 */
function init(app) {
  app.post("/path", (req, res) => {
    path = new pathSolver.Path(
      req.body.map(pos => {
        return { pos: pos, rot: [0, 0, 0] };
      })
    );
    res.status(204);
    res.end();
  });
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
  bezierRoute.init(app);
}

module.exports = { init };
