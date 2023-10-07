const dotNum = 30;
const freq = 1 / 2;
// 화면상에 나오는 그래프의 주기
let angleStart = 0;
let angleStartVel;
// 원들이 움직이지 않고 화면에 멈춰있음 = angle의 시작점이 0으로 고정되어있기 때문
// 시작점이 angleStartVel의 프레임의 주기에 맞게 바뀌게 하기 위한 변수
let amp;
// 출링이는 정도(진폭)을 조정

function setup() {
  setCanvasContainer('canvas', 3, 2, true);

  angleStartVel = periodToVel(120);
  // angleStartVel = 0;
  amp = height / 4;

  background(255);
}
function draw() {
  background(255);

  for (let a = 0; a < dotNum; a++) {
    const ellipseX = (width / (dotNum - 1)) * a;
    const dia = width / (dotNum - 1);
    const angle = angleStart + (TAU / (dotNum - 1)) * a * freq;
    ellipse(ellipseX, height / 2 + sin(angle) * amp, dia);
  }
  angleStart += angleStartVel;
}

function periodToVel(periodAsFrame) {
  return TAU / periodAsFrame;
}
