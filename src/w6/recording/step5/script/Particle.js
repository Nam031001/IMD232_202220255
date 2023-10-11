class Particle {
  constructor(x, y, mass, rad, lifeSpan) {
    this.pos = createVector(x, y);
    // this.vel = createVector(0, 0);
    this.vel = createVector(1, 0);
    // 원을 여러개로 분사시킴
    this.vel.rotate((TAU / 360) * random(-120, -60));
    this.acc = createVector(0, 0);
    this.mass = mass;
    this.rad = rad;
    // 총수명
    this.lifeSpan = lifeSpan;
    // 줄어드는 수명을 따로 설정
    this.life = this.lifeSpan;
  }

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
    // noStroke();
    // fill(255, 255 * this.getNomalizedLife());
    // ellipse(this.pos.x, this.pos.y, this.rad * 2);
    tint(255, 0, 0, 255 * this.getNomalizedLife());
    image(texture, this.pos.x, this.pos.y);
  }

  getNomalizedLife() {
    // 니가 지금 몇살이고 원래 몇살까지 살기로 되어잇엇냐
    return this.life / this.lifeSpan;
  }

  isDead() {
    return this.life < 0;
  }
}
