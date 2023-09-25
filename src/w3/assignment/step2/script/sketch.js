let pos;
let vel;
let acc;
let radius = 50;
let target;
let accDisplay;
let mouse;

let anInstance;
let anotherInstance;
let instanceArray = [];

function setup() {
  setCanvasContainer('mySketchGoesHere', 3, 2, true);
  background('white');
  reset();
  anInstance = new Mover();
  anotherInstance = new Mover();

  // for (let i = 0; i < 10; i++) {
  //   instanceArray.push(new Mover());
  // }
}

function draw() {
  background('white');
  // update();
  // infiniteEdge();
  // display();
  anInstance.display();
  anInstance.update();
  anInstance.checkEdges();
  anInstance.displayVector();
}

function reset() {
  target = createVector(mouseX, mouseY);
  accDisplay = createVector(0, 0);
  mouse = createVector(0, 0);
  pos = createVector(ellipse.x, ellipse.y);
  vel = createVector(0, 0);
  acc = createVector(p5.Vector.sub(target, pos));
}

function update() {
  acc = p5.Vector.random2D();

  acc.mult(0.5);
  vel.add(acc);
  vel.limit(20);
  pos.add(vel);
}

function infiniteEdge() {
  if (pos.x < 0) {
    pos.x += width;
  } else if (pos.x >= width) {
    pos.x -= width;
  }
  if (pos.y < 0) {
    pos.y += height;
  } else if (pos.y >= height) {
    pos.y -= height;
  }
}

function display() {
  ellipse(pos.x, pos.y, 2 * radius);
}
