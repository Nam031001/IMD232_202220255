// particle의 기본원리 = 일정주기가 넘으면 다시 생성되게함
//없애야할 건 없애고 화면상에 보이는 것만 계산되도록 해야 한다
// => 렉방지

let emitters = [];
let gravity = 0;
let reppler;

function setup() {
  setCanvasContainer('canvas', 3, 2, true);

  gravity = createVector(0, 0.05);

  repeller = new Repeller(width / 2, height / 2, 5000);

  // 등간격으로 떨어지는 5개의 물줄기
  for (let i = 0; i < 5; i++) {
    emitters.push(new Emitter((width / 6) * (i + 1), 20));
  }

  background(255);
}

function draw() {
  for (let i = 0; i < emitters.length; i++) {
    emitters[i].addParticle();
  }

  background(255);

  for (let i = 0; i < emitters.length; i++) {
    emitters[i].applyGravity(gravity);
    emitters[i].applyRepeller(repeller);
    emitters[i].update();
    emitters[i].display();
  }
  repeller.display();
}

function mouseMoved() {
  repeller.mouseMoved(mouseX, mouseY);
}
function mousePressed() {
  repeller.mousePressed(mouseX, mouseY);
}
function mouseDragged() {
  repeller.mouseDragged(mouseX, mouseY);
}
function mouseReleased() {
  repeller.mouseReleased();
}
// 클릭하는 곳에서 새로운 분수가 생겨난다
// function mousePressed() {
//   emitters.push(new Emitter(mouseX, mouseY));
// }
