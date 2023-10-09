class Mover {
  constructor(x, y, radius) {
    this.pos = createVector(x, y);
    // this.vel = createVector(0, 0);
    this.vel = p5.Vector.random2D();
    this.acc = createVector(0, 0);
    this.radius = radius;
    this.mass = radius ** (1 / 2);
    // radius의 2분의 1 제곱근
    // mass = 질량
  }

  //   밖에서 힘이라는 변수를 받아올것임
  applyForce(force) {
    // force.div(this.mass);
    let divedForce = p5.Vector.div(force, this.mass);
    this.acc.add(divedForce);
    // force를 변화시키지 않고 계산한 결과값을 내놓는다
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);

    // this.applyForce에서 두줄을 적을시 추가해야하는 사항, 가속도가 계속 커지는 것을 방지, 매번 초기화 후 계산
    this.acc.mult(0);
  }

  //  통통튀기는 모션
  edgeBounce() {
    if (this.pos.x < 0 + this.radius) {
      let delta = this.pos.x - (0 + this.radius);
      this.pos.x += -2 * this.delta;
      this.vel.x *= -1;
    } else if (this.pos.x > width - 1 - this.radius) {
      let delta = this.pos.x - (width - 1 - this.radius);
      this.pos.x += -2 * delta;
      this.vel.x *= -1;
    }
    if (this.pos.y > height - 1 - this.radius) {
      let delta = this.pos.y - (height - 1 - this.radius);
      this.pos.y += -2 * delta;
      this.vel.y *= -1;
    }
  }

  display() {
    ellipse(this.pos.x, this.pos.y, 2 * this.radius);
  }
}
