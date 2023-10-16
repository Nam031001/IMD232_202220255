let x, y;
const rad = 50;
let mover;

let gravity;

let isHover = false;
let isDragging = false;
let deltaX, deltaY;
let throwingForce;

function setup() {
  setCanvasContainer('canvas', 1, 1, true);
  mover = new Mover(width / 2, height / 2, 20);
  x = width / 2;
  y = height / 2;
  gravity = createVector(0, 0.1);
  throwingForce = createVector();

  colorMode(HSL, 360, 100, 100, 100);
  background('white');
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
  }

  mover.mousePressed(mouseX, mouseY);
}

function mouseDragged() {
  if (isDragging) {
    x = mouseX - deltaX;
    y = mouseY - deltaY;
  }
  mover.mouseDragged(mouseX, mouseY);
}
function mouseReleased() {
  mover.mouseReleased();
  pMVec.set(pmouseX, pmouseY);
  mVec.set(mouseX, mouseY);
  const throwingForce = p5.Vector.sub(mVec, pMVec);
  throwingForce.mult(1);
  mover.applyForce(throwingForce);
}
