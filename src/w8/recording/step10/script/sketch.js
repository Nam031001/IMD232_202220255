let flowfiled;
let mVec;

function setup() {
  setCanvasContainer('canvas', 1, 1, true);

  flowfiled = new Flowfiled(30, 0.05);
  mVec = createVector(0, 0);

  background(255);
}
function draw() {
  mVec.set(mouseX, mouseY);

  const lookupVec = flowfiled.lookup(mVec);

  background(255);
  flowfiled.display();

  // 해당각도를 마우스가 가는곳마다 빨간선으로 표기하기
  push();
  translate(mVec.x, mVec.y);
  rotate(lookupVec.heading());
  noStroke();
  // fill('white');
  // ellipse(0, 0, 20);
  // noFill();
  strokeWeight(4);
  stroke('red');
  line(-50, 0, 50, 0);
  pop();
}

// 새로고침할때마다 다르게 나타내기
function mousePressed() {
  flowfiled.init();
}
