// Runner = draw의 역할, 계속 반복
// Bodies = 물체를 그리게 해줌
// Composite = 물체를 세계에 추가
let { Engine, Bodies, Composite, Runner } = Matter;

// 필수과정 1: 엔진 만들기
let engine = Engine.create();

let runner = Runner.create();

let boxA;
let boxB;
let ground;

function setup() {
  setCanvasContainer('canvas', 3, 2, true);

  rectMode(CENTER);

  // 옵션과정 1 : 물체 만들기
  boxA = Bodies.rectangle(400, 200, 80, 80);
  boxB = Bodies.rectangle(450, 50, 80, 80);
  ground = Bodies.rectangle(width / 2, height - 80, width - 200, 160, {
    isStatic: true,
  });

  // 옵션과정 2: 물체를 세계에 추가하기
  // Composite.add(engine.world, [boxA, boxB, ground]);
  Composite.add(engine.world, boxA);
  Composite.add(engine.world, boxB);
  Composite.add(engine.world, ground);

  background(255);

  console.log(ground);

  Runner.run(runner, engine);
}

function draw() {
  // Engine.update(engine);
  background(255);

  push();
  translate(boxA.position.x, boxA.position.y);
  rotate(boxA.angle);
  rect(0, 0, 80, 80);
  pop();

  push();
  translate(boxB.position.x, boxB.position.y);
  rotate(boxB.angle);
  rect(0, 0, 80, 80);
  pop();

  rect(ground.position.x, ground.position.y, width - 200, 160);
}
