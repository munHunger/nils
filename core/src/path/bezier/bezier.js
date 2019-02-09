/**
 * Generate a list of points on the curve as defined by the points.
 * @param {Array.<Array.<number>>} points a list of [x,y,z] coordinates that defines the curve. note that the curve only passes through the end points
 * @param {number} steps the interpolation, or how many points to extract. the points will be uniformly distributed on the path
 *
 * @returns {Array.<Array.<number>>} a list on uniformly distributed points on the curve as defined by the points
 */
function curve(points, steps) {
  return Array.apply(null, { length: steps })
    .map((_, idx) => (1 / (steps - 1)) * idx)
    .map(s => step(points, s));
}

/**
 * Calculate a point in the bezier curve as defined by the points
 *
 * @param {Array.<Array.<number>>} points a list of [x,y,z] coordinates that defines the curve. note that the curve only passes through the end points
 * @param {number[]} s the progress of the curve. should be contained within 0 <= s <= 1
 *
 * @returns {number[]} a point on the bezier curve defined by the points that is s percent through the path
 */
function step(points, s) {
  let l = points
    .filter(p => p)
    .reduce((acc, val, index, arr) => {
      if (index + 1 < arr.length)
        acc.push(
          val
            .map((c, i) => c - arr[index + 1][i])
            .map(c => c * s)
            .map((c, i) => val[i] - c)
        );
      return acc;
    }, []);
  if (l.length === 1) return l[0];
  return step(l, s);
}

module.exports = {
  curve,
  step
};
