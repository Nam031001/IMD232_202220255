let x, y;
const rad = 50;
let mover;

let gravity;

let isHover = false;
let isDragging = false;
let deltaX, deltaY;

function setup() {
  setCanvasContainer('canvas', 1, 1, true);
  background('white');
  mover = new Mover(width / 2, height / 2, 20);
  x = width / 2;
  y = height / 2;
  gravity = createVector(0, 0.1);

  colorMode(HSL, 360, 100, 100, 100);
}

function draw() {
  background('white');

  let gravityA = createVector(gravity.x, gravity.y);
  gravityA.mult(mover.mass);
  mover.applyForce(gravityA);

  if (mover.contactEdge()) {
    let c = 0.01;
    // let friction = createVector(moverA.vel.x, moverA.vel.y);
    let friction = mover.vel.copy();
    friction.mult(-1);
    friction.mult(c);
    mover.applyForce(friction);
  }
  mover.update();
  mover.checkEdges();
  mover.display();
  mover.applyPower();
}

function chkHover(mX, mY) {
  const distSq = (x - mX) ** 2 + (y - mY) ** 2;
  return distSq <= rad ** 2;
  //mX ** 2 + mY ** 2 < rad ** 2;
}

function mouseMoved() {
  isHover = chkHover(mouseX, mouseY);
  mover.mouseMoved(mouseX, mouseY);
}

function mousePressed() {
  if (isHover) {
    isDragging = true;
    deltaX = mouseX - x;
    deltaY = mouseY - y;
    //클릭을 하는 순간 마우스 좌표와 원의 중심지간의 거리를 계산
  }

  mover.mousePressed(mouseX, mouseY);
}

function mouseDragged() {
  if (isDragging) {
    x = mouseX - deltaX;
    y = mouseY - deltaY;
    //계산한 벡터길이를 마우스좌표에서 뻄, 원의 중심지를 이동
  }
  mover.mouseDragged(mouseX, mouseY);
}
function mouseReleased() {
  isDragging = false;
  mover.mouseReleased();
}
