class Vehicle {
  constructor(x, y, mass, rad, speedMax, forceMx, color) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.acc = createVector();
    this.mass = mass;
    this.rad = rad;
    this.speedMax = speedMax;
    this.forceMx = forceMx;
    this.neighborhoodRad = 50;
    this.color = color;
  }

  cohesion(others) {
    let cnt = 0;
    const steer = createVector(0, 0);

    others.forEach((each) => {
      if (each !== this) {
        const distSq =
          // 내 위치에서 다른 친구와의 거리 = distSq
          (this.pos.x - each.pos.x) ** 2 + (this.pos.y - each.pos.y) ** 2;
        if (distSq < this.neighborhoodRad ** 2) {
          steer.add(each.pos);
          cnt++;
        }
      }
    });
    if (cnt > 0) {
      // 가야하는 지점 도출
      steer.div(cnt);
      // 가야하는 지점 - 내 위치 => 해당지점으로 이동
      steer.sub(this.pos);
      // 내 원이 이동할 방향이 생성
      steer.setMag(this.speedMax);

      //현 속도를 빼고 특정값으로 제한함으로써 내가 가고자하는 위치로 이동시킨다
      steer.sub(this.vel);
      steer.limit(this.forceMx);
    }
    return steer;
  }

  align(others) {
    let cnt = 0;
    const steer = createVector(0, 0);
    others.forEach((each) => {
      if (each !== this) {
        const distSq =
          // 내 위치에서 다른 친구와의 거리 = distSq
          (this.pos.x - each.pos.x) ** 2 + (this.pos.y - each.pos.y) ** 2;
        // dist < 다른객체의 반경
        if (distSq < this.neighborhoodRad ** 2) {
          steer.add(each.vel);
          //노멀라이즈
          // steer.add(p5.Vector.normalize(each.vel));
          cnt++;
        }
      }
    });
    if (cnt > 0) {
      // 내 원이 이동할 방향이 생성
      steer.div(cnt);
      // 길이제한
      steer.setMag(this.speedMax);

      //현 속도를 빼고 특정값으로 제한함으로써 내가 가고자하는 위치로 이동시킨다
      steer.sub(this.vel);
      steer.limit(this.forceMx);
    }
    return steer;
  }

  separate(others) {
    let cnt = 0;
    const steer = createVector(0, 0);
    others.forEach((each) => {
      // 나는 뺴고 계산/ each에서 나 자신을 빼고 나 외의 모든 친구들을 할당한다

      if (each !== this) {
        //거리 = this.pos에서 each.pos까지의 거리
        const dist = this.pos.dist(each.pos);

        // 충돌한 경우
        if (dist > 0 && this.rad + each.rad > dist) {
          // distNormal = 가장 멀었을 때 1, 겹쳤을 때 0이라는 값이 나옴
          const distNormal = dist / (this.rad + each.rad);

          // 충돌한 원이 나에게 오려고 하는 벡터 = 내 위치 - 충돌한원의 위치
          const towardMeVec = p5.Vector.sub(this.pos, each.pos);
          towardMeVec.setMag(1 / distNormal);
          steer.add(towardMeVec);
          cnt++;
        }
      }
    });
    // 위의 서클이 한번 이상 돌려진 경우
    if (cnt > 0) {
      steer.div(cnt);

      // 내 원이 이동할 방향이 생성
      steer.setMag(this.speedMax);

      //현 속도를 빼고 특정값으로 제한함으로써 내가 가고자하는 위치로 이동시킨다
      steer.sub(this.vel);
      steer.limit(this.forceMx);
    }
    return steer;
  }

  applyForce(force) {
    const forceDivedByMass = p5.Vector.div(force, this.mass);
    this.acc.add(forceDivedByMass);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.speedMax);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  borderInfinite() {
    if (this.pos.x < -infiniteOffset) {
      this.pos.x = width + infiniteOffset;
    } else if (this.pos.x > width + infiniteOffset) {
      this.pos.x = -infiniteOffset;
    }
    if (this.pos.y < -infiniteOffset) {
      this.pos.y = height + infiniteOffset;
    } else if (this.pos.y > height + infiniteOffset) {
      this.pos.y = -infiniteOffset;
    }
  }

  display() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    noStroke();
    fill(this.color);
    beginShape();
    vertex(this.rad, 0);
    vertex(this.rad * cos(radians(-135)), this.rad * sin(radians(-135)));
    //임의의 방향a로 특정한 거리 r만큼 떨어진 좌표 x,y를 찍으려면
    // x = cos(a) * r
    // y = sin(a) * r
    vertex(0, 0);
    vertex(this.rad * cos(radians(135)), this.rad * sin(radians(135)));
    endShape(CLOSE);
    // noFill();
    // stroke(0, 0, 60);
    // ellipse(0, 0, 2 * this.rad);
    // stroke(0, 0, 80);
    // ellipse(0, 0, 2 * this.neighborhoodRad);
    pop();
  }
}
