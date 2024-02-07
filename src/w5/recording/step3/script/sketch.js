const stripeNum = 20;
const stripeNum2 = 15;
const stripeBegin = 15;
const stripeGap = 30;

function setup() {
  setCanvasContainer('canvas', 3, 2, true);
  background(255);
}

function draw() {
  background(255);

  noStroke();

  // for (let a = 0; a < stripeNum; a++) {
  //   const rectWidth = width / (stripeNum + stripeNum + 1);
  //   const rectX = (width / (stripeNum + stripeNum + 1)) * (2 * a + 1);
  //   rect(rectX, 0, rectWidth, height);
  // }
  // for (let a = 0; a < stripeNum; a++) {
  //   const rectHeight = height / (stripeNum + stripeNum + 1);
  //   const rectY = (height / (stripeNum + stripeNum + 1)) * (2 * a + 1);
  //   rect(0, rectY, width, rectHeight);
  // }
  rectMode(CENTER);
  for (let a = 0; a < stripeNum; a++) {
    for (let b = 0; b < stripeNum2; b++) {
      fill((255 / stripeNum) * a, (255 / stripeNum2) * b, 255);
      let x = ((a + 1) * width) / (stripeNum + 1);
      let y = ((b + 1) * height) / (stripeNum2 + 1);
      //a,b의 값은 stripeNum보다 1작기 때문에 1더하고, 비율을 맞추기 위해 width곱하기
      // 내가 그리려는 것보다 1칸 더 만들어야함

      if (a % 2 == 0) {
        ellipse(x, y, 10);
      } else {
        rect(x, y, 10);
      }
      // () => a를 2로나눠서 0일 떄 = a가 짝수일떄
      ellipse(x, y, 10);
    }
  }
  // a와 b가 0일 경우 실행, b가 15이하가 될때까지 1씩 증가, 이후 15이상이 될 시 a가 20이하일 경우 b의 과정을 반복,
  // a의 조건식이 거짓이 될때까지 계속된다

  // 몇개의 스트라이프를 그릴지 정하고 공간을 나누는 방식

  // for (let a = stripeBegin; a < width; a += 2 * stripeGap) {
  //   rect(a, 0, stripeGap, height);
  // }
  // 일정한 사이즈로 그려야 한다는 점을 정의하고 그리는 방식, 화면을 줄이면 양이 달라진다
}
