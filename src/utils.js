export const PI = Math.PI;
export const TAU = 2 * PI;

const RADIANS_FACTOR = PI / 180;
const DEGREES_FACTOR = 180 / PI;

/**
 * Normalizes an angle to be within the range of 0 to 359 degrees.
 *
 * @param {number} angle - The angle to normalize.
 * @returns {number} The normalized angle.
 */
export function normalizeAngle(angle) {
  const mod = angle % 360;

  return mod < 0 ? 360 + mod : mod;
}

/**
 * Calculates the rotation angle in degrees from the given coordinates relative to the center of a rectangle.
 *
 * @param {Object} coords - The coordinates object.
 * @param {number} coords.x - The x-coordinate.
 * @param {number} coords.y - The y-coordinate.
 * @param {DOMRect} rect - The bounding rectangle of the element.
 * @returns {number} The rotation angle in degrees.
 */
export function getRotationFromCoords({ x, y }, rect) {
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;

  return Math.atan2(y - cy, x - cx) * DEGREES_FACTOR;
}

/**
 * A no-operation function that does nothing.
 * Can be used as a default placeholder for callbacks or other functions.
 */
export function noop() {}

/**
 * Clamps a number between a minimum and maximum value.
 *
 * @param {number} value - The number to clamp.
 * @param {number} min - The minimum value.
 * @param {number} max - The maximum value.
 * @returns {number} - The clamped value.
 */
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

/**
 * Converts radians to degrees.
 *
 * @param {number} rad - The angle in radians.
 * @returns {number} The angle in degrees.
 */
export function deg(rad) {
  return rad * DEGREES_FACTOR;
}

/**
 * Converts degrees to radians.
 *
 * @param {number} deg - The angle in degrees.
 * @returns {number} The angle in radians.
 */
export function rad(deg) {
  return deg * RADIANS_FACTOR;
}

/**
 * A bound version of `Object.assign` that copies the values of all enumerable own properties
 * from one or more source objects to a target object. It returns the target object.
 *
 * @function
 * @param {Object} target - The target object to which properties will be assigned.
 * @param {...Object} sources - The source object(s) from which properties will be copied.
 * @returns {Object} The target object with properties assigned from the source object(s).
 *
 * @type {(target: Record<string, unknown>, ...sources: Record<string, unknown>) => Record<string, unknown>}
 */
export const assign = Object.assign.bind(Object);

/**
 * Converts an RGB color array to a CSS color string.
 *
 * @param {number[]} rgb - An array containing the red, green, and blue color values, each ranging from 0 to 1.
 * @param {string} [format='rgb'] - The format of the output string. Can be 'rgb' or 'hex'.
 * @returns {string} The CSS color string in the specified format.
 */
export function rgbToCss(rgb, format = 'rgb') {
  const red = Math.round(rgb[0] * 255);
  const green = Math.round(rgb[1] * 255);
  const blue = Math.round(rgb[2] * 255);

  if (format === 'hex') {
    return (
      '#' +
      (blue | (green << 8) | (red << 16) | (1 << 24)).toString(16).slice(1)
    );
  }

  return `rgb(${red},${green},${blue})`;
}

/**
 * Normalizes an RGB color value from the range [0, 255] to the range [0, 1].
 *
 * @param {number[]} rgb - An array containing the red, green, and blue color values.
 * @returns {number[]} An array containing the normalized red, green, and blue color values.
 */
export function normalizeRgb(rgb) {
  const [r, g, b] = rgb;

  return [r / 255, g / 255, b / 255];
}

/**
 * Converts a given text into a URL-friendly slug.
 *
 * @param {string} text - The text to be slugified.
 * @param {Object} [options] - Optional settings.
 * @param {string} [options.separator='-'] - The separator to use between words.
 * @param {boolean} [options.trim=true] - Whether to trim leading and trailing separators.
 * @returns {string} - The slugified text.
 */
export function slugify(text, { separator = '-', trim = true } = {}) {
  let _text = text
    .normalize('NFKD') // The normalize() using NFKD method returns the Unicode Normalization Form of a given string.
    .replace('ß', 'ss') // Replace ß with ss
    .replace(/[\u0300-\u036f]/g, '') // Remove accent characters
    .toLowerCase() // Convert the string to lowercase letters
    .trim() // Remove whitespace from both sides of a string (optional)
    .replace(/\s+/g, separator) // Replace spaces with separator
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/[_-]/g, separator) // Replace _- with separator
    .replace(new RegExp(`${separator}${separator}`, 'g'), separator); // Replace multiple separators with single separator

  if (trim) {
    _text = _text.replace(new RegExp(`^${separator}|${separator}$`, 'g'), ''); // Trim seperators
  }

  return _text;
}

/**
 * Copies the given text value to the clipboard.
 *
 * @param {string} value - The text value to be copied to the clipboard.
 * @returns {Promise<void>} A promise that resolves when the text has been successfully copied.
 * @throws {Error} If the clipboard API is not supported or the copy operation fails.
 */
export async function copyToClipboard(value) {
  const type = 'text/plain';
  const clipboardItemData = {
    [type]: value,
  };
  const clipboardItem = new ClipboardItem(clipboardItemData);
  await navigator.clipboard.write([clipboardItem]);
}

/**
 * Compares two arrays for equality by converting them to JSON strings and comparing the strings.
 *
 * @param {Array} array1 - The first array to compare.
 * @param {Array} array2 - The second array to compare.
 * @returns {boolean} - Returns true if the arrays are equal, otherwise false.
 */
export function arrayEquals(array1, array2) {
  return JSON.stringify(array1) === JSON.stringify(array2);
}

/**
 * Picks specific properties from an object.
 *
 * @param {Object} obj - The source object.
 * @param {Array<string>} keys - An array of keys to pick from the source object.
 * @returns {Object} A new object with the picked properties.
 */
export function pick(obj, keys) {
  const result = {};

  for (const key of keys) {
    result[key] = obj[key];
  }

  return result;
}
