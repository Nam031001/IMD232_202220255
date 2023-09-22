let mover;

function setup() {
  setCanvasContainer('canvas', 3, 2, true);
  background('white');
  mover = new MoverNoMass(width / 2, height / 2, 50);
}
function draw() {
  background('white');

  mover.update();
  mover.checkEdges();
  mover.display();
  mover.displayVector();
}
