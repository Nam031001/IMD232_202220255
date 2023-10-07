// sin(angle)을 이용해 애니메이션넣기
// 1초만에 왔다갔다하는 모션
let angle = 0;
let angleVel;
let amplitude = 50;
let period = 60;
//60 = 1초

function setup() {
  setCanvasContainer('canvas', 3, 2, true);

  angleVel = periodToAngleVel(period);

  background(255);
}
function draw() {
  angle += angleVel;
  background(255);

  line(0, height / 2, width, height / 2);
  ellipse(width / 2, height / 2 + sin(angle) * amplitude, 50);

  // console.log(sin(angle));
}

function periodToAngleVel(periodAsFrame) {
  return TAU / periodAsFrame;
}
