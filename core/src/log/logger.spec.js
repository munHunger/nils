const logger = require("../log/logger").logger("test");

describe("levels", () => {
  it("can log info", () => logger.info("test"));
  it("can log error", () => logger.error("test"));
  it("can log warning", () => logger.warn("test"));
});
