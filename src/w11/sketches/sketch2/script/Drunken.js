class Drunken {
  constructor(x, y) {
    this.pos = createVector(x, y);

    // 랜덤한 방향으로 5의 초기속도를 가지도록
    this.vel = p5.Vector.random2D();
    this.vel.mult(5);

    this.acc = createVector();
    this.mass = 1;

    // 화면을 넘어갔다는 사실을 알려주는 기능
    this.isCrossed = false;
  }

  applyForce(force) {
    const calcedAcc = p5.Vector.div(force, this.mass);
    this.acc.add(calcedAcc);
  }

  update() {
    this.isCrossed = false;
    this.vel.add(this.acc);
    this.vel.limit(5);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  infiniteEdge() {
    if (this.pos.x < 0) {
      this.pos.x = width;
      this.isCrossed = true;
    } else if (this.pos.x > width) {
      this.pos.x = 0;
      this.isCrossed = true;
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
      this.isCrossed = true;
    } else if (this.pos.y > height) {
      this.pos.y = 0;
      this.isCrossed = true;
    }
  }

  display() {
    stroke(0);
    fill(255);
    ellipse(this.pos.x, this.pos.y, 50);
  }
}
