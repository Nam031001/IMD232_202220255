class Emitter {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.particles = [];
  }

  addParticle() {
    // 길이 1짜리 방향이 랜덤한 위치가 설정
    const randomLoc = p5.Vector.random2D();
    // 길이에 랜덤함부여
    randomLoc.mult(random(0.5, 2));
    randomLoc.add(this.pos);
    this.particles.push(
      new Particle(randomLoc.x, randomLoc.y, 1, 15, random(120, 720))
    );
  }

  applyForce(force) {
    this.particles.forEach((eachParticle) => {
      eachParticle.applyForce(force);
    });
  }

  update() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      // 걍 별뜻 없음, this.paricles가 길어서 eachparticl로 할당
      const eachParticle = this.particles[i];
      eachParticle.update();
      if (eachParticle.isDead()) {
        this.particles.splice(i, 1);
      }
    }
  }

  display() {
    this.particles.forEach((eachParticle) => {
      eachParticle.display();
    });
  }
}
