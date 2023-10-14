class Mover {
  constructor(x, y, mass) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.accDisplay = createVector(0, 0);
    this.mass = mass;
    // mass = 질량
    this.radius = this.mass ** 0.5 * 20;

    this.isHover = false;
    this.isDragging = false;
    this.movingOffset = createVector();
    this.mVec = createVector(x, y);
    this.pMVec = createVector(this.pMouseX, this.pMouseY);
  }

  chkIsHover(x, y) {
    const distSq = (this.pos.x - x) ** 2 + (this.pos.y - y) ** 2;
    this.isHover = distSq <= rad ** 2;
  }

  applyForce(force) {
    let forceDividedByMass = createVector(force.x, force.y);
    forceDividedByMass.div(this.mass);
    this.acc.add(forceDividedByMass);
  }

  applyPower() {
    this.power = p5.Vector.sub(this.mVec, this.pMVec);
    this.power.mult(0.0001);
    this.pos.add(this.power);
  }

  // 위치 업데이트
  update() {
    if (!this.isDragging) {
      // 드래그 중이 아닐 때만 중력 적용
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.accDisplay.set(this.acc);
      this.acc.mult(0);
    }
  }
  contactEdge() {
    if (this.pos.y >= height - 1 - this.radius - 1) {
      return true;
    } else {
      return false;
    }
  }

  //   통통튀기기
  checkEdges() {
    const bounce = -0.5;
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

  mouseMoved(mX, mY) {
    this.chkIsHover(mX, mY);
  }

  mousePressed(mX, mY) {
    if (this.isHover) {
      this.isDragging = true;
      this.movingOffset.set(mX - this.pos.x, mY - this.pos.y);
    }
  }
  mouseDragged(mX, mY) {
    if (this.isDragging) {
      const mVec = createVector(mX, mY);
      const pMVec = createVector(this.pMouseX, this.pMouseY);
      const force = p5.Vector.sub(mVec, pMVec);

      // 힘을 적용
      // this.applyForce(force);

      // 이전 프레임의 마우스 위치 업데이트
      this.pMouseX = mX;
      this.pMouseY = mY;

      // 공의 위치 업데이트
      this.pos.set(mX - this.movingOffset.x, mY - this.movingOffset.y);
    }
  }
  mouseReleased() {
    this.isDragging = false;

    // 중력 적용
    let gravityA = createVector(gravity.x, gravity.y);
    gravityA.mult(this.mass);
    this.applyForce(gravityA);
  }
}
