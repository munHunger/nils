const ik = require("../ik/ik-solver");

let config = {
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
};
let states = [
  { pos: [1, 14, 0], rot: [0, 0, 0] },
  { pos: [14, 0, 0], rot: [0, 0, 0] },
  { pos: [3, 3, 0], rot: [0, 0, 0] },
  { pos: [11, 10, 0], rot: [0, 0, 0] },
  { pos: [5, 10, 0], rot: [0, 0, 0] },
  { pos: [9, 4, 0], rot: [0, 0, 0] },
  { pos: [5, 0, 0], rot: [0, 0, 0] },
  { pos: [11, 0, 0], rot: [0, 0, 0] },
  { pos: [10, 0, 0], rot: [0, 0, 0] },
  { pos: [3, 10, 0], rot: [0, 0, 0] },
  { pos: [9, 3, 0], rot: [0, 0, 0] },
  { pos: [14, 7, 0], rot: [0, 0, 0] },
  { pos: [6, 10, 0], rot: [0, 0, 0] },
  { pos: [10, 5, 0], rot: [0, 0, 0] },
  { pos: [2, 8, 0], rot: [0, 0, 0] },
  { pos: [10, 5, 0], rot: [0, 0, 0] }
];
states = Array.from({ length: 200 }, () => {
  let s = {
    pos: Array.from({ length: 2 }, () => Math.floor(Math.random() * 15)),
    rot: [0, 0, 0]
  };
  s.pos.push(0);
  return s;
});
console.log(states);
let bestIndex = 0.1;
let best = 99999999;
for (let i = 0.0000001; i < 0.1; i *= 2) {
  console.log("testing " + i + "\twith current best " + best);
  let avg =
    states
      .map(s => ik.jacobianIK({ target: s, joints: config.joints }, i))
      .reduce((acc, val) => (acc += val), 0) / states.length;
  if (avg < best) {
    best = avg;
    bestIndex = i;
  }
}
console.log(bestIndex + ":" + best);
