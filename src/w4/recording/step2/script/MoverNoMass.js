class MoverNoMass {
  constructor(x, y, r) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.accDisplay = createVector(0, 0);
    this.radius = r;
  }

  addAcc(accInput) {
    // acc0,0에 gravity값을 더함
    this.acc.add(accInput);
  }

  // 위치 업데이트
  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.accDisplay.set(this.acc);
    this.acc.mult(0);
  }

  //   통통튀기기
  checkEdges() {
    if (this.pos.x < 0) {
      //   // 0보다 얼마나 뚫고 갔는가?
      //   let delta = this.pos.x - 0;
      //   // 그 뚫고간 거리에 -1을 곱해 방향을 뒤집고,
      //   delta *= -1;
      //   // 0을 기준으로 뒤집힌 거리를 더해준다.
      //   this.pos.x = 0 + delta;
      this.pos.x -= 0;
      this.pos.x *= -1;
      this.pos.x += 0;
      this.vel.x *= -1;
    } else if (this.pos.x > width - 1) {
      this.pos.x -= width - 1;
      this.pos.x *= -1;
      this.pos.x += width - 1;
      this.vel.x *= -1;
    }
    if (this.pos.y > height - 1) {
      this.pos.y -= height - 1;
      this.pos.y *= -1;
      this.pos.y += height - 1;
      this.vel.y *= -1;
    }
  }

  //   화면에 표현
  display() {
    noStroke();
    fill(0);
    ellipse(this.pos.x, this.pos.y, 2 * this.radius);
  }

  //   그려지는 공의 속도,가속도를 묘사
  displayVector() {
    stroke('red');
    line(
      this.pos.x,
      this.pos.y,
      this.pos.x + this.vel.x * 10,
      this.pos.y + this.vel.y * 10
    );
    stroke('lime');
    line(
      this.pos.x,
      this.pos.y,
      this.pos.x + this.accDisplay.x * 100,
      this.pos.y + this.accDisplay.y * 100
    );
  }
}
