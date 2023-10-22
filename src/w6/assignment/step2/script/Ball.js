class Ball {
  constructor(posX, posY, velAngle, velMag, mass, h, s, v) {
    this.pos = createVector(posX, posY);
    this.vel = createVector(1, 0);
    this.vel.rotate(velAngle);
    this.vel.mult(velMag);
    this.acc = createVector();
    this.mass = mass;
    this.rad = this.mass * 2;
    this.color = color(h, s, v);
    this.lifeSpan = 60;
  }

  applyForce(force) {
    const calcedAcc = p5.Vector.div(force, this.mass);
    this.acc.add(calcedAcc);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.lifeSpan -= 1;
    // this.lifeSpan = constrain(this.lifeSpan, 0, 60);
  }
  display() {
    const initialLifespan = 60; // 초기 수명
    const transparency = map(this.lifeSpan, 0, initialLifespan, 0, 255); // 수명에 따른 투명도 매핑
    fill(red(this.color), green(this.color), blue(this.color), transparency);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.rad * 2);
  }

  isDead() {
    return (
      this.pos.x < -this.rad ||
      this.pos.x > width + this.rad ||
      this.pos.y < -this.rad ||
      this.pos.y > height + this.rad ||
      this.lifeSpan < 0
    );
  }
}
