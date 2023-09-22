let mover;
let gravity;
let wind;

function setup() {
  setCanvasContainer('canvas', 3, 2, true);
  background('white');
  mover = new MoverNoMass(width / 2, height / 2, 50);
  gravity = createVector(0, 0.1);
  wind = createVector(0.2, 0);
}

function draw() {
  background('white');

  mover.addAcc(gravity);
  if (mouseIsPressed && isMouseInsideCanvas()) {
    mover.addAcc(wind);
  }
  mover.addAcc(wind);
  mover.update();
  mover.checkEdges();
  mover.display();
  mover.displayVector();
}
