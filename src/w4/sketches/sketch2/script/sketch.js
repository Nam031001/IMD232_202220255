let pos;
let vel;
let radious = 25;

function setup() {
  setCanvasContainer('mySketchGoesHere', 3, 2, true);
  background(255);
  pos = createVector(width / 2, height / 2);
  vel = createVector(3, 5);
  console.log(pos);
  console.log(vel);
  ellipse(pos.x, pos.y, 50);
}
function draw() {
  // 백그라운드가 없으면 원이 잔상처럼 계속 남는다
  background(255);
  pos.add(vel);
  // if (pos.x < 0) {
  //   vel.x *= -1;
  // } else if (pos.x > width) {
  //   vel.x *= -1;
  // } 또는
  if (pos.x - radious < 0 || pos.x + radious > width) {
    vel.x *= -1;
  }
  if (pos.y - radious < 0 || pos.y + radious > height) {
    vel.y *= -1;
  }
  // if활용 시 x좌표와 y좌표는 else가 아니라 if로 따로 설정해야 한다
  ellipse(pos.x, pos.y, 2 * radious);
}
