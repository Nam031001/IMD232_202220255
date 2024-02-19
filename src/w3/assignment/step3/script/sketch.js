let mover;
let mVec;

function setup() {
  setCanvasContainer('mySketchGoesHere', 3, 2, true);
  background('white');
  mover = new Mover(width / 2, height / 2, 50);
  mVec = createVector();
}

function draw() {
  mVec.set(mouseX, mouseY);
  background('white');

  let divForce = p5.Vector.sub(mVec, mover.pos);
  divForce.setMag(0.5);

  mover.display();
  mover.applyForce(divForce);
  if (mouseIsPressed) {
    let divForce = p5.Vector.sub(mover.pos, mVec);
    divForce.setMag(1);
    mover.applyForce(divForce);
  }

  mover.update();
  mover.visualLine();
}
