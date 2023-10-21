let dataPoint = [];

function setup() {
  setCanvasContainer('canvas', 3, 2, true);

  frameRate(5);
  // 프레임을 기본값(60)에서 초당 5번으로 바꾸기

  for (let i = 0; i < 50; i++) {
    dataPoint.push(0.5);
  }

  background(255);
}

function draw() {
  dataPoint[dataPoint.length - 1] = map(mouseY, 0, height, 1, 0);
  background(255);
  noStroke();
  fill(0);
  for (let i = 0; i < dataPoint.length; i++) {
    const x = (width / (dataPoint.length + 1)) * (i + 1);
    const y = map(dataPoint[i], 0, 1, height, 0);
    ellipse(x, y, 10);
  }

  for (let i = 0; i < dataPoint.length - 1; i++) {
    // 데이터포인트의 i는 자기보다 뒤에있는 친구의 값을 가지고 오게한다
    dataPoint[i] = dataPoint[i + 1];
  }
}
