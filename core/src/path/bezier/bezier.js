function curve(points, steps) {
  return Array.apply(null, { length: steps })
    .map((_, idx) => (1 / (steps - 1)) * idx)
    .map(s => step(points, s));
}

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
