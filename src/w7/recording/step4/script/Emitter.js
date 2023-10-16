// step2에서 진행했던 공을 뿜어내는 코드를
// 깔끔하게 정리

class Emitter {
  constructor(x, y) {
    this.particles = [];
    this.pos = createVector(x, y);
  }

  addParticle() {
    this.particles.push(
      new Particle(this.pos.x, this.pos.y, random(1, 16), random(180, 300))
    );
    // lifespan => 60프레임이므로 3초부터 5초사이에 살아있도록
  }

  // 들어오는 힘은 곱해서 작동해야 하기때문에 따로 뺌
  applyGravity(gravity) {
    // eachParticle이 각각의 파티클을 다 적용해줌?
    for (let eachParticle of this.particles) {
      const force = p5.Vector.mult(gravity, eachParticle.mass);
      eachParticle.applyForce(force);
    }
  }

  // 각각의 파티클들의 위치대비 계산이 필요해서
  applyRepeller(repeller) {
    // ()=>{} 는 function() {}
    this.particles.forEach((eachParticle) => {
      const force = repeller.repel(eachParticle);
      eachParticle.applyForce(force);
    });
  }

  update(gravity) {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].update();
      if (this.particles[i].isDead()) {
        this.particles.splice(i, 1);
      }
    }
  }

  display() {
    // for (let i = this.particles.length - 1; i >= 0; i--) {
    //   this.particles[i].display();
    this.particles.forEach((eachParticle) => {
      eachParticle.display();
    });
  }
}
