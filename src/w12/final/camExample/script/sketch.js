//createCapture, loadPixels을 이용해서 카메라에 나오는 색상을
//해당 도형안에 집어 넣을 수 있다.
//본예제 - 카메라의 색상을 이용해 그림을 그리기, 그러나 내가 적용할 예제에는 그림을 그려줄 필요는 없다.
//해당 색상의 값만 받아와서 그 값을 새로 생겨나는 파티클의 색으로 삼으면 된다.

//=> 매 프레임마다 로드픽셀, 만약 새로 생기는 파티클이 있다면
//캠의 자기 타일 위치로 가서 해당 타일의 인덱스(r,g,b,aIdx)값을 이용해 색을 가져온다

let capture;
const tileSize = 10;
// 사이즈가 너무 크면 렉 오지게 걸림, 타일로 나눠서 캔버스를 구성해서
// 렉을 줄인다.

function setup() {
  createCanvas(800, 800);

  //w : h = cam w : cam h
  // => (w * camH) / camW = h
  capture = createCapture(VIDEO);
  capture.hide();
  //   비디오를 만들어서 화면상에서 숨기기

  console.log(capture);

  noStroke();
}

function draw() {
  background('black');
  const captureWidth = width;

  const captureHeight = (capture.height / capture.width) * width;
  //   image(
  //     capture,
  //     width / 2 - captureWidth / 2,
  //     height / 2 - captureHeight / 2,
  //     width,
  //     (capture.height / capture.width) * width
  //   );
  //   fill('white');
  //캡처한 비디오를 이미지로써 불러온다 -> 캡처이미지에는 투명도의 개념이 없으니 패스

  capture.loadPixels();
  //   비디오의 픽셀값을 불러온다

  //   console.log(capture.width);
  //   console.log(capture.height);
  //   console.log(capture.pixels.length);

  //   타일을 이어붙인 비디오 생성
  for (let y = 0; y < capture.height; y += tileSize) {
    for (let x = 0; x < capture.width; x += tileSize) {
      // 가로로 일렬, 그다음 세로 두번쨰 줄부터 이어지는 인덱스 배열(색배열) 만들기
      //해당 방법에는 투명도 개념(알파a)이 있다.
      const idx = (capture.width * y + x) * 4;

      //   rIdx,g,b,a를 총 합쳐서 총 100개의 픽셀이 있다고 가정하면 출력 시 400개의 픽셀이 출력된다.
      //=> 이를 이용해 색값을 출력할 수 있다.
      const rIdx = idx;
      const gIdx = idx + 1;
      const bIdx = idx + 2;
      const aIdx = idx + 3;
      //   rgb 색값을 3으로 나눠서 밝기로 삼는다.
      const brightness =
        capture.pixels[rIdx] + capture.pixels[gIdx] + capture.pixels[bIdx] / 3;

      //받아온 색값을 컬러로 칠한다.
      fill(capture.pixels[rIdx], capture.pixels[gIdx], capture.pixels[bIdx]);

      //   capture.width - x => 비디오 좌우반전

      //   타일 하나의 사이즈가 5고 밝기값에 따라 모양이 커지고 작아지도록 하는((brightness / 255) *)
      // 사각형들을 그림으로 출력
      rect(capture.width - x, y, (brightness / 255) * (tileSize - 5));
    }
  }
}
