function setup() {
  setCanvasContainer('anyname', 3, 2, true);

  background(255);
  noStroke();
  fill('red');
}

function draw() {
  background(255);
  colorMode(RGB);
  stroke('#660000');
  strokeWeight(1.5);

  fill('#FFFF99');
  // 배경
  rect(0, 0, width, height);
  fill('#FFCC66');
  rect(0, 0, width, height * 0.6);

  // circle(width * 0.5, height * 0.5, width * 0.1, true);
  // 창문

  fill('#FFCC33');
  rect(0, 0, width * 0.5, height * 0.6, true);

  fill('#CCFFFF');
  rect(0, 0, width * 0.43, height * 0.5, true);
  fill('#FFFF99');
  circle(width * 0.05, 0, width * 0.35);

  // 탁자
  fill('#FFCC33');
  rect(width * 0.3, height * 0.7, width * 0.7, height * 0.1);
  fill('#CC9966');
  rect(width * 0.5, height * 0.76, width * 0.08, height * 0.4);
  rect(width * 0.9, height * 0.76, width * 0.08, height * 0.4);
  // noneStroke();
  fill('#CC6633');
  rect(width * 0.3, height * 0.76, width * 0.7, height * 0.05);
  rect(width * 0.3, height * 0.76, width * 0.08, height * 0.4);

  // 의자
  fill('#FFCC33');
  rect(width * 0.1, height * 0.85, width * 0.5, height * 0.1);
  fill('#CC6633');
  rect(width * 0.1, height * 0.9, width * 0.5, height * 0.05);
  fill('#CC6633');
  rect(width * 0.1, height * 0.9, width * 0.05, height * 0.5);
  rect(width * 0.55, height * 0.9, width * 0.05, height * 0.5);

  // 열매
  fill('#CC6633');
  rect(width * 0.7, height * 0.7, width * 0.7, height * 0.01);
  fill('#FFCC33');
  circle(width * 0.9, height * 0.65, width * 0.08);
  circle(width * 0.69, height * 0.45, width * 0.08);
  circle(width * 0.64, height * 0.5, width * 0.08);
  circle(width * 0.79, height * 0.5, width * 0.08);
  circle(width * 0.72, height * 0.52, width * 0.08);

  // 양동이
  fill('#CCCC33');
  rect(width * 0.6, height * 0.52, width * 0.23, height * 0.19, 0, 0, 50, 50);

  // 조명
  fill('#FFFF99');
  circle(width * 0.965, height * 0.22, width * 0.12);
  fill('#CCCC33');
  rect(width * 0.94, height * 0, width * 0.05);
  rect(width * 0.8, height * 0.05, width * 0.25, height * 0.2, 10);
}
