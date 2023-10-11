class Repeller {
  constructor(x, y, power) {
    this.pos = createVector(x, y);
    this.power = power;
    this.rad = 25;
    this.draggingOffset = createVector(0, 0);
    this.isHover = false;
    this.isDragging = false;
  }

  repel(particle) {
    // 밀어내는방향, 파티클쪽으로 향하는 벡터
    const force = p5.Vector.sub(particle.pos, this.pos);
    // distance를 단위벡터로 변환
    const distance = force.mag();
    // 파워의 거리에 반비례
    let strength = this.power / distance ** 2;
    force.setMag(strength);
    return force;
  }

  display() {
    noStroke();
    fill('blue');
    ellipse(this.pos.x, this.pos.y, 2 * this.rad);
  }

  mouseMoved(mX, mY) {
    // <= this.rad의 제곱상태보다 작으면
    this.isHover =
      (this.pos.x - mX) ** 2 + (this.pos.y - mY) ** 2 <= this.rad ** 2;
  }

  mousePressed(mX, mY) {
    if (this.isHover) {
      this.draggingOffset.set(mX - this.pos.x, mY - this.pos.y);
      this.isDragging = true;
    }
  }
  mouseDragged(mX, mY) {
    if (this.isDragging) {
      this.pos.set(mX - this.draggingOffset.x, mY - this.draggingOffset.y);
    }
  }

  mouseReleased() {
    this.isDragging = false;
  }
}
