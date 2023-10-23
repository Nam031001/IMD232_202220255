let noiseXA = 0;
let noiseXB = 0;
let noiseXAVel = 0.01;
let noiseXBVel = 0.1;

function setup() {
  setCanvasContainer('canvas', 3, 2, true);

  background(255);
}

function draw() {
  background(255);

  // ellipse(width / 2 + random(100, 200), height / 2, 50);
  // ellipse(width / 2 + random() * 100 + 100, height / 2 + 100, 50);
  ellipse(width / 2 + noise(noiseXA) * 100 + 100, height / 2, 50);
  // 최소값 100, 최대값 200을 왔다갔다하도록
  ellipse(width / 2 + noise(noiseXB) * 100 + 100, height / 2 + 100, 50);
  noiseXA += noiseXAVel;
  noiseXB += noiseXBVel;
}
