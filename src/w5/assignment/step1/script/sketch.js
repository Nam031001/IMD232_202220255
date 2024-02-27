let rNum = 8;
let cNum = 8;
let startAngle;
let angle;
let startVel;
let step;

function setup() {
  setCanvasContainer('canvas', 1, 1, true);
  background('white');
  startAngle = (TAU / 360) * 0;
  startVel = (TAU / 360) * 1;
  step = (TAU / 360) * 15;
}

function draw() {
  background('white');

  for (let r = 0; r < rNum; r++) {
    for (let c = 0; c < cNum; c++) {
      const tileW = width / (3 * cNum + 1);
      const tileH = height / (3 * rNum + 1);
      const x = tileW * (3 * c + 2);
      const y = tileH * (3 * r + 2);
      push();
      translate(x, y);
      if (r % 2 != 0) {
        if (c % 2 != 0) {
          fill('white');
        } else if (c % 2 == 0) {
          fill('yellow');
        }
      }
      if (r % 2 == 0) {
        if (c % 2 != 0) {
          fill('red');
        } else if (c % 2 == 0) {
          fill('blue');
        }
      }
      ellipse(0, 0, tileW * 2, tileH * 2);
      angle = startAngle + step * (cNum * r + c);
      rotate(angle);
      fill('black');
      ellipse(tileW, 0, width / 40);
      line(0, 0, tileW, 0);
      pop();
    }
  }
  startAngle += startVel;
}
