const { solveIK } = require("./ik-solver");

describe("basics", () => {
  it("solves a simple 90degree bend on equal arms", () =>
    expect(
      solveIK({
        start: { x: 0, y: 0 },
        end: { x: Math.sqrt(Math.pow(2, 5) * 2), y: 0 },
        jointLengths: [5, 5]
      }).toBe([45, -45])
    ));
});
