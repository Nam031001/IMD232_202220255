class Traffic {
  // Traffic 클래스 만들기 시작
  constructor() {
    // 안에 들어갈 변수설정
    this.vehicles = [];
    // vehicles 어레이화, 많은 차량들 생성
  }

  run() {
    // run함수 생성, separate, align, cohesion의 기능을 구현한다
    this.vehicles.forEach((eachVehicle) => {
      // this.vehicles속 각 요소들에 아래 명령들을 반복한다.
      const separate = eachVehicle.separate(this.vehicles);
      // separate 계산 = 각 요소간 일정 거리를 유지하려는 값
      separate.mult(1);
      //separate를 1로 설정
      eachVehicle.applyForce(separate);
      // eachVehicle에 seperate의 힘을 적용햔 applyForce실행
      const align = eachVehicle.align(this.vehicles);
      // align 계산 = 주변 요소들의 방향의 평균값대로 움직이려는 값
      align.mult(0.5);
      // align을 0.5로 설정
      eachVehicle.applyForce(align);
      // eachVehicle의 align힘을 적용햔 applyForce실행
      const cohesion = eachVehicle.cohesion(this.vehicles);
      // cohesion 계산= 같은무리가 된 요소들이 서로 떨어지지 않으려 하는 값
      cohesion.mult(0.5);
      // cohesion값을 0.5로 설정
      eachVehicle.applyForce(cohesion);
      // eachVehicle의 cohesion힘을 적용햔 applyForce실행
      eachVehicle.update();
      // eachVehicle를 update하기
      eachVehicle.borderInfinite();
      // eachVehicle의 borderInfinite불러오기
      eachVehicle.display();
      // eachVehicle의 display불러오기(화면에 표시)
    });
  }

  addVehicle(x, y) {
    // addVehicle함수생성, 초기값 x,y 받아오도록 한다
    const mass = 1;
    // 질량 = 1
    this.vehicles.push(
      // vehicles어레이에 아래 내용을 추가한다
      new Vehicle(
        // 새로운 Vehicle클래스의 x, y, mass, rad, speedMx, forceMx, color에 차례대로 아래 내용을 삽입
        x,
        // x값
        y,
        // y값
        mass,
        // 질량
        mass * 12,
        // 질량 곱하기 12
        5,
        // 5
        0.1,
        // 0.1
        color(random(360), 100, 50, 40)
        // 색조 랜덤, 채도 100, 밝기 50, 투명도 40
      )
    );
  }
}
