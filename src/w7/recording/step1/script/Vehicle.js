// W7 Seeking a Target 29초부터 원리 설명

class Vehicle {
  constructor(x, y, mass, rad, speedMx, forceMx) {
    this.pos = createVector(x, y);
    this.vel = createVector();
    this.acc = createVector();
    this.mass = mass;
    this.rad = rad;
    // 아이콘의 최고속도
    this.speedMx = speedMx;
    // 적용될 수 있는 힘의 최대치
    this.forceMx = forceMx;
  }

  applyForce(force) {
    const acc = p5.Vector.div(force, this.mass);
    this.acc.add(acc);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.speedMx);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  display() {
    // const headingAngle = atan2(this.vel.y, this.vel.x);
    // headingAngle이라는 상수값에 vel의 y에서 x까지의 각도를 구한 값을 할당함
    const headingAngle = this.vel.heading();
    push();
    // push, pop=> translate를 사용시 오류 방지
    translate(this.pos.x, this.pos.y);
    // 아이콘이 마우스 방향으로 화살표를 돌리게 회전
    rotate(headingAngle);
    fill(0);
    noStroke();
    beginShape();
    vertex(this.rad, 0);
    vertex(
      //   this.rad * cos((TAU / 360) * -135)
      this.rad * cos(radians(-135)),
      //   this.rad * sin((TAU / 360) * -135)
      this.rad * sin(radians(-135))
    );
    vertex(0, 0);
    vertex(
      //   this.rad * cos((TAU / 360) * 135)
      this.rad * cos(radians(135)),
      //   this.rad * sin((TAU / 360) * 135)
      this.rad * sin(radians(135))
    );
    endShape(CLOSE);
    noFill();
    stroke('red');
    ellipse(0, 0, 2 * this.rad);
    // beginShape로 열고 vertex의 괄호안에 좌표를 넣고 endShape에서 닫아주면 해당좌표를 이은 도형을 만든다
    pop();
  }

  //   공을 쫓아옴
  seek(target) {
    // 타겟에서 내 위치까지의 거리
    const desiredVelocity = p5.Vector.sub(target, this.pos);
    // 속도를 일정속도 이하로 제한시킨다
    desiredVelocity.setMag(this.speedMx);
    // 아이콘의 머리가 자연스럽게 꺾이도록 조정
    const steer = p5.Vector.sub(desiredVelocity, this.vel);
    steer.limit(this.forceMx);
    this.applyForce(steer);
    // this.vel.set(desiredVelocity);
  }
}
