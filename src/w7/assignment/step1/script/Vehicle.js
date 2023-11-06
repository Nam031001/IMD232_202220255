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
    //객체의 반경을 50으로 설정, 해당 반경안에 있는 것들은 내 이웃이라고 판단한다
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
          // 내 위치에서 다른 친구까지의 거리 < 다른객체의 반경
          //즉, 거리가 멀면
          steer.add(each.pos);
          //steer에 다른친구의 위치를 더한다
          cnt++;
          //cnt에 횟수를 하나 더해준다
        }
      }
    });
    if (cnt > 0) {
      //만약 cnt가 0보다 크면
      steer.div(cnt);
      //steer를 cnt로 나눠서 가야하는 지점 도출, 평균을 구한다
      steer.sub(this.pos);
      //steer - 내 위치
      steer.setMag(this.speedMx);
      //speedMx값으로 steer조정, 내 원이 이동할 방향 생성
      steer.sub(this.vel);
      //현 속도를 steer에서 빼고,
      steer.limit(this.forceMx);
      //forceMx값으로 steer을 제한함으로써 내가 가고자하는 위치로 이동시킨다
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
          // distSq < 다른객체의 반경
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
      // 최대속도로 steer의 길이제한
      steer.sub(this.vel);
      //steer에서 현 속도를 빼고
      steer.limit(this.forceMx);
      //forceMx라는 특정값으로 제한함으로써 내가 가고자하는 위치로 이동시킨다
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
      // others의 각 요소들에 반복하여 설정
      if (each !== this) {
        // others에서 본인(객체)은 제외
        const dist = this.pos.dist(each.pos);
        // 상수 dist = this.pos에서 each.pos까지의 거리
        if (dist > 0 && this.rad + each.rad > dist) {
          //dist가 0보다 크고, 내 반지름과 다른 객체의 반지름을 합한
          //값이 dist보다 클 경우 => 충돌한 경우
          const distNormal = dist / (this.rad + each.rad);
          // distNormal = 가장 멀었을 때 1, 겹쳤을 때 0이라는 값이 나옴
          const towardMeVec = p5.Vector.sub(this.pos, each.pos);
          // 충돌한 원이 나에게 오려고 하는 벡터 = 내 위치 - 충돌한 원의 위치
          towardMeVec.setMag(1 / distNormal);
          //towardMeVec의 값을 괄호 안 값으로 제한
          steer.add(towardMeVec);
          //steer에 제한된 towardMeVec를 더하기
          cnt++;
          //ctn에 횟수를 하나 더해준다
        }
      }
    });
    if (cnt > 0) {
      // 만약 cnt가 0보다 크면
      steer.div(cnt);
      // cnt로 steer나누기, 내 원이 이동할 방향이 생성
      steer.setMag(this.speedMx);
      // 최대속도로 steer의 길이제한
      steer.sub(this.vel);
      //steer에서 현 속도를 빼고
      steer.limit(this.forceMx);
      //forceMx라는 특정값으로 제한함으로써 내가 가고자하는 위치로 이동시킨다
    }
    return steer;
    // steer를 반환
  }

  applyForce(force) {
    // 물체에 힘 작용, force를 받아온다
    const forceDivedByMass = p5.Vector.div(force, this.mass);
    // forceDivedByMass에 force에서 질량을 나눈 값을 할당한다
    this.acc.add(forceDivedByMass);
    // 가속도에 forceDivedByMass에를 더한다
  }

  update() {
    // 화면상에 드러나는 요소의 움직임원리 업데이트
    this.vel.add(this.acc);
    // 속도에 가속도 더하기
    this.vel.limit(this.speedMx);
    // 가속도를 최대 스피드로 한정짓는다
    this.pos.add(this.vel);
    // 위치에 속도를 더하기
    this.acc.mult(0);
    // 가속도를 한번 사이클 돌릴때마다 0으로 설정하기
  }

  borderInfinite() {
    // 화면밖으로 나가도 다시 화면안으로 들어오도록 하는 기능
    if (this.pos.x < -infiniteOffset) {
      // 먄약 pos.x가 (-infiniteOffset값)-80보다 작다면
      //= 화면 왼쪽 끝을 벗어난 경우
      this.pos.x = width + infiniteOffset;
      //pos.x를 화면의 오른쪽 끝으로 이동
    } else if (this.pos.x > width + infiniteOffset) {
      // 또는 this.pos.x가 오른쪽 끝을 벗어난 경우
      this.pos.x = -infiniteOffset;
      // this.pos.x를 왼쪽 끝으로 지정한다
    }
    if (this.pos.y < -infiniteOffset) {
      // 먄약 pos.y가 (-infiniteOffset값)-80보다 작다면
      //= 화면 왼쪽 끝을 벗어난 경우
      this.pos.y = height + infiniteOffset;
      //pos.y를 화면의 오른쪽 끝으로 이동
    } else if (this.pos.y > height + infiniteOffset) {
      // 또는 this.pos.y가 오른쪽 끝을 벗어난 경우
      this.pos.y = -infiniteOffset;
      // this.pos.y를 왼쪽 끝으로 지정한다
    }
  }

  display() {
    // 화면상에 표시
    push();
    // 어레이의 끝에 요소 추가 시작
    translate(this.pos.x, this.pos.y);
    // 원점을 pos위치값으로 이동한다
    rotate(this.vel.heading());
    // 마우스쪽으로 화살표의 머리를 돌린다

    noStroke();
    // 선없음
    fill(this.color);
    // 받은 색으로 칠한다
    beginShape();
    // 도형정의 시작, 아래 정의된 지점을 전부 잇는다
    vertex(this.rad, 0);
    // 받아온 반지름값, 0 지점
    vertex(this.rad * cos(radians(-135)), this.rad * sin(radians(-135)));
    //-135도로 특정한 거리(rad)만큼 떨어진 좌표 x,y
    vertex(0, 0);
    // 원점
    vertex(this.rad * cos(radians(135)), this.rad * sin(radians(135)));
    //135도로 특정한 거리 (rad)만큼 떨어진 좌표 x,y
    endShape(CLOSE);
    // 도형선언을 완료한다
    pop();
    // 요소 추가 끝, 어레이의 마지막 요소를 제거, 반환한다.
  }
}
