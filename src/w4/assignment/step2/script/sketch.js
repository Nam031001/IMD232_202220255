let moverA;
let gravity;

function setup() {
  setCanvasContainer('canvas', 3, 2, true);
  background('white');

  moverA = new Mover(width / 2, height / 2, 30);

  gravity = createVector(0, 0.1);
}

function draw() {
  background('white');

  let gravityA = createVector(gravity.x, gravity.y);
  gravityA.mult(moverA.mass);
  moverA.applyForce(gravityA);

  if (moverA.isDragging === false) {
    const gravityAsForce = p5.Vector.mult(gravity, moverA.mass);
    moverA.applyForce(gravityAsForce);
    moverA.update();
  }

  moverA.update();
  moverA.checkEdges();
  moverA.display();
}

function mouseMoved() {
  moverA.mouseMoved(mouseX, mouseY);
}
function mousePressed() {
  moverA.mousePressed(mouseX, mouseY);
}
function mouseDragged() {
  moverA.mouseDragged(mouseX, mouseY);
}
function mouseReleased() {
  moverA.mouseReleased();
}
