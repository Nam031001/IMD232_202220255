class Mover {
  constructor() {
    this.pos = createVector(width / 2, height / 2);
    this.vel = createVector(0, 0);
    this.acc = createVector();
    this.accDisplay = createVector(0, 0);
    this.mouse = createVector(0, 0);
  }

  update() {
    this.mouse.x = mouseX;
    this.mouse.y = mouseY;
    this.accDisplay.set(this.acc);
    this.acc = p5.Vector.random2D();

    this.acc.mult(0.5);

    this.vel.add(this.acc);
    this.vel.limit(5);
    this.pos.add(this.vel);
  }

  infiniteEdge() {
    if (this.pos.x < 0) {
      this.pos.x += width;
    } else if (this.pos.x >= width) {
      this.pos.x -= width;
    }
    if (this.pos.y < 0) {
      this.pos.y += height;
    } else if (this.pos.y >= height) {
      this.pos.y -= height;
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
      this.pos.x + this.vel.x * 10,
      this.pos.y + this.vel.y * 10
    );
    stroke('red');
    line(
      this.pos.x,
      this.pos.y,
      this.pos.x + this.accDisplay.x * 100,
      this.pos.y + this.accDisplay.y * 100
    );
    stroke('black');
    line(
      this.pos.x,
      this.pos.y,

      this.mouse.x,
      this.mouse.y
      // this.pos.x + this.accDisplay.x * 100,
      // this.pos.y + this.accDisplay.y * 100
    );
  }
}
