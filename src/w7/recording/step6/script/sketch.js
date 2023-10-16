function setup() {
  setCanvasContainer('canvas', 3, 2, true);
  background('white');
  line(width / 2, 0, width / 2, height);
  line(0, height / 2, width, height / 2);

  //   어레이와 다른 push다
  line(200, 0, 200, height);
  line(0, 100, width, 100);

  push();
  translate(width / 2, height / 2);
  rotate((TAU / 360) * 25);
  noStroke();
  fill('salmon');
  rect(0, 0, 50);
  stroke('salmon');
  line(200, 0, 200, height);
  line(0, 100, width, 100);
  pop();

  //   다른 도형을 다시 회전시킬 경우 설정해뒀던 원점과 회전값을 다시 돌려놔야한다
  //   translate(-width / 2, -height / 2);
  //   rotate((TAU / 360) * -25);
  //   => push()와 pop()으로 대체할 수 있다

  translate(200, 100);
  rotate((TAU / 360) * -15);
  //   fill('slateblue');
  rect(0, 0, 50);
  rect(100, 100, 50);
}

function draw() {}
