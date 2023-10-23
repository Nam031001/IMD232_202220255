class Emitter {
  constructor(emittingPosX, emittingPosY) {
    this.emittingPos = createVector(emittingPosX, emittingPosY);
    this.balls = [];
  }

  createBall(emittingPosX, emittingPosY) {
    for (let i = 0; i < 360; i++) {
      const angle = (TAU / 360) * i;
      const distance = random(2, 15);
      const x = emittingPosX + cos(angle) * distance;
      const y = emittingPosY + sin(angle) * distance;

      this.balls.push(new Ball(x, y, angle, 2, 2, random(360), 100, 50));
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

function mouseClicked() {
  // 마우스 클릭 지점을 중심으로 원 모양으로 파티클을 생성합니다.
  emitter.createBall(mouseX, mouseY);
}
