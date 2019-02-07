function curve(p1, p2, p3, p4, steps) {
  return Array(steps)
    .map((_, idx) => (1 / steps) * idx)
    .map(s => step(p1, p2, p3, p4, s));
}

function step(p1, p2, p3, p4, step) {
  const l1 = p1
    .map((c, index) => c - p2[index])
    .map((c, index) => c * step + p1[index]);
  const l2 = p2
    .map((c, index) => c - p3[index])
    .map((c, index) => c * step + p2[index]);
  const l3 = p3
    .map((c, index) => c - p4[index])
    .map((c, index) => c * step + p3[index]);

  const r1 = l1
    .map((c, index) => c - l2[index])
    .map((c, index) => c * step + l1[index]);
  const r2 = l2
    .map((c, index) => c - l3[index])
    .map((c, index) => c * step + l2[index]);

  return r1
    .map((c, index) => c - r2[index])
    .map((c, index) => c * step + r1[index]);
}

module.exports = {
  curve,
  step
};
