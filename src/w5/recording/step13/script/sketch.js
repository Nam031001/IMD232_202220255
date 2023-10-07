let x, y;
const rad = 50;
let isHover = false;
let isDragging = false;
let deltaX, deltaY;
// 중심에서 마우스가 눌린 좌표가지의 벡터길이를 저장

let movableObj;
// 초록색공, 클래스로 만듬, 원리는 똑같다

function setup() {
  setCanvasContainer('canvas', 3, 2, true);

  x = width / 2;
  y = height / 2;

  movableObj = new MovableObj(width / 4, height / 4, 50);

  colorMode(HSL, 360, 100, 100, 100);
  background(0, 0, 100);
}
function draw() {
  background(0, 0, 100);
  display();
  movableObj.display();
}

// 마우스가 원안에 들어왔는지 판별하는 식
//중심과 마우스 커서간에 거리가 반지름보다 같거나 작음 = 마우스가 원 안에있음
function chkHover(mX, mY) {
  const distSq = (x - mX) ** 2 + (y - mY) ** 2;
  return distSq <= rad ** 2;
  //mX ** 2 + mY ** 2 < rad ** 2;
}

function display() {
  noStroke();
  if (isHover) {
    fill(30, 80, 50);
  } else {
    fill(30, 60, 50);
  }
  //만약 마우스가 원안으로 들어올 시 색이 바뀌도록 함

  ellipse(x, y, 2 * rad);
}

function mouseMoved() {
  isHover = chkHover(mouseX, mouseY);
  movableObj.mouseMoved(mouseX, mouseY);
}
function mousePressed() {
  if (isHover) {
    isDragging = true;
    deltaX = mouseX - x;
    deltaY = mouseY - y;
    //클릭을 하는 순간 마우스 좌표와 원의 중심지간의 거리를 계산
  }

  movableObj.mousePressed(mouseX, mouseY);
}

function mouseDragged() {
  if (isDragging) {
    x = mouseX - deltaX;
    y = mouseY - deltaY;
    //계산한 벡터길이를 마우스좌표에서 뻄, 원의 중심지를 이동
  }
  movableObj.mouseDragged(mouseX, mouseY);
}
function mouseReleased() {
  isDragging = false;
  movableObj.mouseReleased();
}
