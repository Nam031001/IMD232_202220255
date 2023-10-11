// particle의 기본원리 = 일정주기가 넘으면 다시 생성되게함
//없애야할 건 없애고 화면상에 보이는 것만 계산되도록 해야 한다
// => 렉방지

// let particle;
let particleArray = [];
let gravity;

function setup() {
  setCanvasContainer('canvas', 3, 2, true);

  gravity = createVector(0, 0.1);

  background(255);
}

function draw() {
  particleArray.push(new Particle(width / 2, 20));

  background(255);
  for (let a = 0; a < particleArray.length; a++) {
    particleArray[a].applyForce(gravity);
    particleArray[a].update();
    particleArray[a].display();
  }

  // 만약 lifeSpan이 0보다 작아질 경우 그결과를 받아서 splice함수를 통해 지워냄
  //()안의 식이 평소 사용하는 양식과 다른 이유 - 도중에 요소 하나가 isDead될 경우
  //숫자 하나를 건너뛰고 진행하는 오류 발생
  // length -1을 통해 0~n개까지의 총 갯수를 구하고
  // a--를 통해 뒤에서부터 진행하면 앞서 말한 오류가 발생하지 않는다
  // an array of particle 15분부터
  for (let a = particleArray.length - 1; a >= 0; a--) {
    if (particleArray[a].isDead()) {
      particleArray.splice(a, 1);
    }
  }

  console.log(particleArray.length);
}
