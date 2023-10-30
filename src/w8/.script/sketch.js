let dom;
let htmlDom;
let canvasW = 600;
let canvasH = 400;

function setup() {
  // 업데이트 시 매번 새로 셀렉트해서 가져와야한다(수동)
  dom = select('#hereGoesMyP5Sketch');
  //   console.log('p5 select', dom);
  //   console.log('p5 select', dom.width);

  //   querySelector사용
  //   자동으로 업데이트된다(자동)
  htmlDom = document.querySelector('#hereGoesMyP5Sketch');
  //   console.log('query select', htmlDom);
  //   console.log('query select', htmlDom.clientWidth);

  let canvas = createCanvas(canvasW, canvasH);
  canvas.parent(dom);
  background('black');
}

function draw() {}

function windowResized() {
  //   dom = select('#hereGoesMyP5Sketch');
  //   console.log('p5 select', dom);
  //   console.log('query select', htmlDom.clientWidth);

  //   파란영역이 초기에 잡아놨던 검은색영역보다 작아졌을 때
  if (htmlDom.clientWidth < canvasW) {
    console.log('리사이즈됩니다.');
    resizeCanvas(
      htmlDom.clientWidth,
      (htmlDom.clientWidth * canvasH) / canvasW
    );
    background('black');
    // 조정되있는 캔버스의 너비가 초기에잡아놨던 캔버스 너비와 똑같지 않으면
    // 똑같이 만들어라 = 파란영역이 검은영역과 똑같거나 더 클때,
    // 다시 초기값 600으로 조정한다
  } else if (width !== canvasW) {
    console.log('리사이즈됩니다.');
    resizeCanvas(canvasW, canvasH);
    background('black');
  }
}
