let traffic;
// traffic 변수 설정
let infiniteOffset = 80;
//infiniteOffset라는 변수값을 80으로 설정

function setup() {
  //아래 설정들을 총합 한번만 설정
  setCanvasContainer('canvas', 3, 2, true);
  //캔버스 생성(3대2 비율유지)
  colorMode(HSL, 360, 100, 100, 100);
  //칼라모드를 hsl로 변경
  background('white');
  //배경색 흰색
  traffic = new Traffic();
  //traffic이라는 변수에 Traffic 클래스를 선언
  for (let n = 0; n < 10; n++) {
    //n은 0이고 10보다 같거나 커질때까지 1씩 더해준다,
    // 해당 범위동안은 아래 식을 반복한다
    traffic.addVehicle(random(width), random(height));
    //traffic의 addVehicle을 호출, 초기값을 width의 랜덤값, height의 랜덤값으로 잡는다
  }
}

function draw() {
  //아래 설정들을 계속 반복
  background('white');
  //배경색 흰색
  traffic.run();
  //traffic의 run함수 호출
}

function mouseDragged() {
  //마우스를 드래그할 때
  traffic.addVehicle(mouseX, mouseY);
  //traffic의 addVehicle을 호출, 초기값을 mouse위치로 잡는다
}
