function setup() {
  setCanvasContainer('canvas', 3, 2, true);

  background(255);
}

function draw() {
  background(255);

  // randomSeed(5000);
  // 랜덤을 시작할 때 첫번째에 나오는 값으로 고정

  ellipse(width / 2 + random(100, 200), height / 2, 50);
  ellipse(width / 2 + random() * 100 + 100, height / 2 + 100, 50);
  // 같은 효과
}
