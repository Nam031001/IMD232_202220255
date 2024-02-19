class Pendulum {
  constructor(x, y, rad, ballRad, angle) {
    this.angle = angle; // 진자의 각도
    this.angleVel = 0; // ''각도의 속도
    this.angleAcc = 0; // ''가속도
    this.rad = rad; // ''길이
    this.pos = createVector(x, y); //진자의 위치
    this.ballPos = createVector(x, y); // 공의 위치
    this.ballPos.add(cos(this.angle) * this.rad, sin(this.angle) * this.rad);
    this.ballRad = ballRad; // 공의 반지름

    this.isHover = false;
    this.isDragged = false;
    this.movingOffset = createVector();
  }

  applyForce(force) {
    this.angleAcc = (sin(this.angle - (TAU / 360) * 90) * -force.y) / this.rad;
  }

  update() {
    if (!this.isDragged) {
      this.angleVel *= 0.999;
      this.angleVel += this.angleAcc;
      this.angle += this.angleVel;
    }

    this.ballPos.set(
      cos(this.angle) * this.rad + this.pos.x,
      sin(this.angle) * this.rad + this.pos.y
    );
  }

  display() {
    noStroke();
    fill('gray');
    ellipse(this.pos.x, this.pos.y, 20);

    if (this.isDragged) {
      fill('red');
    } else if (this.isHover) {
      fill('grey');
    } else {
      fill('black');
    }

    ellipse(this.ballPos.x, this.ballPos.y, this.ballRad * 2);
    stroke(0);
    line(this.pos.x, this.pos.y, this.ballPos.x, this.ballPos.y);
  }

  mouseMoved(mouseX, mouseY) {
    this.isHover =
      (this.ballPos.x - mouseX) ** 2 + (this.ballPos.y - mouseY) ** 2 <=
      this.ballRad ** 2;
  }
  mousePressed(mouseX, mouseY) {
    if (this.isHover) {
      this.isDragged = true;
      this.angleAcc = 0;
      this.angleVel = 0;
      this.movingOffset.set(mouseX - this.ballPos.x, mouseY - this.ballPos.y);
    }
  }
  mouseDragged(mouseX, mouseY) {
    if (this.isDragged) {
      const beShouldPos = createVector(
        mouseX - this.movingOffset.x,
        mouseY - this.movingOffset.y
      );
      const angle = atan2(
        beShouldPos.y - this.pos.y,
        beShouldPos.x - this.pos.x
      );
      this.angle = angle;
    }
  }
  mouseReleased() {
    this.isDragged = false;
  }
  merge(pendulum) {
    this.pos.set(pendulum.ballPos);
  }
}
