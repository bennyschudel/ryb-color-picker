export function FisheyeScale() {
  let min = 0;
  let max = 1;
  let distortion = 0;
  let focus = null;

  function rescale(value) {
    return ((distortion + 1) * value) / (distortion * value + 1);
  }

  // --- main

  function main(value) {
    if (focus == null) {
      return (value - min) / (max - min);
    }

    let offset = (focus > value ? min : max) - focus;
    let delta = value - focus;

    return rescale(delta / offset) * offset + focus;
  }

  main.extent = function (value) {
    return arguments.length
      ? ((min = +value[0]), (max = +value[1]), main)
      : [min, max];
  };

  main.distortion = function (value) {
    return arguments.length ? ((distortion = +value), main) : distortion;
  };

  main.focus = function (value) {
    return arguments.length ? ((focus = value), main) : focus;
  };

  return main;
}
