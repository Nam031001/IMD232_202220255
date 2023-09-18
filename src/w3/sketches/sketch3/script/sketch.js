let pos;
let vel;
let acc;
let radious = 50;

function setup() {
  setCanvasContainer('mySketchGoesHere', 3, 2, true);
  background(255);
  pos = createVector(width / 2, height / 2);
  vel = createVector(0, 0);
  //   acc = createVector(0, 1);
  acc = createVector();
  console.log(pos);
  console.log(vel);
  ellipse(pos.x, pos.y, 50);
}
function draw() {
  // 백그라운드가 없으면 원이 잔상처럼 계속 남는다
  background(255);
  acc = p5.Vector.random2D();
  acc.mult(2);
  vel.add(acc);
  vel.limit(5);
  pos.add(vel);
  //   위치에 속도가 더해지고 회차가 거듭될 수록 가속도가 추가로 더 더해지며 점점 빨라지는 개념
  if (pos.x < 0) {
    pos.x = width;
  } else if (pos.x > width) {
    pos.x = 0;
  }

  if (pos.y < 0) {
    pos.y = height;
  } else if (pos.y > height) {
    pos.y = 0;
  }
  ellipse(pos.x, pos.y, 2 * radious);
}

function infiniteEdge() {
  if (pos.x < 0) {
    pos.x = width;
  } else if (pos.x > width) {
    pos.x = 0;
  }

  if (pos.y < 0) {
    pos.y = height;
  } else if (pos.y > height) {
    pos.y = 0;
  }
}
