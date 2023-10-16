let mover;
let gravity;

function setup() {
  setCanvasContainer('canvas', 1, 1, true);

  mover = new Mover(width / 2, height / 2, 40);
  gravity = createVector(0, 0.1);

  background(255);
}

function draw() {
  const force = p5.Vector.mult(gravity, mover.mass);

  background(255);

  let gravityA = createVector(gravity.x, gravity.y);
  gravityA.mult(mover.mass);
  mover.applyForce(gravityA);

  if (mover.contactEdge()) {
    let c = 0.01;
    let friction = mover.vel.copy();
    friction.mult(-1);
    friction.mult(c);
    mover.applyForce(friction);
  }
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
  isDragging = false;
  mover.mouseReleased();
}
