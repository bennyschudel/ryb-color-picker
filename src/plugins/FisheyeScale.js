/**
 * Creates a fisheye scale function that distorts values based on a focus point.
 */
export function FisheyeScale() {
  let min = 0;
  let max = 1;
  let distortion = 0;
  let focus = null;

  function rescale(value) {
    return ((distortion + 1) * value) / (distortion * value + 1);
  }

  // --- main ---

  /**
   * Adjusts the given value based on a focus point and rescales it.
   *
   * @param {number} value - The value to be adjusted.
   * @returns {number} - The adjusted and rescaled value.
   */
  function main(value) {
    if (focus == null) {
      return (value - min) / (max - min);
    }

    let offset = (focus > value ? min : max) - focus;
    let delta = value - focus;

    return rescale(delta / offset) * offset + focus;
  }

  /**
   * Sets or gets the extent (min and max values).
   *
   * If a value is provided, it sets the min and max values and returns the main function.
   * If no value is provided, it returns the current min and max values.
   *
   * @param {Array<number, number>} [value] - An array containing the min and max values.
   * @returns {Array<number, number>|FisheyeScale} - Returns the current min and max values if no argument is provided,
   *                                         otherwise returns the main function.
   */
  main.extent = function (value) {
    return arguments.length
      ? ((min = +value[0]), (max = +value[1]), main)
      : [min, max];
  };

  /**
   * Sets or gets the distortion value.
   * If a value is provided, it sets the distortion to the given value and returns the main function.
   * If no value is provided, it returns the current distortion value.
   *
   * @param {number} [value] - The distortion value to set.
   * @returns {number|FisheyeScale} - The current distortion value if no argument is provided, or the main function if a value is provided.
   */
  main.distortion = function (value) {
    return arguments.length ? ((distortion = +value), main) : distortion;
  };

  /**
   * Sets or gets the focus value.
   *
   * @param {number} [value] - The value to set the focus to. If no value is provided, the current focus value is returned.
   * @returns {number|FisheyeScale} - Returns the current focus value if no argument is provided, otherwise returns the main function.
   */
  main.focus = function(value) {
    return arguments.length ? ((focus = value), main) : focus;
  };

  return main;
}
