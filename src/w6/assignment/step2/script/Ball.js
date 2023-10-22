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
    this.lifeSpan = constrain(this.lifeSpan, 0, 60);
  }

  display() {
    fill(this.color, this.lifeSpan);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.rad * 2);
    // console.log('life', this.lifeSpan);
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
