class Vehicle {
  constructor(x, y, rad, speedMx, forceMx, color) {
    this.pos = createVector(x, y);
    // this.vel = createVector();
    this.vel = p5.Vector.random2D();
    this.acc = createVector();
    this.mass = 1;
    this.rad = rad;
    this.speedMx = speedMx;
    this.color = color;
    this.forceMx = forceMx;
  }
  // separation - 내 영역에 다른 객체가 들어올 경우 들어온 만큼 떨어지려 한다
  //두원의 반지름을 합한 길이보다 현재 길이가 짧을 시 => 영역에 들어온 것으로 판명
  separate(others) {
    let cnt = 0;
    let steer = createVector(0, 0);
    others.forEach((eachOther) => {
      // 나의 위치와 다른 친구의 거리를 계산
      let dist = this.pos.dist(eachOther.pos);
      // 나와 다른 원이 충돌해있는 경우
      if (dist > 0 && dist <= eachOther.rad + this.rad) {
        // 투워드미벡터를 거리로 나눗셈하기, 나에게 얼마나 영향을 미치는 지를 판단, 해당 경우 계산하기
        let towardMeVec = p5.Vector.sub(this.pos, eachOther.pos);
        towardMeVec.setMag(1 / dist);
        steer.add(towardMeVec);
        // 계산한 경우 횟수를 더해주라
        cnt++;
      }
    });
    // 해당 계산을 한 경우
    if (cnt > 0) {
      // 최대속도로 이동하라
      steer.div(cnt);
      steer.setMag(this.speedMx);
      // 내 현재 가속도를 뺴주고 힘을 한정
      steer.sub(this.vel);
      steer.limit(this.forceMx);
    }
    return steer;
  }

  borderInfinite() {
    if (this.pos.x < -20) {
      this.pos.x = width + 20;
    } else if (this.pos.x > width + 20) {
      this.pos.x = -20;
    }
    if (this.pos.y < -20) {
      this.pos.y = height + 20;
    } else if (this.pos.y > height + 20) {
      this.pos.y = -20;
    }
  }

  seek(target) {
    let desired = p5.Vector.sub(target, this.pos);
    // desired velocity의 타겟까지의 전체 회색선
    // desired.mult(this.speedMx)
    desired.setMag(this.speedMx);
    let steering = p5.Vector.sub(desired, this.vel);
    if (debug) {
      push();
      translate(this.pos.x, this.pos.y);
      noFill();
      stroke(127);
      line(0, 0, desired.x * 10, desired.y * 10);
      stroke(0, 0, 255);
      line(0, 0, steering.x * 10, steering.y * 10);
      pop();
    }
    steering.limit(this.forceMx);
    this.applyForce(steering);
  }

  applyForce(force) {
    let calcedAcc = p5.Vector.div(force, this.mass);
    this.acc.add(calcedAcc);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.speedMx);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  display() {
    let angle = this.vel.heading();
    push();
    translate(this.pos.x, this.pos.y);
    rotate(angle);
    noStroke();
    fill(this.color);
    beginShape();
    vertex(this.rad, 0);
    vertex(this.rad * cos(radians(-135)), this.rad * sin(radians(-135)));
    vertex(0, 0);
    vertex(this.rad * cos(radians(135)), this.rad * sin(radians(135)));
    endShape(CLOSE);
    pop();
  }
}
