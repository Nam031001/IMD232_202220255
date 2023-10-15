let r1 = 180;
let r2 = 180;
let m1 = 60;
let m2 = 60;
let a1 = 0;
let a2 = 0;
let a1_v = 0;
let a2_v = 0;
let g = 0.3;

let px2 = -1;
let py2 = -1;
let cx, cy;

function setup() {
  setCanvasContainer('canvas', 3, 2, true);
  background(255);
  pixelDensity(1);
  a1 = PI / 2;
  a2 = PI / 2;
  cx = width / 2;
  cy = 50;
}

function draw() {
  a1 = constrain(a1, -130, -30);
  a2 = constrain(a2, -130, -30);

  background(255);

  let num1 = -g * (2 * m1 + m2) * sin(a1);
  let num2 = -m2 * g * sin(a1 - 2 * a2);
  let num3 = -2 * sin(a1 - a2) * m2;
  let num4 = a2_v * a2_v * r2 + a1_v * a1_v * r1 * cos(a1 - a2);
  let den = r1 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));
  let a1_a = (num1 + num2 + num3 * num4) / den;

  num1 = 2 * sin(a1 - a2);
  num2 = a1_v * a1_v * r1 * (m1 + m2);
  num3 = g * (m1 + m2) * cos(a1);
  num4 = a2_v * a2_v * r2 * m2 * cos(a1 - a2);
  den = r2 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));
  let a2_a = (num1 * (num2 + num3 + num4)) / den;

  translate(cx, cy);
  stroke(0);
  strokeWeight(1);

  let x1 = r1 * sin(a1);
  let y1 = r1 * cos(a1);

  let x2 = x1 + r2 * sin(a2);
  let y2 = y1 + r2 * cos(a2);

  line(0, 0, x1, y1);
  fill('gray');
  noStroke();
  ellipse(x1, y1, m1, m1);

  stroke(0);
  line(x1, y1, x2, y2);
  fill('gray');
  noStroke();
  ellipse(x2, y2, m2, m2);

  a1_v += a1_a;
  a2_v += a2_a;
  a1 += a1_v;
  a2 += a2_v;

  px2 = x2;
  py2 = y2;
}
