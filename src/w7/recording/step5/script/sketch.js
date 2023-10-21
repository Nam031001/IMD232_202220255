let dataPoint = [];

function setup() {
  setCanvasContainer('canvas', 3, 2, true);

  frameRate(5);
  // 프레임을 기본값(60)에서 초당 5번으로 바꾸기

  for (let i = 0; i < 50; i++) {
    dataPoint.push(0.5);
  }

  background(255);
  randomSeed(50);
  // 컴퓨터 안에 랜덤한 값들이 미리 저장된 것들이 있는데 어떤 숫자를 넣느냐에 따라 그 표의 첫번째부터 랜덤값을 호출
}

function draw() {
  // dataPoint[dataPoint.length - 1] = map(mouseY, 0, height, 1, 0);
  // randomSeed(0);
  dataPoint[dataPoint.length - 1] = random();
  background(255);
  noStroke();
  fill(0);
  for (let i = 0; i < dataPoint.length; i++) {
    const x = (width / (dataPoint.length + 1)) * (i + 1);
    const y = map(dataPoint[i], 0, 1, height, 0);
    ellipse(x, y, 10);
  }
  stroke(0);
  noFill();
  beginShape();
  for (let i = 0; i < dataPoint.length; i++) {
    const x = (width / (dataPoint.length + 1)) * (i + 1);
    const y = map(dataPoint[i], 0, 1, height, 0);
    vertex(x, y);
  }
  endShape();

  for (let i = 0; i < dataPoint.length - 1; i++) {
    // 데이터포인트의 i는 자기보다 뒤에있는 친구의 값을 가지고 오게한다
    dataPoint[i] = dataPoint[i + 1];
  }
}
