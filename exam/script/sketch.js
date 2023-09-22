let pos;
let vel;
let acc;
let radius = 25;
let mouse;
let dir;

let anInstance;
let anotherInstance;
let instanceArray = [];

function setup() {
  setCanvasContainer('mySketchGoesHere', 3, 2, true);
  background('white');
  reset();
  anInstance = new Mover();
}

function draw() {
  background('white');
  // update();
  // infiniteEdge();
  // display();
  anInstance.display();
  anInstance.update();
  anInstance.infiniteEdge();
}

// var Mover = function () {
//   this.position = new PVector(width / 2, height / 2);
//   this.velocity = new PVector(0, 0);
//   this.acceleration = new PVector(0, 0);
// };
function reset() {
  pos = createVector(width / 2, height / 2);
  vel = createVector(0, 0);
  acc = createVector(0, 0);
  mouse = createVector();
  dir = createVector();
}

// Mover.prototype.update = function () {
//   var mouse = new PVector(mouseX, mouseY);
//   var dir = PVector.sub(mouse, this.position);
//   dir.normalize();
//   dir.mult(0.5);
//   this.acceleration = dir;
//   this.velocity.add(this.acceleration);
//   this.velocity.limit(5);
//   this.position.add(this.velocity);
// };
function update() {
  dir = mouse.sub(pos);
  dir.normalize();
  dir.mult(0.5);
  acc = dir;
  acc.mult(0.1);
  vel.add(acc);
  vel.limit(5);
  pos.add(vel);
}

// Mover.prototype.display = function () {
//   stroke(0);
//   strokeWeight(2);
//   fill(127);
//   ellipse(this.position.x, this.position.y, 48, 48);
// };

// Mover.prototype.checkEdges = function () {
//   if (this.position.x > width) {
//     this.position.x = 0;
//   } else if (this.position.x < 0) {
//     this.position.x = width;
//   }

//   if (this.position.y > height) {
//     this.position.y = 0;
//   } else if (this.position.y < 0) {
//     this.position.y = height;
//   }
// };

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

// var mover = new Mover();

function display() {
  ellipse(pos.x, pos.y, 2 * radius);
}
