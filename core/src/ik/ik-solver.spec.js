const ik = require("./ik-solver");

describe("basics", () => {
  it("solves a simple equal sided triangle", () =>
    expect(
      ik.solveIK({
        start: { x: 0, y: 0 },
        end: { x: 5, y: 0 },
        jointLengths: [5, 5]
      })
    ).toEqual([60, 60]));
  it("solves a simple equal sided triangle that is rotated 90 degrees", () =>
    expect(
      ik.solveIK({
        start: { x: 0, y: 0 },
        end: { x: 0, y: 5 },
        jointLengths: [5, 5]
      })
    ).toEqual([150, 60]));
  it("solves for a straight full reach", () =>
    expect(
      ik.solveIK({
        start: { x: 0, y: 0 },
        end: { x: 10, y: 0 },
        jointLengths: [5, 5]
      })
    ).toEqual([0, 180]));
  it("jacobian", () => {
    expect(
      ik.jacobianIK({
        target: {
          pos: [10, 5, 0],
          rot: [0, 0, 0]
        },
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
      })
    ).toEqual([
      { pos: [15, 0, 0], rot: 58.633 },
      { pos: [22.8078, 12.8078, 0], rot: 152.7339 },
      { pos: [10, 5, 0], rot: 0 }
    ]);
  });
});

describe("math", () => {
  it("can subtract vectors", () =>
    expect(ik.subvector([3, 2, 5], [1, 2, 4])).toEqual([2, 0, 1]));

  it("can transpose a vector", () =>
    expect(
      ik.transpose([
        [99, 123, 43],
        [123, 432, 345],
        [645, 345, 765],
        [123, 41, 75]
      ])
    ).toEqual([[99, 123, 645, 123], [123, 432, 345, 41], [43, 345, 765, 75]]));
  it("can multiply matrix with vector", () =>
    expect(ik.matrixVectorMult([[1, 2, 3], [4, 5, 6]], [9, 8, 7])).toEqual([
      46,
      118
    ]));
  it("can multiply matrix", () => {
    expect(
      ik.matrixMultiplication(
        [[0, 3, 5], [5, 5, 2]],
        [[3, 4], [3, -2], [4, -2]]
      )
    ).toEqual([[29, -16], [38, 6]]);
  });
});
