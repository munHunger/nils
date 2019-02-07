/**
 * A path for the robot to follow.
 */
class Path {
  /**
   * @typedef {Object} step
   * @property {number[]} step.pos the [x,y,z] coordinate of the endfactor of the joint
   * @property {number} step.rot the rotation of the joint expressed in degrees
   */
  /**
   * Constructs a path with a set of steps
   * @param {step} steps a list of steps to take
   */
  constructor(steps) {
    this.steps = steps;
    this.index = 0;
  }

  /**
   * Fetches the current step
   * @returns {step} The current step
   */
  getStep() {
    return this.steps[this.index];
  }

  /**
   * Increases the current step and returns the new step position
   * @returns {step} the next step
   */
  step() {
    this.index++;
    return this.steps[this.index];
  }

  /**
   * Checks if there are more steps in the path
   * @returns {boolean} true iff there are more steps to take before the path ends
   */
  hasNext() {
    return this.index < this.steps.length - 1;
  }
}

module.exports = { Path };
