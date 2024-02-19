let gravity;
let pend;
let pend2;

function setup() {
  setCanvasContainer('canvas', 3, 2, true);
  gravity = createVector(0, 1);
  pend = new Pendulum(width / 2, 10, height / 3, 30, (TAU / 360) * 45);
  pend2 = new Pendulum(width / 4, 10, height / 3, 30, (TAU / 360) * 45);

  background('white');
}
// x, y, rad, ballRad, angle

function draw() {
  pend.applyForce(gravity);
  pend.update();
  pend2.merge(pend);
  pend2.applyForce(gravity);
  pend2.update();
  background(255);
  pend.display();
  pend2.display();

  // pend2.pos.set(pend.ballPos.x, pend.ballPos.y);
}
function mouseMoved() {
  pend.mouseMoved(mouseX, mouseY);
  pend2.mouseMoved(mouseX, mouseY);
}
function mousePressed() {
  pend.mousePressed(mouseX, mouseY);
  pend2.mousePressed(mouseX, mouseY);
}
function mouseDragged() {
  pend.mouseDragged(mouseX, mouseY);
  pend2.mouseDragged(mouseX, mouseY);
}
function mouseReleased() {
  pend.mouseReleased();
  pend2.mouseReleased();
}
