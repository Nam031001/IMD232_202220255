class Mover {
  constructor(x, y, rad, mass) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.mass = mass;
    this.rad = rad;

    this.isHover = false;
    this.isDragged = false;
    this.movingOffset = createVector();

    this.pMVec = createVector();
    this.mVec = createVector();
  }

  applyForce(force) {
    let divideForce = p5.Vector.div(force, this.mass);
    this.acc.add(divideForce);
  }

  update() {
    if (!this.isDragged) {
      this.vel.mult(0.999);
      this.vel.add(this.acc);
      this.pos.add(this.vel);
    }
    this.acc.mult(0);
  }

  display() {
    noStroke();
    if (this.isDragged) {
      fill('red');
    } else if (this.isHover) {
      fill('gray');
    } else {
      fill('black');
    }

    ellipse(this.pos.x, this.pos.y, this.rad * 2);
  }

  checkEdges() {
    if (this.pos.x < 0) {
      this.pos.x -= 0;
      this.pos.x *= -1;
      this.pos.x += 0;
      this.vel.x *= -1;
    } else if (this.pos.x > width - 1) {
      this.pos.x -= width - 1;
      this.pos.x *= -1;
      this.pos.x += width - 1;
      this.vel.x *= -1;
    }
    if (this.pos.y > height - 1 - this.rad) {
      this.pos.y -= height - 1 - this.rad;
      this.pos.y *= -1;
      this.pos.y += height - 1 - this.rad;
      this.vel.y *= -1;
    }
  }

  mouseMoved(mouseX, mouseY) {
    this.isHover =
      (this.pos.x - mouseX) ** 2 + (this.pos.y - mouseY) ** 2 <= this.rad ** 2;
  }
  mousePressed(mouseX, mouseY) {
    if (this.isHover) {
      this.isDragged = true;
      this.movingOffset.set(mouseX - this.pos.x, mouseY - this.pos.y);
    }
  }
  mouseDragged(mouseX, mouseY) {
    if (this.isDragged) {
      this.pos.set(mouseX - this.movingOffset.x, mouseY - this.movingOffset.y);
    }
  }
  mouseReleased() {
    this.isDragged = false;
  }
}
