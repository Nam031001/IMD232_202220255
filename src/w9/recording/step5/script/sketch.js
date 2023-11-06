// 1. 엔진만들기
// 2. 물체만들기
// 3. 물제를 엔진에 추가
// 4. 러너만들기
// 5. 러너에 엔진 등록해서 뺑뺑이

// console.log(Matter);
const {
  Engine,
  Bodies,
  Composite,
  Runner,
  Body,
  Vector,

  Mouse,
  MouseConstraint,
} = Matter;

// console.log(Engine);
const matterEngine = Engine.create();
// console.log(Runner);
const matterRunner = Runner.create();

const matterRects = [];
const matterShapes = [];

//변수생성, mouse와 mouseConstraint
let m;
let mc;

function setup() {
  setCanvasContainer('canvas', 3, 2, true);

  rectMode(CENTER);

  matterRects.push(
    new MatterRect(width / 4, height - 50, width / 2, 50, { isStatic: true })
  );
  matterRects.push(
    new MatterRect((width / 4) * 3, height - 200, width / 2, 50, {
      isStatic: true,
      angle: radians(-15),
    })
  );

  const vertices = [
    { x: 5.5 * 4, y: -4.8 * 4 },
    { x: 7.6 * 4, y: -1.6 * 4 },
    { x: 6.5 * 4, y: 1.8 * 4 },
    { x: 2.7 * 4, y: 4.5 * 4 },
    { x: -1.2 * 4, y: 4.2 * 4 },
    { x: -3.6 * 4, y: 1.9 * 4 },
    { x: -1.3 * 4, y: -2.8 * 4 },
  ];
  for (let n = 0; n < 4; n++) {
    const randomVector = p5.Vector.random2D();
    randomVector.mult(5);
    const aNewShape = new MatterShape(width / 2, 50, vertices);
    Body.setVelocity(
      aNewShape.body,
      Vector.create(randomVector.x, randomVector.y)
    );
    Body.setAngularVelocity(radians(random(-15, 15)));
    matterShapes.push(aNewShape);
  }

  // 도큐멘트 속의 p5Canvas안에 종속되는 마우스만들기
  m = Mouse.create(document.querySelector('.p5Canvas'));
  // m = Mouse.create(canvas.elt);

  // 현재 나의 픽셀 밀도를 뽑아준다
  console.log(pixelDensity());

  //m의 pixelRatio에 pixelDensity적용
  m.pixelRatio = pixelDensity();

  //마우스와 물리엔진 연결, 움직일 수 있게 한다. 마우스 mouse = m
  mc = MouseConstraint.create(matterEngine, {
    mouse: m,
    // constraint: { stiffness: 1 },
  });
  // 물리엔진세계에 mouseConstraint넣어서 사용할 수 있게 한다
  Composite.add(matterEngine.world, mc);

  background('white');

  Runner.run(matterRunner, matterEngine);
}

function draw() {
  background('white');

  matterRects.forEach((each) => {
    each.display();
  });

  for (let idx = matterShapes.length - 1; idx >= 0; idx--) {
    matterShapes[idx].display();
    if (matterShapes[idx].isDead()) {
      matterShapes[idx].remove();
      matterShapes.splice(idx, 1);
    }
  }
}
