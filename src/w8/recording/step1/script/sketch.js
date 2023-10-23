let vehicle;
// 아이콘부터 마우스까지의 거리 = desiredVelocity, 쪽으로 이동하게 한다
let mVec;

function setup() {
  setCanvasContainer('canvas', 3, 2, true);

  vehicle = new Vehicle(width / 2, height / 2, 1, 20, 10, 0.1);
  mVec = createVector();

  background(255);
}
function draw() {
  mVec.set(mouseX, mouseY);

  vehicle.seek(mVec);
  vehicle.update();
  background(255);
  vehicle.display();
}
