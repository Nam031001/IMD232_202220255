let ball;
let ball2;
let gravity;
let wind;
let att;

function setup() {
  setCanvasContainer('mySketchGoesHere', 3, 2, true);
  background('salmon');
  ball = new Mover(width / 3, 0, 50);
  ball2 = new Mover((2 * width) / 3, 0, 10);
  gravity = createVector(0, 0.1);
  // 왼쪾으로 가는 바람
  wind = createVector(-1, 0);
  att = new Attractor(width / 2, height / 2, 100);
}

function draw() {
  // let g = p5.Vector.mult(gravity, ball.mass);
  // let g2 = p5.Vector.mult(gravity, ball2.mass);
  // ball.applyForce(g);
  // ball2.applyForce(g2);
  // if (mouseIsPressed) {
  //   ball.applyForce(wind);
  //   ball2.applyForce(wind);
  // }

  let force1 = att.attract(ball);
  // ball.applyForce(force1);
  let force2 = att.attract(ball2);
  // ball2.applyForce(force2);
  ball.update();
  ball2.update();
  // ball.edgeBounce();
  // ball2.edgeBounce();
  background('salmon');
  fill('white');
  ball.display();
  ball2.display();
  att.display();
}
