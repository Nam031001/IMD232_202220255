let mover;
let gravity;
let mVec;
let pMVec;

function setup() {
  setCanvasContainer('canvas', 3, 2, true);
  background('white');
  gravity = createVector(0, 1.5);
  mover = new Mover(width / 2, height / 2, 50, 20);

  mVec = createVector();
  pMVec = createVector();
}
function draw() {
  background('white');

  mover.applyForce(gravity);
  mover.update();
  mover.checkEdges();
  mover.display();
}

function mouseMoved() {
  mover.mouseMoved(mouseX, mouseY);
}

function mousePressed() {
  mover.mousePressed(mouseX, mouseY);
}

function mouseDragged() {
  mover.mouseDragged(mouseX, mouseY);
}

function mouseReleased() {
  pMVec.set(pmouseX, pmouseY);
  mVec.set(mouseX, mouseY);
  const throwingForce = p5.Vector.sub(mVec, pMVec);
  throwingForce.mult(0.5);
  mover.applyForce(throwingForce);
  mover.mouseReleased();
}
