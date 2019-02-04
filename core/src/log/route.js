const logger = require("../log/logger");

/**
 * configures the app by adding some routes for the logging system
 * @param {Express} app the app to configure
 * @returns {void} configures the app as a side effect
 */
function init(app) {
  app.get("/log", (req, res) => {
    let hash = req.query.hash;
    if (!hash) res.status(200).json(logger.getLogs());
    else res.status(200).json(logger.getLogsAfterHash(hash));
    res.end();
  });
}

module.exports = { init };
