class Attractor {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.mass = mass;
  }
  // mover를 받아옴
  attract(mover) {
    let dirVector = p5.Vector.sub(this.pos, mover.pos);
    let distance = dirVector.mag();
    let strength = (this.mass * mover.mass) / distance ** 2;
    return dirVector.setMag(strength);
  }
  display() {
    ellipse(this.pos.x, this.pos.y, 100);
  }
}
