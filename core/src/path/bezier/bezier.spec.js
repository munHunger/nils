const bezier = require("./bezier");

describe("step", () => {
  it("start position is first point", () =>
    expect(
      bezier.step([[1, 3, 2], [5, 4, 0], [9, 5, 2], [1, 4, 4]], 0)
    ).toEqual([1, 3, 2]));
  it("end position is last point", () =>
    expect(
      bezier.step([[1, 3, 2], [5, 4, 0], [9, 5, 2], [1, 4, 4]], 1)
    ).toEqual([1, 4, 4]));
});

describe("path", () => {
  it("can solve a simple 2 step curve", () =>
    expect(
      bezier.curve([[1, 3, 2], [5, 4, 0], [9, 5, 2], [1, 4, 4]], 2)
    ).toEqual([[1, 3, 2], [1, 4, 4]]));
  it("can solve a 42 step curve", () =>
    expect(
      bezier.curve([[1, 3, 2], [5, 4, 0], [9, 5, 2], [1, 4, 4]], 42).length
    ).toEqual(42));
});
