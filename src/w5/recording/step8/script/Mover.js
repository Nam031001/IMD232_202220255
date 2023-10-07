// 마우스를 따라오는 무버
class Mover {
  constructor(x, y, mass, rad, color) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.mass = mass;
    this.rad = rad;
    this.color = color;
    // 컬러를 직접 넣을 수 있도록
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
    // noStroke();
    // fill(this.color);
    // ellipse(this.pos.x, this.pos.y, 2 * this.rad);

    // noStroke();
    // fill(this.color);
    // rectMode(CENTER);
    // rect(this.pos.x, this.pos.y, 2 * this.rad);

    // stroke(0);
    // strokeWeight(1);
    // noFill();
    // ellipse(this.pos.x, this.pos.y, 2 * this.rad);
    // noStroke();
    // fill(this.color);
    // beginShape();
    // vertex(this.pos.x + this.rad, this.pos.y);
    // vertex(this.pos.x - this.rad / 2, this.pos.y - this.rad / 2);
    // vertex(this.pos.x, this.pos.y);
    // vertex(this.pos.x - this.rad / 2, this.pos.y + this.rad / 2);
    // endShape(CLOSE);

    push();
    translate(this.pos.x, this.pos.y);
    const angle = atan2(this.vel.y, this.vel.x);
    rotate(angle);
    stroke(0);
    strokeWeight(1);
    noFill();
    // ellipse(0, 0, 2 * this.rad);
    noStroke();
    fill(this.color);
    beginShape();
    vertex(0 + this.rad, 0);
    vertex(0 - this.rad / 2, 0 - this.rad / 2);
    vertex(0, 0);
    vertex(0 - this.rad / 2, 0 + this.rad / 2);
    endShape(CLOSE);
    pop();
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
