class Pendulum {
  // 진자의 각도
  // 진자의 각도에 대한 속도
  // 진자의 각도에 대한 가속도
  // 진자의 중심점
  // 진자의 길이
  // 진자의 반지름

  constructor(x, y, rad, angle, ballRad) {
    this.angle = angle; // 진자의 각도
    this.angleVel = 0; // 진자의 각도에 대한 속도
    this.angleAcc = 0; // 진자의 각도에 대한 가속도
    this.pos = createVector(x, y); // 진자의 중심점
    this.rad = rad; // 진자의 길이
    this.ballPos = createVector(x, y); //회색공의 중심
    this.ballPos.add(cos(this.angle) * this.rad, sin(this.angle) * this.rad);
    //회색공의 위치 : 진자의 길이만큼 떨어져있도록

    this.ballRad = ballRad; // 공의 반지름

    this.movingOffset = createVector(); //클릭해서 이동을 위해선 있어야한다.
    this.isHover = false;
    this.isDragging = false;
  }

  applyForce(force) {
    this.angleAcc = (sin(this.angle - (TAU / 360) * 90) * -force.y) / this.rad;
    // 진자의 각도(힘) = sin(angle) * g / rad 사용
    // 90도를 기준으로 왔다갔다 하도록 => (TAU / 360) * 90
    // force가 벡터가 아니기 때문에 y값만 빼서 받아와야 한다.
  }

  update() {
    if (!this.isDragging) {
      this.angleVel *= 0.999; //점점 속도가 줄어들도록 함
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
    fill(127);
    ellipse(this.pos.x, this.pos.y, 20);
    if (this.isDragging) {
      fill('#ff0000');
    } else if (this.isHover) {
      fill(127);
    } else {
      fill(191);
    }
    ellipse(this.ballPos.x, this.ballPos.y, 2 * this.ballRad);
    stroke(0);
    noFill();
    line(this.pos.x, this.pos.y, this.ballPos.x, this.ballPos.y);
  }

  mouseMoved(mX, mY) {
    this.isHover =
      (this.ballPos.x - mX) ** 2 + (this.ballPos.y - mY) ** 2 <=
      this.ballRad ** 2;
  }

  mousePressed(mX, mY) {
    if (this.isHover) {
      this.isDragging = true;
      this.movingOffset.set(mX - this.ballPos.x, mY - this.ballPos.y);
    }
  }

  mouseDragged(mX, mY) {
    //공의 위치를 직접 우리가 조정하는게 아니라, 해당 각도만 우리가 조정해주는 식으로 해야 오류가 일어나지않는다.
    //공의 위치는 이미 update에서 설정이 되고 있기 때문
    if (this.isDragging) {
      const ballShouldBe = createVector(
        mX - this.movingOffset.x,
        mY - this.movingOffset.y
        // 공이 원래 있어야하는 위치 = 마우스 - this.movingOffset
      );
      const angle = atan2(
        ballShouldBe.y - this.pos.y,
        ballShouldBe.x - this.pos.x
        //공이 향하고자 하는 pos로 방향을 돌린다.
        //진자의 중심쪽으로 향하는 공
      );
      this.angle = angle;
    }
  }

  mouseReleased() {
    this.isDragging = false;
  }
}
