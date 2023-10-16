class Mover {
  constructor(x, y, mass) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.mass = mass;
    // mass = 질량
    this.radius = this.mass ** 0.5 * 20;
    this.accDisplay = createVector(0, 0);

    this.isHover = false;
    this.isDragging = false;
    this.draggingOffset = false;
    this.movingOffset = createVector();
    // this.mVec = createVector(x, y);
    // this.pMVec = createVector(this.pMouseX, this.pMouseY);
  }

  chkHover(x, y) {
    const distSq = (this.pos.x - x) ** 2 + (this.pos.y - y) ** 2;
    this.isHover = distSq <= this.radius ** 2;
  }

  applyForce(force) {
    let forceDividedByMass = createVector(force.x, force.y);
    forceDividedByMass.div(this.mass);
    this.acc.add(forceDividedByMass);
  }
  // 위치 업데이트
  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.accDisplay.set(this.acc);
    this.acc.mult(0);
  }

  checkEdges() {
    const bounce = -0.7;
    if (this.pos.x < 0 + this.radius) {
      this.pos.x -= 0 + this.radius;
      this.pos.x *= -1;
      this.pos.x += 0 + this.radius;
      this.vel.x *= bounce;
    } else if (this.pos.x > width - 1 - this.radius) {
      this.pos.x -= width - 1 - this.radius;
      this.pos.x *= -1;
      this.pos.x += width - 1 - this.radius;
      this.vel.x *= bounce;
    }
    if (this.pos.y > height - 1 - this.radius) {
      this.pos.y -= height - 1 - this.radius;
      this.pos.y *= -1;
      this.pos.y += height - 1 - this.radius;
      this.vel.y *= bounce;
    }
  }

  display() {
    noStroke();
    if (this.isHover) {
      fill(90, 80, 50);
    } else {
      fill(90, 60, 50);
    }
    ellipse(this.pos.x, this.pos.y, 2 * this.radius);
  }

  contactEdge() {
    if (this.pos.y >= height - 1 - this.radius - 1) {
      return true;
    } else {
      return false;
    }
  }

  mouseMoved(mX, mY) {
    this.chkHover(mX, mY);
  }

  mousePressed(mX, mY) {
    if (this.isHover) {
      this.isDragging = true;
      this.movingOffset(mX - this.pos.x, mY - this.pos.y);
    }
  }
  mouseDragged(mX, mY) {
    if (this.isDragging) {
      this.pos.set(mX - this.movingOffset.x, mY - this.movingOffset.y);
    }
  }

  mouseReleased() {
    this.isDragging = false;
  }
}
