/**
 * Solve an IK state by taking a start and an end state with a list of joints and return a list of angles needed to achive the state
 *
 * @param {Object} input The IK state to solve
 * @param {Object} input.start The start coordinates to solve from
 * @param {number} input.start.x The x-coordinate start solving from
 * @param {number} input.start.y The y-coordinate start solving from
 * @param {Object} input.end The end coordinates to solve to
 * @param {number} input.end.x The x-coordinate end solving to
 * @param {number} input.end.y The y-coordinate end solving to
 * @param {number[]}  input.jointLengths A list of joints and their respective lengths. The units are irrelevant as the only relevant information is their relative lengths to eachother
 *
 * @returns {number[]} A list of angles needed to reach the end position of the input from the given start. Each angle is relative from the position of the joint specified in the jointLengths in order with 4 decimal precision
 */
function solveIK(input) {
  let x = Math.abs(input.start.x - input.end.x);
  let y = Math.abs(input.start.y - input.end.y);
  let dist = Math.sqrt(x ** 2 + y ** 2);

  let deg = sssTriangle([
    input.jointLengths[1],
    input.jointLengths[0],
    dist
  ]).map(deg => parseFloat(deg.toFixed(4)));
  return [deg[0], deg[2]];
}

/**
 * Calculates all angles of the triangle based on its lengths using the formula
 * cos(A) =  b^2 + c^2 − a2^ / 2bc
 * @param {number[]} input The lengths of a triangle where the second and the last distances makes up for the first angle. The first and last distances make up the second angle
 * @returns {number[]} The angles of the triangle
 */
function sssTriangle(input) {
  let theta1 = Math.acos(
    (input[1] ** 2 + input[2] ** 2 - input[0] ** 2) / (2 * input[1] * input[2])
  );

  let theta2 = Math.acos(
    (input[2] ** 2 + input[0] ** 2 - input[1] ** 2) / (2 * input[2] * input[0])
  );

  return [theta1, theta2, Math.PI - theta1 - theta2].map(
    rad => (rad * 180) / Math.PI
  );
}

module.exports = { solveIK };
