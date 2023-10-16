// step2에서 진행했던 공을 뿜어내는 코드를
// 깔끔하게 정리

class Emitter {
  constructor(x, y) {
    this.particles = [];
    this.pos = createVector(x, y);
  }

  addParticle() {
    this.particles.push(new Particle(this.pos.x, this.pos.y));
  }

  update(gravity) {
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].applyForce(gravity);
      this.particles[i].update();
      this.particles[i].display();
    }
  }

  display() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].display();
      if (this.particles[i].isDead()) {
        this.particles.splice(i, 1);
      }
    }
  }
}
