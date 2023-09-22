let pos;
let vel;
let acc;
let radius = 25;

let anInstance;

function setup() {
  setCanvasContainer('canvas', 3, 2, true);
  background('white');
  reset();
  cv = createVector(width / 2, height / 2);
  mv = createVector();
  anInstance = new Mover();
}

function draw() {
  background('white');
  // update();
  // infiniteEdge();
  // display();
  anInstance.display();
  anInstance.update();
  // anInstance.infiniteEdge();
}

function reset() {
  pos = createVector(width / 2, height / 2);
  vel = createVector(mouseX, mouseY);
  // acc = createVector();
}

function update() {
  acc = p5.Vector.random2D();

  acc.mult(0.5);
  vel.add(acc);
  vel.limit(10);
  pos.add(vel);
}

// function infiniteEdge() {
//   if (pos.x < 0) {
//     pos.x += width;
//   } else if (pos.x >= width) {
//     pos.x -= width;
//   }
//   if (pos.y < 0) {
//     pos.y += height;
//   } else if (pos.y >= height) {
//     pos.y -= height;
//   }
// }

function display() {
  ellipse(pos.x, pos.y, 2 * radius);
}

class Mover {
  constructor() {
    this.pos = createVector(width / 2, height / 2);
    this.vel = createVector(0, 0);
    this.acc = createVector();
  }

  update() {
    this.acc = p5.Vector.random2D();

    this.acc.mult(0.5);

    this.vel.add(this.acc);
    this.vel.limit(10);
    this.pos.add(this.vel);
  }

  infiniteEdge() {
    if (this.pos.x < 0) {
      this.pos.x += width;
    } else if (this.pos.x >= width) {
      this.pos.x -= width;
    }
    if (this.pos.y < 0) {
      this.pos.y += height;
    } else if (this.pos.y >= height) {
      this.pos.y -= height;
    }
  }

  display() {
    ellipse(this.pos.x, this.pos.y, 2 * radius);
  }
}
