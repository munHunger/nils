const path = require("./path");

describe("constructor", () => {
  it("can create an empty path", () =>
    expect(new path.Path([])).toEqual(
      jasmine.objectContaining({ steps: [], index: 0 })
    ));
  it("can create a path of size 1", () =>
    expect(new path.Path([{ pos: [0, 0, 0], rot: [0, 0, 0] }])).toEqual(
      jasmine.objectContaining({
        steps: [{ pos: [0, 0, 0], rot: [0, 0, 0] }],
        index: 0
      })
    ));
  it("can create an empty path", () =>
    expect(
      new path.Path([
        { pos: [0, 0, 0], rot: [0, 0, 0] },
        { pos: [0, 0, 0], rot: [0, 0, 0] }
      ])
    ).toEqual(
      jasmine.objectContaining({
        steps: [
          { pos: [0, 0, 0], rot: [0, 0, 0] },
          { pos: [0, 0, 0], rot: [0, 0, 0] }
        ],
        index: 0
      })
    ));
});

describe("getting data", () => {
  const p = new path.Path([
    { pos: [0, 0, 0], rot: [0, 0, 0] },
    { pos: [1, 0, 0], rot: [0, 0, 0] }
  ]);
  it("can get the first element", () =>
    expect(p.getStep()).toEqual(
      jasmine.objectContaining({ pos: [0, 0, 0], rot: [0, 0, 0] })
    ));
  it("has a next object", () => expect(p.hasNext()).toBeTruthy());
  describe("next", () => {
    it("can get next", () =>
      expect(p.step()).toEqual(
        jasmine.objectContaining({ pos: [1, 0, 0], rot: [0, 0, 0] })
      ));
    it("can get current", () =>
      expect(p.getStep()).toEqual(
        jasmine.objectContaining({ pos: [1, 0, 0], rot: [0, 0, 0] })
      ));
    it("no longer has a next", () => expect(p.hasNext()).toBeFalsy());
  });
});
