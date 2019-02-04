const logger = require("./logger");

describe("writing logs", () => {
  it("can write info logs", () => logger.logger("test").info("test message"));
  it("can write warning logs", () =>
    logger.logger("test").warn("test message"));
  it("can write error logs", () => logger.logger("test").error("test message"));
});

describe("reading logs", () => {
  it("gets logs", () => expect(logger.getLogs().length > 0).toBeTruthy());
  it("can fetch a subset of logs", () => {
    let logs = logger.getLogs();
    let hash = logs[logs.length - 2].hash;
    expect(logger.getLogsAfterHash(hash).length === 1).toBeTruthy();
  });
});
