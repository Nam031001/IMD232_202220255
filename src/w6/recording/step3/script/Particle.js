// mass개념 없이 진행

class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    // 랜덤한 방향으로 1짜리 벡터가 만들어짐
    // this.vel = p5.Vector.random2D()

    // 150도부터 30사이의 랜덤한 각도로 이동하는 0도방향 길이 1짜리 벡터생성
    this.vel = createVector(1, 0);
    this.vel.rotate((TAU / 360) * random(-150, -30));

    this.acc = createVector(0, 0);
    this.rad = 8;
    // lifeSpan = 수명
    this.lifeSpan = 512;
  }

  applyForce(force) {
    this.acc.set(force);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.lifeSpan -= 2;
  }

  display() {
    stroke(0, this.lifeSpan);
    fill(127, this.lifeSpan);
    ellipse(this.pos.x, this.pos.y, this.rad * 2);
  }

  isDead() {
    return this.lifeSpan < 0;
  }
}
