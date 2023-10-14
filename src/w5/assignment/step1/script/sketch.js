const cNum = 8;
const rNum = 8;
let grid;
let angleBegin = 0;
let angleBeginVel;
let angleStep;
let margin;

function setup() {
  setCanvasContainer('canvas', 1, 1, true);
  noFill();
  stroke(0);
  colorMode(HSL, 360, 100, 100, 100);
  background(360, 0, 100);

  angleStep = TAU / cNum;

  angleBeginVel = 0.01;

  margin = -35; // 여백 및 원 사이의 간격 크기 (좌우 여백 및 원 간격을 동일하게 설정)

  grid = (width - margin * 2) / (cNum + 1); // 캔버스 폭에서 좌우 여백을 빼고 나머지를 원 및 간격으로 사용
}

function draw() {
  background(360, 0, 100);

  let currentAngle = angleBegin; // 현재 열의 시작 각도

  for (let r = 0; r < rNum; r++) {
    for (let c = 0; c < cNum; c++) {
      const x = margin + (c + 1) * grid; // 좌우 여백과 원 간의 간격을 추가
      const y = margin + (r + 1) * grid; // 상단과 하단 여백과 원 간의 간격을 추가

      push();
      translate(x, y);
      rotate(currentAngle);

      // Calculate position on the small circle path
      const smallCircleX = cos(currentAngle) * 35;
      const smallCircleY = sin(currentAngle) * 35;

      // Draw a line connecting the small circle to the center
      line(0, 0, smallCircleX, smallCircleY);
      // Draw the small circle
      ellipse(0, 0, 70);
      fill(0);
      ellipse(smallCircleX, smallCircleY, 20);

      pop();

      currentAngle += 15 * (TAU / 360); // 작은 원의 회전 각도를 15도씩 증가
    }
  }

  angleBegin += angleBeginVel;
}
