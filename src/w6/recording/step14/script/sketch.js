let gravity;

let bob;

let spring;

function setup() {
  setCanvasContainer('canvas', 2, 1, true);

  gravity = createVector(0, 0.5);
  bob = new Bob(width / 2, height / 2, 50, 50);
  spring = new Spring(width / 2, 10, height / 2, 5);
  background(255);
}
function draw() {
  if (bob.isDragging === false) {
    spring.spring(bob);
    const gravityAsForce = p5.Vector.mult(gravity, bob.mass);
    bob.applyForce(gravityAsForce);
    // gravity설정 => 중앙으로 오려고 하는 공
    bob.update();
  }

  background(255);

  bob.display();
  spring.display(bob);
}

function mouseMoved() {
  bob.mouseMoved(mouseX, mouseY);
}
function mousePressed() {
  bob.mousePressed(mouseX, mouseY);
}
function mouseDragged() {
  bob.mouseDragged(mouseX, mouseY);
}
function mouseReleased() {
  bob.mouseReleased();
}
