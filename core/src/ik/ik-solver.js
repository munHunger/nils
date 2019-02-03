const logger = require("../log/logger").logger("ik");

/**
 * Runs forward kinematics on the state using matrix calculations
 *
 * @param {Object} state the state to solve
 * @param {Object} state.target The target to reach for with the IK
 * @param {number[]} state.target.pos the [x,y,z] coordinates to reach
 * @param {number[]} state.target.rot the [x,y,z] rotation of the end factor
 * @param {Object[]} state.joints the joint configuration to solve with
 * @param {number} state.joints[].length the length of the joint expressed in arbitrary units
 * @param {number[]} state.joints[].rotAxis the [x,y,z] rotation vector for the joint
 *
 * @returns {void} updates the pos value of state.joints[].pos
 */
function forwardKinematics(state) {
  let matrix = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
  state.joints.forEach(joint => {
    matrix = translate(matrix, [joint.length, 0, 0]);
    matrix = rotate(matrix, joint.rot, joint.rotAxis);
    applyMatrix(matrix, joint);
  });
}

/**
 * Applies a transformation matrix to a joint
 * @param {Array.<Array.<number>>} matrix the transformation matrix to apply
 * @param {Object} joint the joint to apply transformation to
 *
 * @returns {void} sets the pos value of the joint as a side effect
 */
function applyMatrix(matrix, joint) {
  joint.pos = matrixMultiplication(matrix, [[0], [0], [0], [1]])
    .map(a => a[0])
    .slice(0, 3);
}

/**
 * Applies translation on the transformation matrix
 *
 * @param {Array.<Array.<number>>} matrix the transformation matrix to apply translation to
 * @param {number[]} vector the [x,y,z] translation to apply
 *
 * @returns {Array.<Array.<number>>} the transformation matrix with translation applied acordingly
 */
function translate(matrix, vector) {
  return matrixMultiplication(matrix, [
    [1, 0, 0, vector[0]],
    [0, 1, 0, vector[1]],
    [0, 0, 1, vector[2]],
    [0, 0, 0, 1]
  ]);
}

/**
 * Create a translation matrix for rotation
 *
 * @param {Array.<Array.<number>>} matrix the matrix to apply rotation to
 * @param {number} angle the amount of radians to rotate
 * @param {number[]} vector the [x,y,z] vector to indicate where to apply rotation
 *
 * @returns {Array.<Array.<number>>} the transformation matrix with rotation applied acordingly
 */
function rotate(matrix, angle, vector) {
  let rotMatrix = [
    [
      [x => 1, x => 0, x => 0, x => 0],
      [x => 0, x => Math.cos(x), x => -Math.sin(x), x => 0],
      [x => 0, x => Math.sin(x), x => Math.cos(x), x => 0],
      [x => 0, x => 0, x => 0, x => 1]
    ],
    [
      [x => Math.cos(x), x => 0, x => Math.sin(x), x => 0],
      [x => 0, x => 1, x => 0, x => 0],
      [x => -Math.sin(x), x => 0, x => Math.cos(x), x => 0],
      [x => 0, x => 0, x => 0, x => 1]
    ],
    [
      [x => Math.cos(x), x => -Math.sin(x), x => 0, x => 0],
      [x => Math.sin(x), x => Math.cos(x), x => 0, x => 0],
      [x => 0, x => 0, x => 1, x => 0],
      [x => 0, x => 0, x => 0, x => 1]
    ]
  ];
  rotMatrix
    .map((axis, index) =>
      axis.map(d => d.map(v => v.apply(this, [angle * vector[index]])))
    )
    .forEach(rotation => (matrix = matrixMultiplication(matrix, rotation)));
  return matrix;
}

/**
 * @typedef {Object} joint
 * @property {number[]} joint.pos the [x,y,z] coordinate of the endfactor of the joint
 * @property {number} joint.rot the rotation of the joint expressed in degrees
 */

/**
 * Runs a jacobian based inverse kinematics on the given state.
 *
 * @param {Object} state the state to solve
 * @param {Object} state.target The target to reach for with the IK
 * @param {number[]} state.target.pos the [x,y,z] coordinates to reach
 * @param {number[]} state.target.rot the [x,y,z] rotation of the end factor
 * @param {Object[]} state.joints the joint configuration to solve with
 * @param {number} state.joints[].length the length of the joint expressed in arbitrary units
 * @param {number[]} state.joints[].rotAxis the [x,y,z] rotation vector for the joint
 *
 * @returns {joint} the resulting state
 */
function jacobianIK(state) {
  state.joints.forEach(joint => (joint.rot = 0));
  forwardKinematics(state);
  let last = -1;
  let dist = 1;
  let margin = 0.00001;
  theta = state.joints.map(joint => joint.rot);
  let steps = 0;
  while (dist > margin && last !== dist && steps < 500000) {
    steps++;
    last = dist;
    dist = Math.sqrt(
      subvector(state.target.pos, state.joints[state.joints.length - 1].pos)
        .map(v => v ** 2)
        .reduce((acc, val) => (acc += val), 0)
    );
    dO = getDeltaOrientation(state);
    theta = addvector(theta, dO.map(d => d * 0.001));
    for (let n = 0; n < state.joints.length; n++)
      state.joints[n].rot = theta[n];
    forwardKinematics(state);
  }
  if (steps === 500000)
    logger.error("did not solve IK after " + steps + " steps");
  else logger.info("solved in " + steps + " steps");
  for (let n = 0; n < state.joints.length; n++)
    state.joints[n].rot = (state.joints[n].rot * 180) / Math.PI;

  return state.joints.map(joint => {
    return {
      pos: joint.pos.map(c => parseFloat(c.toFixed(4))),
      rot: parseFloat(joint.rot.toFixed(4))
    };
  });
}

/**
 * Get an orientation that should be closer to the endfactor
 * @param {Object} state the current state of the IK
 * @returns {number[]} a list of angles
 */
function getDeltaOrientation(state) {
  let jt = jacobianTranspose(state);
  let v = subvector(
    state.target.pos,
    state.joints[state.joints.length - 1].pos
  );
  let dO = matrixVectorMult(jt, v);
  return dO;
}

/**
 * Runs the jacobian transpose
 *
 * @param {Object} state the current state of the IK.
 * @returns {Array.<Array.<number>>} the jacobian transpose matrix
 */
function jacobianTranspose(state) {
  return transpose(
    state.joints
      .map(joint =>
        crossProduct(joint.rotAxis, subvector(state.target.pos, joint.pos))
      )
      .reduce((acc, val) => {
        acc.push(val);
        return acc;
      }, [])
  );
}

/**
 * Calculates the cross product of 2 vectors
 * @param {number[]} a first vector of length 3
 * @param {number[]} b second vector of length 3
 *
 * @returns {number[]} the result of a cross b
 */
function crossProduct(a, b) {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0]
  ];
}

/**
 * multiplies a matrix with a vector
 * @param {Array.<Array.<number>>} matrix the matrix to multiply
 * @param {number[]} vector the vector to multiply with
 * @returns {Array.<Array.<number>>} the multiplied matrix
 */
function matrixVectorMult(matrix, vector) {
  return matrix.map(row =>
    row
      .map((col, index) => (col *= vector[index]))
      .reduce((acc, val) => (acc += val), 0)
  );
}

/**
 * multiplies two matrixes.
 * Stolen from https://stackoverflow.com/questions/27205018/multiply-2-matrices-in-javascript
 *
 * @param {Array.<Array.<number>>} m1 first matrix
 * @param {Array.<Array.<number>>} m2 second matrix to multiply
 * @returns {Array.<Array.<number>>} the multiplied matrix
 */
function matrixMultiplication(m1, m2) {
  var aNumRows = m1.length,
    aNumCols = m1[0].length,
    bNumCols = m2[0].length,
    m = new Array(aNumRows); // initialize array of rows
  for (var r = 0; r < aNumRows; ++r) {
    m[r] = new Array(bNumCols); // initialize the current row
    for (var c = 0; c < bNumCols; ++c) {
      m[r][c] = 0; // initialize the current cell
      for (var i = 0; i < aNumCols; ++i) {
        m[r][c] += m1[r][i] * m2[i][c];
      }
    }
  }
  return m;
}

/**
 * rotates a matrix clockwise
 * @example
 * transpose([
 * [99, 123, 43],
 * [123, 432, 345],
 * [645, 345, 765],
 * [123,41,75]
 * ]) = [
 * [99, 123, 645, 123],
 * [123, 432, 345, 41],
 * [43, 345, 765, 75]
 * ]
 *
 * @param {Array.<Array.<number>>} matrix the matrix to transpose
 * @returns {Array.<Array.<number>>} the transposed matrix
 */
function transpose(matrix) {
  let width = matrix.length;
  let height = matrix[0].length;
  let result = [];
  for (let i = 0; i < height; i++) {
    result[i] = [];
    for (let n = 0; n < width; n++) result[i][n] = matrix[n][i];
  }
  return result;
}

/**
 * Subtracts a vector from another cell by cell
 *
 * @example
 * [v1[0]-v2[0],v1[1]-v2[1],...,v1[n]-v2[n]]
 *
 * @example
 * subvector([10,20,30],[4,5,6]) = [6,15,24]
 *
 * @param {number[]} v1 first vector
 * @param {number[]} v2 second vector, this must be of length n, where n is the length of v1
 * @returns {number[]} a vector with v1 and v2 subtracted cell by cell
 */
function subvector(v1, v2) {
  return v1.map((val, index) => (val -= v2[index]));
}

/**
 * Adds to vectors cell by cell, i.e.
 *
 * @example
 * [v1[0]+v2[0],v1[1]+v2[1],...,v1[n]+v2[n]]
 *
 * @example
 * addvector([1,2,3],[4,5,6]) = [5,7,9]
 *
 * @param {number[]} v1 first vector
 * @param {number[]} v2 second vector, this must be of length n, where n is the length of v1
 * @returns {number[]} a vector with v1 and v2 summed cell by cell
 */
function addvector(v1, v2) {
  return v1.map((val, index) => (val += v2[index]));
}

module.exports = {
  jacobianIK,
  subvector,
  transpose,
  matrixVectorMult,
  crossProduct,
  matrixMultiplication
};
