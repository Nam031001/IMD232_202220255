// let Engine = Matter.Engine,
//   Render = Matter.Render,
//   Runner = Matter.Runner,
//   Bodies = Matter.Bodies,
//   Composite = Matter.Composite;

// Runner = draw의 역할, 계속 반복
// Bodies = 물체를 그리게 해줌
// Composite = 물체를 세계에 추가
//Runner = 물체를 계속 반복(draw)
let Engine = Matter.Engine;
let Render = Matter.Render;
let Runner = Matter.Runner;
let Bodies = Matter.Bodies;
let Composite = Matter.Composite;

// 필수과정 1: 엔진 만들기
let engine = Engine.create();

let elem = document.querySelector('#canvas');
// let elem = document.querySelector('body');
console.log(elem);

// 필수과정 2: 렌더러 만들기(우리 눈에보이게 그림)
let render = Render.create({
  element: elem,
  engine: engine,
  options: {
    width: elem.clientWidth,
    height: (elem.clientWidth / 4) * 3,
  },
});
console.log(render);

// 옵션과정 1 : 물체 만들기
let boxA = Bodies.rectangle(400, 200, 80, 80);
let boxB = Bodies.rectangle(450, 50, 80, 80);
let ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
console.log(ground);

// 옵션과정 2: 물체를 세계에 추가하기
// Composite.add(engine.world, [boxA, boxB, ground]);
Composite.add(engine.world, boxA);
Composite.add(engine.world, boxB);
Composite.add(engine.world, ground);

// 필수과정 3: 그림그리기
Render.run(render);

// 필수과정 4: 자동으로 계속 동작하게 해주는 장치 만들기
let runner = Runner.create();

// 필수과정 5: 자동 뺑뻉이에게 엔진을 등록해서 ㄱ
Runner.run(runner, engine);
