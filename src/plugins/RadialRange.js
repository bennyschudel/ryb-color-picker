import * as d3 from '../d3.js';

import { assign, rad, PI, TAU } from '../utils.js';

import { FisheyeScale } from './FisheyeScale.js';

// ---

/**
 * Creates a radial range input using D3.js.
 *
 * @param {Object} options - Configuration options for the radial range.
 * @param {number} [options.angle=360] - The total angle of the radial range.
 * @param {number} [options.animationDuration=200] - Duration of the animation in milliseconds.
 * @param {Function} [options.colorizeFn=(d, i) => ({ fill: 'transparent' })] - Function to determine the color of each segment.
 * @param {HTMLElement} [options.context=null] - The DOM element to which the radial range will be appended.
 * @param {number} [options.distortion=3] - The distortion factor for the fisheye effect.
 * @param {number} [options.gap=0] - The gap between segments.
 * @param {number} [options.introDuration=600] - Duration of the intro animation in milliseconds.
 * @param {string} [options.name='radial-range'] - The name of the radial range.
 * @param {Function} [options.onClick=(i) => undefined] - Callback function to handle click events on segments.
 * @param {number} [options.radius=100] - The radius of the radial range.
 * @param {number} [options.segments=24] - The number of segments in the radial range.
 * @param {number} [options.startAngle=0] - The starting angle of the radial range.
 * @param {number} [options.thickness=20] - The thickness of the radial range.
 */
export default function RadialRange({
  angle = 360,
  animationDuration = 200,
  colorizeFn = (_d, _i) => ({ fill: 'transparent' }),
  context = null,
  distortion: _distortion = 3,
  gap: _gap = 0,
  introDuration = 600,
  name = 'radial-range',
  onClick = (_i) => undefined,
  radius: _radius = 100,
  segments: _segments = 24,
  startAngle = 0,
  thickness: _thickness = 20,
} = {}) {
  let _focusAngle = null;

  const pie = d3
    .pie()
    .value((d) => d.value)
    .sortValues(null);

  const arc = d3.arc();

  function calcRelativeAngle(angle) {
    return (angle - (startAngle - 360)) % 360;
  }

  const scale = FisheyeScale();
  scale.distortion(_distortion);

  function getPieData() {
    const angleStep = angle / _segments;

    const data = [];

    for (let i = 0; i < _segments; i++) {
      const index = i;
      const value = scale((i + 1) * angleStep) - scale(i * angleStep);

      data.push({
        index,
        value,
      });
    }

    return data;
  }

  function getPieSegments() {
    return pie(getPieData());
  }

  const $context = d3.select(context);

  let $g = $context.select(`g.${name}`);
  if ($g.empty()) {
    $g = $context.append('g').classed(name, true);
  }

  const $track = $g
    .append('path')
    .classed('track', true)
    .attr('fill', 'transparent');

  const $segments = $g.append('g').classed('segments', true);

  /**
   * Renders the radial range chart with animation.
   *
   * @param {number} [duration=animationDuration] - The duration of the animation in milliseconds.
   * @returns {this} The instance of the radial range chart.
   */
  function render(duration = animationDuration) {
    const data = getPieSegments();

    const $newSegments = $segments.selectAll('.segment').data(data, (d) => {
      return d.index;
    });

    const segments = $newSegments.nodes();

    function datum(el) {
      return el.__data__;
    }

    function findPreviousSegment(index) {
      const s = segments
        .filter((d) => datum(d).index < index)
        .sort((a, b) => datum(b).index - datum(a).index);

      return s[0];
    }

    function findNextSegment(index) {
      const s = segments
        .filter((d) => datum(d).index > index)
        .sort((a, b) => datum(a).index - datum(b).index);

      return s[0];
    }

    function applyArcTween(ip, d) {
      return function (t) {
        const _d = (this._current = assign({}, d, ip(t)));

        d3.select(this)
          .select('.shape')
          .attr('d', arc(_d))
          .attr('transform-origin', arc.centroid(_d).join(' '));
      };
    }

    function enterArcTween(d) {
      const previousSegment = findPreviousSegment(d.index);
      const nextSegment = findNextSegment(d.index);

      let _startAngle = rad(startAngle);
      let _endAngle = _startAngle;

      if (previousSegment) {
        _startAngle =
          previousSegment._current.endAngle +
          previousSegment._current.padAngle / 2;
        _endAngle = _startAngle;
      }
      if (nextSegment) {
        _endAngle =
          nextSegment._current.startAngle - nextSegment._current.padAngle / 2;
      }

      const ip = d3.interpolate(
        {
          startAngle: _startAngle,
          endAngle: _endAngle,
        },
        {
          startAngle: d.startAngle,
          endAngle: d.endAngle,
        },
      );

      return applyArcTween(ip, d);
    }

    function updateArcTween(d) {
      const ip = d3.interpolate(this._current, d);

      return applyArcTween(ip, d);
    }

    function exitArcTween(d) {
      const $p = findNextSegment(d.index);

      let _startAngle = rad(startAngle + angle);

      if ($p) {
        _startAngle = $p._current.startAngle - $p._current.padAngle;
      }

      let ip = d3.interpolate(
        {
          startAngle: d.startAngle,
          endAngle: d.endAngle,
        },
        {
          startAngle: _startAngle,
          endAngle: _startAngle,
        },
      );

      return applyArcTween(ip, d);
    }

    $newSegments.join(
      function enter($p) {
        const $s = $p
          .append('g')
          .classed('segment', true)
          .attr('data-index', (_, i) => i);

        $s.append('path')
          .classed('shape', true)
          .attr('stroke-width', _gap ? 0 : 1)
          .attr('stroke', (d, i) => colorizeFn(d, i).stroke)
          .attr('fill', (d, i) => colorizeFn(d, i).fill)
          // ---
          .on('click', (event, d) => {
            onClick(d.index);
          });
        // .on('pointerenter', (event) => {
        //   d3.select(event.target)
        //     .attr('transform', 'scale(2)');
        // })
        // .on('pointerleave', (event) => {
        //   d3.select(event.target)
        //     .attr('transform', '');
        // });

        $s.interrupt()
          .transition()
          .duration(duration)
          .ease(d3.easeCubicOut)
          .tween('enter.arc', enterArcTween);

        // $s
        //   .on('pointerenter', (event) => {
        //     d3.select(event.target).raise();
        //   });

        return $s;
      },
      function update($s) {
        $s.interrupt()
          .transition()
          .duration(duration)
          .ease(d3.easeCubicOut)
          .tween('update.arc', updateArcTween);

        $s.select('.shape')
          .attr('stroke-width', _gap ? 0 : 1)
          .attr('stroke', (d, i) => colorizeFn(d, i).stroke)
          .attr('fill', (d, i) => colorizeFn(d, i).fill);

        return $s;
      },
      function exit($s) {
        $s.classed('exit', true)
          .interrupt()
          .transition()
          .duration(duration)
          .ease(d3.easeCubicOut)
          .tween('exit.arc', exitArcTween)
          .on('end', function () {
            d3.select(this).remove();
          });

        return $s;
      },
    );

    $track.attr(
      'd',
      arc({
        startAngle: rad(startAngle),
        endAngle: rad(startAngle + angle),
        innerRadius: _radius - _thickness,
        outerRadius: _radius,
      }),
    );

    return this;
  }

  /**
   * Updates the radial range with the given duration.
   *
   * @param {number} [duration=animationDuration] - The duration of the animation.
   * @returns {this} The instance of the radial range chart.
   */
  function update(duration = animationDuration) {
    const circumference = 2 * _radius * PI;
    const padAngle = (TAU / circumference) * _gap;

    scale.distortion(_distortion);

    pie
      .padAngle(padAngle)
      .startAngle(rad(startAngle))
      .endAngle(rad(startAngle + angle));

    arc
      .padAngle(padAngle)
      .innerRadius(_radius - _thickness)
      .outerRadius(_radius);

    scale.extent([0, angle]).focus(_focusAngle);

    return render(duration);
  }

  /**
   * Sets or gets the focus angle for the radial range.
   *
   * @param {number|null} [focusAngle] - The angle to focus on. If null, the focus angle is reset. If not provided, the current focus angle is returned.
   * @param {number} [duration=animationDuration] - The duration of the focus animation.
   * @returns {number|null|this} - Returns the current focus angle if no arguments are provided. Otherwise, returns the instance of the radial range chart.
   */
  function focus(focusAngle, duration = animationDuration) {
    if (!arguments.length) return _focusAngle;

    _focusAngle = null;

    if (focusAngle != null) {
      _focusAngle = calcRelativeAngle(focusAngle);

      if (_focusAngle > angle) {
        _focusAngle = null;
      }
    }

    scale.focus(_focusAngle);

    return update(duration);
  }

  /**
   * Blurs the current element by removing focus.
   *
   * @param {number} [duration=animationDuration] - The duration of the blur animation in milliseconds.
   * @returns {this} The instance of the radial range chart.
   */
  function blur(duration = animationDuration) {
    return this.focus(null, duration);
  }

  /**
   * Sets or gets the distortion value.
   *
   * @param {number} [value] - The distortion value to set.
   * @returns {number|this} - Returns the current distortion value if no argument is provided,
   *                          otherwise returns the instance of the radial range chart.
   */
  function distortion(value) {
    if (!arguments.length) return _distortion;

    _distortion = value;

    return update(animationDuration);
  }

  /**
   * Sets or gets the gap value.
   *
   * @param {number} [value] - The new gap value. If no value is provided, the current gap value is returned.
   * @returns {number|this} - Returns the current gap value if no argument is provided,
   *                          otherwise returns the instance of the radial range chart.
   */
  function gap(value) {
    if (!arguments.length) return _gap;

    _gap = value;

    return update(0);
  }

  /**
   * Sets or gets the radius value.
   *
   * @param {number} [value] - The new radius value. If no value is provided, the current radius value is returned.
   * @returns {number|this} - Returns the radius distortion value if no argument is provided,
   *                          otherwise returns the instance of the radial range chart.
   */
  function radius(value) {
    if (!arguments.length) return _radius;

    _radius = value;

    return update(0);
  }

  /**
   * Sets or gets the segments value.
   *
   * @param {number} [value] - The new segments value. If no value is provided, the current segments value is returned.
   * @returns {number|this} - Returns the segments distortion value if no argument is provided,
   *                          otherwise returns the instance of the radial range chart.
   */
  function segments(value) {
    if (!arguments.length) return _segments;

    _segments = value;

    return update(animationDuration);
  }

  /**
   * Sets or gets the thickness value.
   *
   * @param {number} [value] - The new thickness value. If no value is provided, the current thickness value is returned.
   * @returns {number|this} - Returns the thickness distortion value if no argument is provided,
   *                          otherwise returns the instance of the radial range chart.
   */
  function thickness(value) {
    if (!arguments.length) return _thickness;

    _thickness = value;

    return update(0);
  }

  update(introDuration);

  /**
   * The node of main svg group element
   *
   * @type {(type: SVGGElement)}
   */
  const node = $g.node();

  return {
    blur,
    distortion,
    focus,
    gap,
    node,
    radius,
    render,
    segments,
    thickness,
    update,
  };
}
