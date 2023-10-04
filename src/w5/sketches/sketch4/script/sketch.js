// let x;
// let y;
let pos;
// let xAdd = 5;
// let yAdd = 3;
let vel;
let radius = 25;

function setup() {
  setCanvasContainer('mySketchGoesHere', 3, 2, true);
  background('white');
  //초기값 힐딩
  //   x = width / 2;
  //   y = height / 2;
  pos = createVector(width / 2, height / 2);
  vel = createVector(5, 3);
}
function draw() {
  background('white');

  //위치 업데이트
  //   x += xAdd;
  //   y += yAdd;

  //   pos.x+=vel.x; pos.y += vel.y
  pos.add(vel);

  //화면 밖으로 나가면 다시 화면 안으로 들이기
  //   if (x < 0) {
  //     x += width;
  //   } else if (x >= width) {
  //     x -= width;
  //   }
  //   if (y < 0) {
  //     y += width;
  //   } else if (y >= height) {
  //     y -= height;
  //   }
  if (pos.x < 0) {
    pos.x += width;
  } else if (pos.x >= width) {
    pos.x -= width;
  }
  if (pos.y < 0) {
    pos.y += width;
  } else if (pos.y >= height) {
    pos.y -= height;
  }
  //   //x, y, diameter = 2 * radius
  //   ellipse(x, y, radius * 2);
  ellipse(pos.x, pos.y, radius * 2);
}
