// sin(angle)을 이용해 애니메이션넣기
//리사주 도형
let angle;
let angleVel;
let amplitude = [100, 100];
// 이동거리가 얼마나 큰가

//60 = 1초

function setup() {
  setCanvasContainer('canvas', 3, 2, true);

  angle = createVector(0, TAU / 4);
  //시작각도
  angleVel = createVector(periodToAngleVel(180), periodToAngleVel(120));

  background(255);
}
function draw() {
  angle.add(angleVel);

  // background(255);

  line(0, height / 2, width, height / 2);
  line(width / 2, 0, width / 2, height);
  ellipse(
    width / 2 + sin(angle.x) * amplitude[0],
    height / 2 + sin(angle.y) * amplitude[1],
    //컴퓨터는 우리가 생각하는 x, y의 방향이 반대기 때문에
    //제대로 방향을 표현하려면 height에서 +sin...이 아니라 -sin...을 해줘야 한다
    5
  );

  // console.log(sin(angle));
}

function periodToAngleVel(periodAsFrame) {
  return TAU / periodAsFrame;
}
