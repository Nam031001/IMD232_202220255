let traffic;
let debug = true;

function setup() {
  setCanvasContainer('mySketchGoesHere', 2, 1, true);

  colorMode(HSL, 360, 100, 100, 100);

  traffic = new Traffic();

  // 캔버스를 새로 시작할때 무조건 20개는 있는 상태에서 시작
  for (let n = 0; n < 20; n++) {
    traffic.addVehicle(random(width), random(height));
  }

  background(255);
}

function draw() {
  background(0, 100, 100);
  traffic.run();
}
// seek => desired vel - vel
//flee => 는 타겟지점을 정반대로 두고 진행
// 벡터를 뺴기 = 뺴야하는 벡터를 정 반대 방향으로 두고 합해주기

function mouseDragged() {
  // 드래그를 할 때 차들이 생성
  traffic.addVehicle(mouseX, mouseY);
}
