class Mover {
  constructor() {
    this.accDisplay = createVector(0, 0);

    this.pos = createVector(random(width), random(height));
    this.target = createVector(mouseX, mouseY);

    this.vel = createVector();
    this.acc = createVector();

    this.radius = 20;
  }

  update() {
    this.accDisplay.set(this.acc);

    this.target.set(mouseX, mouseY);

    this.acc = p5.Vector.sub(this.target, this.pos);
    this.acc.normalize();
    this.acc.mult(0.2);

    this.vel.add(this.acc);
    this.vel.limit(5);

    this.pos.add(this.vel);

    this.checkEdges();
  }

  checkEdges() {
    if (pos.x < 0) {
      pos.x = width;
    } else if (pos.x > width) {
      pos.x = 0;
    }
    if (pos.y < 0) {
      pos.y = height;
    } else if (pos.y > height) {
      pos.y = 0;
    }
  }

  display() {
    fill(0);
    ellipse(this.pos.x, this.pos.y, 2 * radius);
  }
  displayVector() {
    stroke('blue');
    line(
      this.pos.x,
      this.pos.y,
      this.pos.x + this.vel.x * 20,
      this.pos.y + this.vel.y * 20
    );
    stroke('red');
    line(
      this.pos.x,
      this.pos.y,

      this.pos.x + this.accDisplay.x * 50,
      this.pos.y + this.accDisplay.y * 50
    );
    stroke('black');
    line(this.pos.x, this.pos.y, this.target.x, this.target.y);
  }
}
