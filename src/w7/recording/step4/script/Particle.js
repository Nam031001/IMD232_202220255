// mass개념 없이 진행

class Particle {
  constructor(x, y, mass, lifeSpan) {
    this.pos = createVector(x, y);
    // 랜덤한 방향으로 1짜리 벡터가 만들어짐
    // this.vel = p5.Vector.random2D()

    // 150도부터 30사이의 랜덤한 각도로 이동하는 0도방향 길이 1짜리 벡터생성
    this.vel = createVector(1, 0);
    this.vel.rotate((TAU / 360) * random(-150, -30));

    this.acc = createVector(0, 0);
    this.mass = mass;
    // mass가 1일떄 반지름이 5
    this.rad = this.mass ** 0.5 * 5;
    // lifeSpan = 수명
    this.lifeSpan = lifeSpan;
    this.life = this.lifeSpan;
  }

  // 외부에 힘이 들어오면 질량으로 나눠서 그걸 가속도 삼아, 가속도에 더해주다
  // 중력으로 인한힘, 밀어내는 힘이 작동할수 있도록
  applyForce(force) {
    const acc = p5.Vector.div(force, this.mass);
    this.acc.add(acc);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.life--;
  }

  display() {
    // 시작할 떄는 1이고 뒤로갈수록 0이되도록
    const normalizedLife = constrain(this.life / this.lifeSpan, 0, 1);
    stroke(0, 255 * normalizedLife);
    fill(127, 255 * normalizedLife);

    ellipse(this.pos.x, this.pos.y, this.rad * 2);
  }

  isDead() {
    return this.life < 0;
  }
}
