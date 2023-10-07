// let aMover;
let movers = [];
// movers라는 변수에 어레이개념을 집어넣음, 따라서 괄호도 {}가 아닌[]를 사용
const moversNum = 1000;
// movers의 갯수를 정해준다
let mVec;
// =>마우스위치

function setup() {
  setCanvasContainer('canvas', 3, 2, true);

  // aMover = new Mover(width / 2, height / 2, 10, 25, 'cornflowerblue');
  colorMode(HSL, 360, 100, 100, 100);
  for (let a = 0; a < moversNum; a++) {
    movers.push(
      new Mover(
        random(width),
        random(height),
        10,
        25,
        color(random(360), 100, 50, 25)
      )
    );
  }
  mVec = createVector();

  background(255);
}
function draw() {
  mVec.set(mouseX, mouseY);

  // const dirVec = p5.Vector.sub(mVec, aMover.pos);
  // // 마우스를 따라오는거 구현, 마우스좌표에서 객체의 좌표를 뺴기- 거리구하기
  // dirVec.setMag(0.5);
  // // 항상 0.5정도의 가속도를 갖게함
  for (let a = 0; a < movers.length; a++) {
    const dirVec = p5.Vector.sub(mVec, movers[a].pos);
    dirVec.setMag(0.5);
    movers[a].applyForce(dirVec);
    movers[a].update();
  }

  background(255);

  // for (let a = 0; a < movers.length; a++) {
  //   movers[a].display();
  //   movers[a].displayVector();
  // }
  // for(let 변수이름 = 0; 변수이름<어레이이름.length; 변수이름++){
  //   어레이이름[변수이름]
  // }

  //=

  // 어레이이름.forEach(function (아무변수이름) {
  //   아무변수이름.오브젝트메서드
  // });
  // 어레이이름.forEach((아무변수이름) => {
  //   아무변수이름.오브젝트메서드
  // });

  // movers.forEach(function (anyname) {
  //   anyname.display();
  //   anyname.displayVector();
  // });

  //=
  //화살표함수
  movers.forEach((anyname) => {
    anyname.display();
    anyname.displayVector();
  });
}
