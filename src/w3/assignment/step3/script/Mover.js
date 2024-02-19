class Mover {
  constructor(x, y, rad) {
    this.pos = createVector(x, y);
    this.vel = createVector();
    this.acc = createVector();
    this.mass = rad ** (1 / 2);
    this.rad = rad;
  }

  applyForce(force) {
    let divideForce = p5.Vector.div(force, this.mass);
    this.acc.add(divideForce);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(5);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  display() {
    noStroke();
    fill('black');
    ellipse(this.pos.x, this.pos.y, this.rad * 2);
  }

  visualLine() {
    stroke('red');
    line(
      this.pos.x,
      this.pos.y,
      this.pos.x + this.vel.x * 10,
      this.pos.y + this.vel.y * 10
    );
    stroke('black');
    line(this.pos.x, this.pos.y, mouseX, mouseY);
  }
}
