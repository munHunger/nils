const ik = require("./ik-solver");

describe("basics", () => {
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
      { pos: [15, 0, 0], rot: 58.6331 },
      { pos: [22.8077, 12.8078, 0], rot: 152.7339 },
      { pos: [10, 5, 0], rot: 0 }
    ]);
  });
  it("breaks early if desired and returns undefined", () => {
    expect(
      ik.jacobianIK(
        {
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
        },
        1
      )
    ).toEqual(undefined);
  });
  it("joints can have predefined rotations", () => {
    expect(
      ik.jacobianIK(
        {
          target: {
            pos: [10, 5, 0],
            rot: [0, 0, 0]
          },
          joints: [
            {
              length: 15,
              rotAxis: [0, 0, 1],
              rot: 5
            },
            {
              length: 15,
              rotAxis: [0, 0, 1],
              rot: 53
            },
            {
              length: 15,
              rotAxis: [0, 0, 1]
            }
          ]
        },
        1
      )
    ).toEqual(undefined);
  });
});

describe("math", () => {
  it("can subtract vectors", () =>
    expect(ik.subvector([3, 2, 5], [1, 2, 4])).toEqual([2, 0, 1]));
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
