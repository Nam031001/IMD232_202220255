// particle의 기본원리 = 일정주기가 넘으면 다시 생성되게함

let particle;
let gravity;
function setup() {
  setCanvasContainer('canvas', 3, 2, true);
  particle = new Particle(width / 2, 20);
  gravity = createVector(0, 0.1);
  background(255);
}
function draw() {
  // console.log(particle.isDead());
  if (particle.isDead()) {
    // 수명이 다하면 새로 생성해줌
    particle = new Particle(width / 2, 20);
  }
  particle.applyForce(gravity);
  particle.update();
  background(255);
  particle.display();
}
