/* timing functions */
function makeEaseOut(timing) { // wrapper
  return (timeFraction) => { 1 - timing(1 - timeFraction) }
}
function linear(timeFraction) {
  return timeFraction;
}
function back(x, timeFraction) { // x elasticity coefficient
  return Math.pow(timeFraction, 2) * ((x + 1) * timeFraction - x)
}

/* general function */
function animate({timing, draw, duration}) {
  var start = performance.now();
  requestAnimationFrame(function animate(time) {
    var timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    var progress = timing(timeFraction)
    draw(progress); // draw it

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }
  });
}

