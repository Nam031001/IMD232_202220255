// var Engine = Matter.Engine,
//   Render = Matter.Render,
//   Runner = Matter.Runner,
//   Composites = Matter.Composites,
//   Common = Matter.Common,
//   MouseConstraint = Matter.MouseConstraint,
//   Mouse = Matter.Mouse,
//   Composite = Matter.Composite,
//   Vertices = Matter.Vertices,
//   Bodies = Matter.Bodies;

const {
  Engine,
  Render,
  Runner,
  Composites,
  Common,
  MouseConstraint,
  Mouse,
  Composite,
  Vertices,
  Bodies,
} = Matter;

// provide concave decomposition support library
Common.setDecomp(decomp);

// create engine
const engine = Engine.create(),
  world = engine.world;

//runner
const runner = Runner.create();

const oWidth = 800;
const oHeight = 600;

let mouse;

const walls = [];
let stack;

function setup() {
  setCanvasContainer('canvas', oWidth, oHeight, true);

  walls.push(Bodies.rectangle(400, 0, 800, 50, { isStatic: true }));
  walls.push(Bodies.rectangle(400, 600, 800, 50, { isStatic: true }));
  walls.push(Bodies.rectangle(800, 300, 50, 600, { isStatic: true }));
  walls.push(Bodies.rectangle(0, 300, 50, 600, { isStatic: true }));

  Composite.add(world, walls);

  let arrow = Vertices.fromPath('40 0 40 20 100 20 100 80 40 80 40 100 0 50'),
    chevron = Vertices.fromPath('100 0 75 50 100 100 25 100 0 50 25 0'),
    star = Vertices.fromPath(
      '50 0 63 38 100 38 69 59 82 100 50 75 18 100 31 59 0 38 37 38'
    ),
    horseShoe = Vertices.fromPath(
      '35 7 19 17 14 38 14 58 25 79 45 85 65 84 65 66 46 67 34 59 30 44 33 29 45 23 66 23 66 7 53 7'
    );

  stack = Composites.stack(50, 50, 6, 4, 10, 10, function (x, y) {
    return Bodies.fromVertices(
      x,
      y,
      Common.choose([arrow, chevron, star, horseShoe])
    );
  });

  Composite.add(world, stack);

  // add mouse control
  // canvas.elt => 캔버스가 있는 요소를 반환해준다
  mouse = Mouse.create(canvas.elt);
  mouse.pixelRatio = (pixelDensity() * width) / oWidth;
  let mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: 0.2,
    },
  });

  Composite.add(world, mouseConstraint);

  background('white');

  // create runner
  Runner.run(runner, engine);
}

function draw() {
  mouse.pixelRatio = (pixelDensity() * width) / oWidth;
  background('white');

  stroke(0);
  noFill();
  walls.forEach((eachWall) => {
    beginShape();
    eachWall.vertices.forEach((eachVertex) => {
      vertex(
        (eachVertex.x / oWidth) * width,
        (eachVertex.y / oHeight) * height
      );
    });
    endShape(CLOSE);
  });

  noStroke();
  fill('red');
  stack.bodies.forEach((eachBody) => {
    // beginShape();
    // eachBody.vertices.forEach((eachVertex) => {
    //   vertex(
    //     (eachVertex.x / oWidth) * width,
    //     (eachVertex.y / oHeight) * height
    //   );
    // });
    // endShape(CLOSE);wrong

    // 각 바디 속 개별 어레이의 안쪽에 vertices가 있으므로 위 구문 대신 아래구문을 사용
    eachBody.parts.forEach((eachPart, idx) => {
      // idx가 0번일때는 아무것도 하지말고 그 다음부터 그려라
      //0번 => 도형을 감싸고 있는 바깥 바운더리
      // if (idx === 0) {
      //   fill(0);
      // } else {
      //   fill('red');
      // }
      if (idx === 0) return;
      beginShape();
      eachPart.vertices.forEach((eachVertex) => {
        vertex(
          (eachVertex.x / oWidth) * width,
          (eachVertex.y / oHeight) * height
        );
        endShape(CLOSE);
      });
    });
  });
}

// var Engine = Matter.Engine,
//   Render = Matter.Render,
//   Runner = Matter.Runner,
//   Composites = Matter.Composites,
//   Common = Matter.Common,
//   MouseConstraint = Matter.MouseConstraint,
//   Mouse = Matter.Mouse,
//   Composite = Matter.Composite,
//   Query = Matter.Query,
//   Svg = Matter.Svg,
//   Bodies = Matter.Bodies;

// // provide concave decomposition support library
// Common.setDecomp(decomp);

// // create engine
// var engine = Engine.create(),
//   world = engine.world;

// // create renderer
// const elem = document.querySelector('#canvas');
// var render = Render.create({
//   element: elem,
//   engine: engine,
//   options: {
//     width: 800,
//     height: 600,
//   },
// });

// Render.run(render);

// // create runner
// var runner = Runner.create();
// Runner.run(runner, engine);

// // add bodies
// if (typeof fetch !== 'undefined') {
//   var select = function (root, selector) {
//     return Array.prototype.slice.call(root.querySelectorAll(selector));
//   };

//   var loadSvg = function (url) {
//     return fetch(url)
//       .then(function (response) {
//         return response.text();
//       })
//       .then(function (raw) {
//         return new window.DOMParser().parseFromString(raw, 'image/svg+xml');
//       });
//   };

//   loadSvg('./svg/terrain.svg').then(function (root) {
//     var paths = select(root, 'path');

//     var vertexSets = paths.map(function (path) {
//       return Svg.pathToVertices(path, 30);
//     });

//     var terrain = Bodies.fromVertices(
//       400,
//       350,
//       vertexSets,
//       {
//         isStatic: true,
//         render: {
//           fillStyle: '#060a19',
//           strokeStyle: '#060a19',
//           lineWidth: 1,
//         },
//       },
//       true
//     );

//     Composite.add(world, terrain);

//     var bodyOptions = {
//       frictionAir: 0,
//       friction: 0.0001,
//       restitution: 0.6,
//     };

//     Composite.add(
//       world,
//       Composites.stack(80, 100, 20, 20, 10, 10, function (x, y) {
//         if (Query.point([terrain], { x: x, y: y }).length === 0) {
//           return Bodies.polygon(x, y, 5, 12, bodyOptions);
//         }
//       })
//     );
//   });
// } else {
//   Common.warn('Fetch is not available. Could not load SVG.');
// }

// // add mouse control
// var mouse = Mouse.create(render.canvas),
//   mouseConstraint = MouseConstraint.create(engine, {
//     mouse: mouse,
//     constraint: {
//       stiffness: 0.2,
//       render: {
//         visible: false,
//       },
//     },
//   });

// Composite.add(world, mouseConstraint);

// // keep the mouse in sync with rendering
// render.mouse = mouse;

// // fit the render viewport to the scene
// Render.lookAt(render, {
//   min: { x: 0, y: 0 },
//   max: { x: 800, y: 600 },
// });
