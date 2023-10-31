class Vehicle {
  //Vehicle클래스 설정시작
  constructor(x, y, mass, rad, speedMx, forceMx, color) {
    // class 설정시작, 받아올 값으로 괄호안의 내용을 선정
    this.pos = createVector(x, y);
    // 위치 벡터화, 초기값 x,y
    this.vel = p5.Vector.random2D();
    // 속도에 랜덤방향으로 1짜리 벡터를 생성, 일정 속도를 낸다
    this.acc = createVector();
    // 가속도 벡터화
    this.mass = mass;
    // 질랑은 받아온다
    this.rad = rad;
    // 반지름은 받아온다
    this.speedMx = speedMx;
    // 최대 스피드는 받아온다
    this.forceMx = forceMx;
    // 힘의 최대크기는 받아온다
    this.neighborhooodRad = 50;
    //객체의 반경반지름을 50으로 설정
    this.color = color;
    // 색은 받아온다
  }

  cohesion(others) {
    // cohesion함수 설정, 다른 객체를 받아온다(others)
    let cnt = 0;
    // cnt라는 변수 설정, 0할당
    const steer = createVector(0, 0);
    // steer라는 상수 선언, 벡터화한다, 초기값 0,0
    others.forEach((each) => {
      // others의 각 요소들에 설정
      if (each !== this) {
        // others에서 본인(객체)은 제외
        const distSq =
          // 상수 distSq는
          (this.pos.x - each.pos.x) ** 2 + (this.pos.y - each.pos.y) ** 2;
        // 내 위치에서 다른 친구까지의 거리
        if (distSq < this.neighborhooodRad ** 2) {
          // dist < 다른객체의 반경
          steer.add(each.pos);
          //steer에 다른친구의 위치를 더한다
          cnt++;
          //   ctn에 횟수를 하나 더해준다
        }
      }
    });
    if (cnt > 0) {
      steer.div(cnt);
      // 가야하는 지점 도출
      steer.sub(this.pos);
      //   가야하는 지점 - 내 위치 => 해당 지점으로 이동
      steer.setMag(this.speedMx);
      //   내 원이 이동할 방향 생성
      steer.sub(this.vel);
      //현 속도를 빼고,
      steer.limit(this.forceMx);
      //   특정값으로 제한함으로써 내가 가고자하는 위치로 이동시킨다
    }
    return steer;
    //steer값을 반환한다
  }

  align(others) {
    // align함수 설정, 다른 객체를 받아온다(others)
    let cnt = 0;
    // cnt라는 변수 설정, 0할당
    const steer = createVector(0, 0);
    // steer라는 상수 선언, 벡터화한다, 초기값 0,0
    others.forEach((each) => {
      // others의 각 요소들에 설정
      if (each !== this) {
        // others에서 본인(객체)은 제외
        const distSq =
          // 상수 distSq는
          (this.pos.x - each.pos.x) ** 2 + (this.pos.y - each.pos.y) ** 2;
        // 내 위치에서 다른 친구까지의 거리
        if (distSq < this.neighborhooodRad ** 2) {
          // dist < 다른객체의 반경
          steer.add(each.vel);
          //steer에 다른친구의 속도를 더한다
          cnt++;
          //   ctn에 횟수를 하나 더해준다
        }
      }
    });
    if (cnt > 0) {
      // cnt가 한번이상 추가됐을 때
      steer.div(cnt);
      // cnt로 steer나누기, 내 원이 이동할 방향이 생성
      steer.setMag(this.speedMx);
      // 최대속도로 길이제한
      steer.sub(this.vel);
      //현 속도를 빼고
      steer.limit(this.forceMx);
      //   특정값으로 제한함으로써 내가 가고자하는 위치로 이동시킨다
    }
    return steer;
    //steer값을 반환한다
  }

  separate(others) {
    // separate함수 설정, 다른 객체를 받아온다(others)
    let cnt = 0;
    // cnt라는 변수 설정, 0할당
    const steer = createVector(0, 0);
    // steer라는 상수 선언, 벡터화한다, 초기값 0,0
    others.forEach((each) => {
      // others의 각 요소들에 설정
      if (each !== this) {
        // others에서 본인(객체)은 제외
        const dist = this.pos.dist(each.pos);
        // 상수 dist = this.pos에서 each.pos까지의 거리
        if (dist > 0 && this.rad + each.rad > dist) {
          // 충돌한 경우
          const distNormal = dist / (this.rad + each.rad);
          // distNormal = 가장 멀었을 때 1, 겹쳤을 때 0이라는 값이 나옴
          const towardMeVec = p5.Vector.sub(this.pos, each.pos);
          // 충돌한 원이 나에게 오려고 하는 벡터 = 내 위치 - 충돌한 원의 위치
          towardMeVec.setMag(1 / distNormal);
          //towardMeVec의 값을 괄호 안 값으로 제한
          steer.add(towardMeVec);
          //   steer에 제한된 towardMeVec를 더하기
          cnt++;
          //   ctn에 횟수를 하나 더해준다
        }
      }
    });
    if (cnt > 0) {
      steer.div(cnt);
      // 가야하는 지점 도출
      steer.setMag(this.speedMx);
      //   내 원이 이동할 방향 생성
      steer.sub(this.vel);
      //현 속도를 빼고,
      steer.limit(this.forceMx);
      //   특정값으로 제한함으로써 내가 가고자하는 위치로 이동시킨다
    }
    return steer;
    // steer를 반환
  }

  applyForce(force) {
    const forceDivedByMass = p5.Vector.div(force, this.mass);
    this.acc.add(forceDivedByMass);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.speedMx);
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
    vertex(0, 0);
    vertex(this.rad * cos(radians(135)), this.rad * sin(radians(135)));
    endShape(CLOSE);
    // noFill();
    // stroke(0, 0, 60);
    // ellipse(0, 0, 2 * this.rad);
    // stroke(0, 0, 80);
    // ellipse(0, 0, 2 * this.neighborhooodRad);
    pop();
  }
}
