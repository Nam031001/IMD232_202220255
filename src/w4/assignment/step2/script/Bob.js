// 마우스올리면 색변하고 드래그할수 있는 검은 공

class Bob {
  constructor(x, y, mass, rad) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.mass = mass;
    this.rad = rad;
    this.isHover = false;
    this.isDragging = false;
    this.movingOffset = createVector();
  }

  applyForce(force) {
    const acc = p5.Vector.div(force, this.mass);
    this.acc.add(acc);
  }
  update() {
    this.vel.mult(0.98);
    // 속력대비 0.9만큼씩을 매번 곱하라
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  display() {
    noStroke();
    fill(0);
    if (this.isDragging) {
      fill('#ff0000');
    } else if (this.isHover) {
      fill(127);
    } else {
      fill(0);
    }
    ellipse(this.pos.x, this.pos.y, 2 * this.rad);
  }

  mouseMoved(mX, mY) {
    this.isHover =
      (this.pos.x - mX) ** 2 + (this.pos.y - mY) ** 2 <= this.rad ** 2;
  }

  mousePressed(mX, mY) {
    if (this.isHover) {
      this.isDragging = true;
      this.movingOffset.set(mX - this.pos.x, mY - this.pos.y);
    }
  }
  mouseDragged(mX, mY) {
    if (this.isDragging) {
      this.pos.set(mX - this.movingOffset.x, mY - this.movingOffset.y);
    }
    //isDragging이 참일때 pos를 현 마우스 좌표에서 원의 좌표값을 뺀값을 위치로 지정한다
  }

  mouseReleased() {
    this.isDragging = false;
  }
}
