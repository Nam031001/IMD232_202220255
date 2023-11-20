let aDrunkenObj;
// 움직인 흔적들
let trace = [];
let path = [];

function setup() {
  setCanvasContainer('canvas', 1, 1, true);

  aDrunkenObj = new Drunken(width / 2, height / 2);

  background('white');
  // 선이 사후적으로 그려지는 걸 막는다
  trace.push(path);
}

function draw() {
  const randomForce = p5.Vector.random2D();
  randomForce.mult(1);
  aDrunkenObj.applyForce(randomForce);
  aDrunkenObj.update();
  aDrunkenObj.infiniteEdge();

  // 원이 화면을 넘어갔을 때 trace에 path를 추가한다
  if (aDrunkenObj.isCrossed) {
    // path는 새로운 어레이로 만든다, 새 패스를 트레이스에 추가로 넣는다
    //기존패스에는 더이상 값을 주지 않고 새 패스를 만들어서 값을 부여함으로써 가로세로 선이 생기지않게한다.
    path = [];
    trace.push(path);
    path.push([aDrunkenObj.pos.x, aDrunkenObj.pos.y]);
  } else {
    path.push([aDrunkenObj.pos.x, aDrunkenObj.pos.y]);
  }

  if (aDrunkenObj.isCrossed) {
    background('red');
  } else {
    background('white');
  }

  // 가지고 있는 선의 개수만큼 선을설정
  for (let pathIdx = 0; pathIdx < trace.length; pathIdx++) {
    noFill();
    beginShape();
    // 패스 내의 모든 점을 찍은 후 잇는다
    const aPath = trace[pathIdx];
    for (let pointIdx = 0; pointIdx < aPath.length; pointIdx++) {
      const point = aPath[pointIdx];
      vertex(point[0], point[1]);
    }
    endShape();
  }
  aDrunkenObj.display();

  console.log(trace);
}
// 포인트를 이어 만들어지는 path를 만드는 기준을
