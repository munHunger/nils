const { solveIK } = require("./ik-solver");

describe("basics", () => {
  it("solves a simple equal sided triangle", () =>
    expect(
      solveIK({
        start: { x: 0, y: 0 },
        end: { x: 5, y: 0 },
        jointLengths: [5, 5]
      })
    ).toEqual([60, 60]));
  it("solves a simple equal sided triangle that is rotated 90 degrees", () =>
    expect(
      solveIK({
        start: { x: 0, y: 0 },
        end: { x: 0, y: 5 },
        jointLengths: [5, 5]
      })
    ).toEqual([150, 60]));
  it("solves for a straight full reach", () =>
    expect(
      solveIK({
        start: { x: 0, y: 0 },
        end: { x: 10, y: 0 },
        jointLengths: [5, 5]
      })
    ).toEqual([0, 180]));
});
