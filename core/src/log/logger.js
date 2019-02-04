const chalk = require("chalk");
const winston = require("winston");
const fs = require("fs");

const { combine, timestamp, label, printf } = winston.format;

const logformat = printf(info => {
  let level = chalk.magenta(`[${info.level}]`);
  switch (info.level) {
    case "info":
      level = chalk.green(`[${info.level}]`);
      break;
    case "warn":
      level = chalk.yellow(`[${info.level}]`);
      break;
    case "error":
      level = chalk.red(`[${info.level}]`);
      break;
  }
  let hash = Math.random()
    .toString(36)
    .substring(2, 15);
  return (
    chalk.magenta(hash) +
    " " +
    chalk.cyan(`{${info.label}} `) +
    level +
    ` \t${info.message}`
  );
});

/**
 * @typedef {Object} log
 * @property {string} log.hash the hash identifier of the log
 * @property {string} log.component the component identifier of the log
 * @property {string} log.level the log level. can be one of the following: info|warn|error
 * @property {string} log.message the message of the log
 */
/**
 * Fetches all written logs
 *
 * @returns {log[]} a list of all recorded logs
 */
function getLogs() {
  return fs
    .readFileSync("server.log")
    .toString()
    .split("\n")
    .filter(line => line.length > 0)
    .map(line => {
      let message = line.substr(line.indexOf("\t") + 1);
      let comp = line.split(" ");
      return {
        hash: comp[0],
        component: comp[1],
        level: comp[2],
        message: message
      };
    });
}
/**
 * Fetches all logs that has been recieved after the provided hash
 * @param {string} hash the hash to search for.
 * @returns {log[]} all logs that are after the provided hash
 */
function getLogsAfterHash(hash) {
  let logs = getLogs();
  let index = 0;
  logs.forEach((log, i) => (index = log.hash === hash ? i : index));
  return logs.slice(index + 1);
}

/**
 * Builds a logger component
 * @param {string} component the component name identifier
 * @returns {winston.Logger} a logger component
 */
function logger(component) {
  return winston.createLogger({
    level: "info",
    format: combine(
      label({ label: "core." + component }),
      timestamp(),
      logformat
    ),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: "server.log", level: "info" })
    ]
  });
}

module.exports = { logger, getLogs, getLogsAfterHash };
