export const PI = Math.PI;
export const TAU = 2 * PI;

const RADIANS_FACTOR = PI / 180;
const DEGREES_FACTOR = 180 / PI;

export function normalizeAngle(angle) {
  const mod = angle % 360;

  return mod < 0 ? 360 + mod : mod;
}

export function getRotationFromCoords({ x, y }, rect) {
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;

  return Math.atan2(y - cy, x - cx) * DEGREES_FACTOR;
}

export function noop() {}

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function deg(rad) {
  return rad * DEGREES_FACTOR;
}

export function rad(deg) {
  return deg * RADIANS_FACTOR;
}

export const assign = Object.assign.bind(Object);

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

export function normalizeRgb(rgb) {
  const [r, g, b] = rgb;

  return [r / 255, g / 255, b / 255];
}

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

export async function copyToClipboard(value) {
  const type = 'text/plain';
  const clipboardItemData = {
    [type]: value,
  };
  const clipboardItem = new ClipboardItem(clipboardItemData);
  await navigator.clipboard.write([clipboardItem]);
}
