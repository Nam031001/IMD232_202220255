// 스프링의 고정된 한 점
// 평상시 길이
// 늘어나거나 줄어든 길이에 적용할 상수

// 길이 * 상수 = 힘

class Spring {
  constructor(x, y, length, k) {
    this.pos = createVector(x, y);

    this.restLength = length;
    this.k = k;
  }

  //공을 당겼을때 당겨진만큼 튀어오르기 구현
  //   hangingObj = 원, pos = 지지하고 있는 작은 원
  spring(hangingObj) {
    const dist =
      //   ((hangingObj.pos.x - this.pos.x) ** 2 +
      //     (hangingObj.pos.y - this.pos.y) ** 2) **
      //     1 /
      //   2;
      p5.Vector.dist(hangingObj.pos, this.pos);
    //   hangingObj와 this.pos의 거리를 구함
    const distDelta = dist - this.restLength;
    // 평상시 길이에서 현재 길이를 뺀다

    const towardBob = p5.Vector.sub(hangingObj.pos, this.pos);
    const force = towardBob.setMag(-1 * this.k * distDelta);
    // 원을 당긴 길이가 평상시 길이보다 더 길 시 => 그 거리는 양수가 됨
    // 그러나 해당 거리만큼 뺴줘야 하기 때문에 -1을 곱한다
    hangingObj.applyForce(force);
  }

  display(
    hangingObj //선의 길이 표현을 위해 원을 받아와야 하기 때문에 원이 나타나는 display의 매개변수로써 hangingobj //라는 가상의 매개체를 이용한다
  ) {
    noStroke();
    fill(127);
    ellipse(this.pos.x, this.pos.y, 20);
    noFill();
    stroke('#00FF00');
    line(this.pos.x, this.pos.y, hangingObj.pos.x, hangingObj.pos.y);
  }
}
