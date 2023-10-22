class Emitter {
  constructor(emittingPosX, emittingPosY) {
    this.emittingPos = createVector(emittingPosX, emittingPosY);
    this.balls = [];
  }

  createBall(emittingPosX, emittingPosY) {
    for (let i = 0; i < 360; i++) {
      this.balls.push(
        new Ball(
          emittingPosX,
          emittingPosY,
          (TAU / 360) * i + random(-PI / 6, PI / 6),
          random(2, 15),
          2,
          random(360),
          100,
          50
        )
      );
    }
  }

  applyGravity(gravity) {
    this.balls.forEach((each) => {
      const scaledG = p5.Vector.mult(gravity, each.mass);
      each.applyForce(scaledG);
    });
  }

  applyForce(force) {
    this.balls.forEach((each) => {
      each.applyForce(force);
    });
  }

  update() {
    // this.balls.forEach((each) => {
    //   each.update();
    // });
    for (let index = this.balls.length - 1; index >= 0; index--) {
      this.balls[index].update();
      if (this.balls[index].isDead()) {
        this.balls.splice(index, 1);
      }
    }
  }

  display() {
    this.balls.forEach((each) => {
      each.display();
    });
  }
}
