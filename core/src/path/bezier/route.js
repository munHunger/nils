const logger = require("../../log/logger").logger("path");
const bezier = require("./bezier");

/**
 * configures the app by adding some routes for the bezier system
 * @param {Express} app the app to configure
 * @returns {void} configures the app as a side effect
 */
function init(app) {
  app.post("/path/bezier", (req, res) => {
    logger.info(
      "generating a bezier curve for points: " + JSON.stringify(req.body)
    );
    let response = bezier.curve(req.body, 16);
    logger.info("generated curve: " + JSON.stringify(response));
    res.status(200).json(response);
    res.end();
  });
}

module.exports = { init };
