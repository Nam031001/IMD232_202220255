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

  if (typeof fetch !== 'undefined') {
    var select = function (root, selector) {
      return Array.prototype.slice.call(root.querySelectorAll(selector));
    };
  
    var loadSvg = function (url) {
      return fetch(url)
        .then(function (response) {
          return response.text();
        })
        .then(function (raw) {
          return new window.DOMParser().parseFromString(raw, 'image/svg+xml');
        });
    };
  
    // 그림파일
    [
      './svg/iconmonstr-check-mark-8-icon.svg',
      './svg/iconmonstr-paperclip-2-icon.svg',
      './svg/iconmonstr-puzzle-icon.svg',
      './svg/iconmonstr-user-icon.svg',
      // './svg/iconmonstr-direction-4-icon.svg',
    ].forEach(function (path, i) {
      loadSvg(path).then(function (root) {
        var color = Common.choose([
          '#f19648',
          '#f5d259',
          '#f55a3c',
          '#063e7b',
          '#ececd1',
        ]);
  
        var vertexSets = select(root, 'path').map(function (path) {
          return Vertices.scale(Svg.pathToVertices(path, 30), 0.4, 0.4);
        });
  
        Composite.add(
          world,
          Bodies.fromVertices(
            100 + i * 150,
            200 + i * 50,
            vertexSets,
            {
              render: {
                fillStyle: color,
                strokeStyle: color,
                lineWidth: 1,
              },
            },
            true
          )
        );
      });
    });
  

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
    beginShape();
    eachBody.vertices.forEach((eachVertex) => {
      vertex(
        (eachVertex.x / oWidth) * width,
        (eachVertex.y / oHeight) * height
      );
    });
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

// add bodies

  loadSvg('./svg/svg.svg').then(function (root) {
    var color = Common.choose([
      '#f19648',
      '#f5d259',
      '#f55a3c',
      '#063e7b',
      '#ececd1',
    ]);

    var vertexSets = select(root, 'path').map(function (path) {
      return Svg.pathToVertices(path, 30);
    });

    Composite.add(
      world,
      Bodies.fromVertices(
        400,
        80,
        vertexSets,
        {
          render: {
            fillStyle: color,
            strokeStyle: color,
            lineWidth: 1,
          },
        },
        true
      )
    );
  });
} else {
  Common.warn('Fetch is not available. Could not load SVG.');
}
