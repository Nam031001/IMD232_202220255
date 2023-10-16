// particle의 기본원리 = 일정주기가 넘으면 다시 생성되게함
//없애야할 건 없애고 화면상에 보이는 것만 계산되도록 해야 한다
// => 렉방지

let emitter;
let emitters = [];
let gravity = 0;

function setup() {
  setCanvasContainer('canvas', 3, 2, true);

  emitter = new Emitter(width / 2, 20);

  gravity = createVector(0, 0.1);

  background(255);
}

function draw() {
  emitter.addParticle();
  for (let i = 0; i < emitters.length; i++) {
    emitters[i].addParticle();
  }

  background(255);
  emitter.update(gravity);
  emitter.display();

  for (let i = 0; i < emitters.length; i++) {
    emitters[i].update(gravity);
    emitters[i].display();
  }
  console.log(emitter.particles.length);
}

// 클릭하는 곳에서 새로운 분수가 생겨난다
function mousePressed() {
  emitters.push(new Emitter(mouseX, mouseY));
}
