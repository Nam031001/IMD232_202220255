let angle = 0;
let angleVel;
let angleAcc;

function setup() {
  setCanvasContainer('canvas', 2, 1, true);
  angleVel = 0;
  angleAcc = (TAU / 360) * 0.01;
  background('white');
}

function draw() {
  angleVel += angleAcc;
  angleVel = constrain(angleVel, -5, 5);
  //   해당값의 최대값과 최대치를 적용
  background('255');

  translate(width / 2, height / 2);
  rotate(angle);
  //   line(0, 0, 50, 0);
  //   line(0, 0, -50, 0);
  line(-100, 0, 100, 0);
  ellipse(0, 0, 50);
  angle += angleVel;
}
