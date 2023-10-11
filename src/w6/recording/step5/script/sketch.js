let emitters;
// 연기가 뜨려고 하는힘
let floatingForce;
let windForce;
let texture;

function preload() {
  texture = loadImage('data/texture.png');
}

function setup() {
  setCanvasContainer('canvas', 2, 1, true);
  emitters = new Emitter(width / 2, height - 50);
  floatingForce = createVector(0, -0.005);
  windForce = createVector();

  imageMode(CENTER);
  background(16);
}

function draw() {
  //mouseX는 0부터 widht-1까지를 값으로 가질 수 있는 존재, 그걸 -1부터 1사이의 값으로 바꾼다
  let windX = map(mouseX, 0, width - 1, -1, 1);
  windX *= 0.05;
  windForce.set(windX, 0);
  emitters.addParticle();
  emitters.applyForce(floatingForce);
  emitters.applyForce(windForce);
  emitters.update();

  background(16);

  emitters.display();
}
