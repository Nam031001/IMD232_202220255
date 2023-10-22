let emitter;
let particle;
let g;

function setup() {
  setCanvasContainer('canvas', 2, 1, true);

  colorMode(HSL, 360, 100, 100, 100);
  emitter = new Emitter(width / 2, height / 2);
  particle = new Ball(width / 2, height / 2);
  background(360, 0, 100);

  g = createVector(0, 0.1);
}

function draw() {
  background(360, 0, 100);
  particle.update(); // 파티클 업데이트
  particle.display(); // 업데이트 이후에 표시

  emitter.applyGravity(g);
  emitter.update();
  emitter.display();
  console.log(emitter.balls.length);
}

function mouseClicked() {
  emitter.createBall(mouseX, mouseY);
}
