class Mover {
  constructor(x, y, mass) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.accDisplay = createVector(0, 0);
    this.mass = mass;
    this.radius = sqrt(this.mass) * 10;
    this.isHover = false;
    this.isDragging = false;
    this.movingOffset = createVector();
  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acc.add(f);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0); // 가속도 초기화

    this.checkEdges();
  }

  display() {
    noStroke();
    fill(0);
    if (this.isDragging) {
      fill('#ff0000');
    } else if (this.isHover) {
      fill(127);
    }
    ellipse(this.pos.x, this.pos.y, 2 * this.radius);
  }

  checkEdges() {
    const bounce = -0.9;
    if (this.pos.x < 0 + this.radius) {
      this.pos.x = 0 + this.radius;
      this.vel.x *= bounce;
    } else if (this.pos.x > width - 1 - this.radius) {
      this.pos.x = width - 1 - this.radius;
      this.vel.x *= bounce;
    }
    if (this.pos.y > height - 1 - this.radius) {
      this.pos.y = height - 1 - this.radius;
      this.vel.y *= bounce;
    }
  }

  displayVector() {
    stroke('red');
    line(
      this.pos.x,
      this.pos.y,
      this.pos.x + this.vel.x * 10,
      this.pos.y + this.vel.y * 10
    );
    stroke('lime');
    line(
      this.pos.x,
      this.pos.y,
      this.pos.x + this.accDisplay.x * 100,
      this.pos.y + this.accDisplay.y * 100
    );
  }

  // 마우스가 공 위에 있는지 확인
  isMouseOver() {
    const d = dist(mouseX, mouseY, this.pos.x, this.pos.y);
    return d < this.radius;
  }

  // 마우스 누를 때 호출
  mousePressed() {
    if (this.isMouseOver()) {
      this.isDragging = true;
      this.movingOffset.set(mX - this.pos.x, mY - this.pos.y);
    }
  }

  // 마우스 드래그 중 호출
  mouseDragged() {
    if (this.isDragging) {
      this.pos.x = mouseX + this.movingOffset.x;
      this.pos.y = mouseY + this.movingOffset.y;
    }
  }

  // 마우스 놓을 때 호출
  mouseReleased() {
    this.isDragging = false;
  }
}
