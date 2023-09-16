// let pos;
// let vel;

// function setup() {
//   setCanvasContainer('canvas', 3, 2, true);
//   background('salmon');
//   pos = createVector(random(width), random(height));
//   vel = createVector(random(-5, 5), random(-5, 5));
//   일정속도 방법1
//   vel = createVector(1, 0);
//   vel.rotate(random(TAU));
//   vel.mult(5);

//   일정속도 방법2
//   vel = p5.Vector.random2D();
//   vel.mult(3);

//   console.log('pos', pos);
//   console.log('vel', vel);
//   console.log('mag', vel.mag());
// }
// function draw() {
//   background('salmon');
//   update();
//   checkEdges();
//   display();
// }

// function update() {
//   pos.add(vel);
// }

// function checkEdges() {
//   if (pos.x < 0) {
//     pos.x = width;
//   } else if (pos.x > width) {
//     pos.x = 0;
//   }
//   if (pos.y < 0) {
//     pos.y = height;
//   } else if (pos.y > height) {
//     pos.y = 0;
//   }
// }

// function display() {
//   noStroke();
//   fill('cornsilk');
//   ellipse(pos.x, pos.y, 50);
// }
let pos;
let vel;
let acc;

function setup() {
  setCanvasContainer('canvas', 3, 2, true);
  background('salmon');
  pos = createVector(random(width), random(height));
  vel = createVector(0, 0);
  acc = p5.Vector.random2D();
  acc.mult(0.1);
  console.log('pos', pos);
  console.log('vel', vel);
  console.log('acc', acc);
  console.log('accMag', acc.mag());
  console.log('velMag', vel.mag());
}
function draw() {
  background('salmon');
  update();
  checkEdges();
  display();
  console.log('accMag', acc.mag());
  console.log('velMag', vel.mag());
}

function update() {
  vel.add(acc);
  vel.limit(30);
  pos.add(vel);
}

function checkEdges() {
  if (pos.x < 0) {
    pos.x = width;
  } else if (pos.x > width) {
    pos.x = 0;
  }
  if (pos.y < 0) {
    pos.y = height;
  } else if (pos.y > height) {
    pos.y = 0;
  }
}

function display() {
  noStroke();
  fill('cornsilk');
  ellipse(pos.x, pos.y, 50);
}
