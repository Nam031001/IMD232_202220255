let ball;
let ball2;
let gravity;
let wind;

function setup() {
  setCanvasContainer('mySketchGoesHere', 3, 2, true);
  background('salmon');
  ball = new Mover(width / 3, 0, 50);
  ball2 = new Mover((2 * width) / 3, 0, 10);
  gravity = createVector(0, 0.1);
  // 왼쪾으로 가는 바람
  wind = createVector(-1, 0);
}

function draw() {
  //gravity에 ball의 mass를 곱한값을 g로 삼는다
  let g = p5.Vector.mult(gravity, ball.mass);
  ball.applyForce(g);
  let g2 = p5.Vector.mult(gravity, ball2.mass);
  ball2.applyForce(g2);
  if (mouseIsPressed) {
    ball.applyForce(wind);
    ball2.applyForce(wind);
  }
  ball.update();
  ball2.update();
  ball.edgeBounce();
  ball2.edgeBounce();
  background('salmon');
  fill('white');
  ball.display();
  ball2.display();
}
