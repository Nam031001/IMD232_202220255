// let particles;
// let alpha;

// function setup() {
//   createCanvas(900, 800);
//   background(0);
//   noStroke();
//   setParticles();
// }

// function draw() {
//   frameRate(80);
//   alpha = map(mouseX, 0, width, 5, 35);
//   fill(0, alpha);
//   rect(0, 0, width, height);
//   loadPixels();
//   for (let i = 0; i < particles.length; i++) {
//     particles[i].move();
//   }
//   updatePixels();
// }

// function setParticles() {
//   particles = [];
//   for (let i = 0; i < 6000; i++) {
//     let x = random(width);
//     let y = random(height);
//     let adj = map(y, 0, height, 255, 0);
//     let c = color(255, 255, 255, 100);
//     particles.push(new Particle(x, y, c));
//   }
// }

// function mousePressed() {
//   setParticles();
// }

let particleArray;
let alpha;

function setup() {
  createCanvas(900, 800);
  background(0);
  noStroke();
  setParticles();
}

function draw() {
  frameRate(80);
  alpha = map(mouseX, 0, width, 5, 35);
  fill(0, alpha);
  rect(0, 0, width, height);
  loadPixels();
  for (let i = 0; i < particleArray.length; i++) {
    particleArray[i].move();
  }
  updatePixels();
}

function setParticles() {
  particleArray = [];
  for (let i = 0; i < 6000; i++) {
    let x = random(width);
    let y = random(height);
    let adj = map(y, 0, height, 255, 0);
    let c = color(255, 255, 255, 100);
    particleArray.push(new Particle(x, y, c));
  }
}

function mousePressed() {
  setParticles();
}
