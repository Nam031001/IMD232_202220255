let vehicle;
let mVec;
let debug = true;

function setup() {
  setCanvasContainer('mySketchGoesHere', 2, 1, true);

  colorMode(HSL, 360, 100, 100, 100);

  vehicle = new Vehicle(width / 2, height / 2, 16, 5, 0.1, color(330, 100, 50));
  mVec = createVector();

  colorMode(RGB, 255, 255, 255);
  background(255);
}

function draw() {
  background(255);
  mVec.set(mouseX, mouseY);
  vehicle.seek(mVec);
  vehicle.update();
  vehicle.display();
}
// seek => desired vel - vel
//flee => 는 타겟지점을 정반대로 두고 진행
// 벡터를 뺴기 = 뺴야하는 벡터를 정 반대 방향으로 두고 합해주기
