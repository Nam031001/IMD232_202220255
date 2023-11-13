const {
  Engine,
  Render,
  Runner,
  Body,
  Composite,
  Composites,
  Constraint,
  MouseConstraint,
  Mouse,
  Vertices,
  Bodies,
  Common,
} = Matter;

// provide concave decomposition support library
Common.setDecomp(decomp);

const oWidth = 800;
const oHeight = 600;

let ropeA;
let ropeB;
let ropeC;

let mouse;
let mouseConstraint;

let stack;

// create engine
const engine = Engine.create(),
  world = engine.world;

// create runner
const runner = Runner.create();

function setup() {
  setCanvasContainer('canvas', oWidth, oHeight, true);
  // add bodies

  let arrow = Vertices.fromPath('10 0 40 20 50 40 40 50 40 80 0 50'),
    chevron = Vertices.fromPath('100 0 75 50 100 100 25 100 0 50 25 0'),
    star = Vertices.fromPath('50 0 65 10 69 59 82 90 30 75 28 100 31 59 '),
    horseShoe = Vertices.fromPath(
      '35 7 19 17 14 38 14 58 25 79 45 85 65 84 65 66 46 67 34 59 30 44 33 29 45 23 66 23 66 7 53 7'
    );

  // stack = Composites.stack(50, 50, 6, 4, 10, 10, function (x, y) {
  //   return Bodies.fromVertices(
  //     x,
  //     y,
  //     Common.choose([arrow, chevron, star, horseShoe])
  //   );
  // });

  var group = Body.nextGroup(true);

  ropeA = Composites.stack(100, 15, 9, 1, 10, 10, function (x, y) {
    return Bodies.fromVertices(x, y, Common.choose([arrow, star, arrow]), {
      collisionFilter: { group: group },
    });
  });

  // ropeA = Composites.stack(100, 50, 8, 1, 10, 10, function (x, y) {
  //   return Bodies.rectangle(x, y, 50, 20, {
  //     collisionFilter: { group: group },
  //   });
  // });

  Composites.chain(ropeA, 0.4, 0, -0.5, 0, {
    stiffness: 0.8,
    length: 2,
    render: { type: 'line' },
  });
  Composite.add(
    ropeA,
    Constraint.create({
      bodyB: ropeA.bodies[0],
      pointB: { x: -25, y: 0 },
      pointA: { x: ropeA.bodies[0].position.x, y: ropeA.bodies[0].position.y },
      stiffness: 0.5,
    })
  );

  group = Body.nextGroup(true);

  ropeB = Composites.stack(350, 50, 10, 1, 10, 10, function (x, y) {
    return Bodies.circle(x, y, 20, { collisionFilter: { group: group } });
  });

  Composites.chain(ropeB, 0.5, 0, -0.5, 0, {
    stiffness: 0.8,
    length: 2,
    render: { type: 'line' },
  });
  Composite.add(
    ropeB,
    Constraint.create({
      bodyB: ropeB.bodies[0],
      pointB: { x: -20, y: 0 },
      pointA: { x: ropeB.bodies[0].position.x, y: ropeB.bodies[0].position.y },
      stiffness: 0.5,
    })
  );

  group = Body.nextGroup(true);

  // ropeC = Composites.stack(600, 50, 13, 1, 10, 10, function (x, y) {
  //   return Bodies.rectangle(x - 20, y, 50, 20, {
  //     collisionFilter: { group: group },
  //     chamfer: 5,
  //   });
  // });

  ropeC = Composites.stack(600, 15, 9, 1, 10, 10, function (x, y) {
    return Bodies.fromVertices(x, y, Common.choose([arrow, star]), {
      collisionFilter: { group: group },
    });
  });

  Composites.chain(ropeC, 0.6, 0, -0.3, 0, { stiffness: 1, length: 0 });
  Composite.add(
    ropeC,
    Constraint.create({
      bodyB: ropeC.bodies[0],
      pointB: { x: -20, y: 0 },
      pointA: { x: ropeC.bodies[0].position.x, y: ropeC.bodies[0].position.y },
      stiffness: 0.5,
    })
  );

  Composite.add(world, [ropeA, ropeB, ropeC]);

  mouse = Mouse.create(canvas.elt);
  mouse.pixelRatio = (pixelDensity() * width) / oWidth;
  let mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: 0.2,
    },
  });

  Composite.add(world, mouseConstraint);

  console.log('ropeA', ropeA.bodies);
  console.log('ropeB', ropeB);
  console.log('ropeC', ropeC.bodies);

  background('white');
  Runner.run(runner, engine);
}

function draw() {
  mouse.pixelRatio = (pixelDensity() * width) / oWidth;
  background('white');

  noStroke();
  fill('lightcoral');
  // stroke(0);

  ropeA.bodies.forEach((eachBody) => {
    eachBody.parts.forEach((eachPart, idx) => {
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

  fill('cornflowerblue');
  ropeB.bodies.forEach((eachBody) => {
    beginShape();
    eachBody.vertices.forEach((eachVertex) => {
      vertex(
        (eachVertex.x / oWidth) * width,
        (eachVertex.y / oHeight) * height
      );
    });
    endShape(CLOSE);
  });
  fill('lightgreen');
  // ropeC.bodies.forEach((eachBody) => {
  //   beginShape();
  //   eachBody.vertices.forEach((eachVertex) => {
  //     vertex(
  //       (eachVertex.x / oWidth) * width,
  //       (eachVertex.y / oHeight) * height
  //     );
  //   });
  //   endShape(CLOSE);
  // });

  ropeC.bodies.forEach((eachBody) => {
    eachBody.parts.forEach((eachPart, idx) => {
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
