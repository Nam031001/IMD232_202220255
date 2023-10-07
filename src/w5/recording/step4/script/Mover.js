// 마우스를 따라오는 무버
class Mover {
  constructor(x, y, mass, rad, color) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.mass = mass;
    this.rad = rad;
    this.color = color;
  }
  applyForce(force) {
    const forceDividedByMass = p5.Vector.div(force, this.mass);
    this.acc.add(forceDividedByMass);
  }
  //   힘/질량 = 가속도 적용

  update() {
    this.vel.add(this.acc);
    this.vel.limit(5);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }
  display() {
    noStroke();
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, 2 * this.rad);
  }
  displayVector() {
    stroke('red');
    strokeWeight(1);
    line(
      this.pos.x,
      this.pos.y,
      this.pos.x + this.vel.x * 10,
      this.pos.y + this.vel.y * 10
    );
  }
}
