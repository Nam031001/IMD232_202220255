let cam;

function setup() {
  setCanvasContainer('canvas', 3, 2, true);
  cam = createCapture(VIDEO);
  // cam.size(320, 480);

  // 화면이 하나만 나오도록
  cam.hide();
  console.log(cam);
  // noLoop();

  background('white');
}
function draw() {
  background('white');
  image(cam, 0, 0, width, (cam.height / cam.width) * width);
  loadPixels();

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      // cam안에 있는 모든 픽셀에 접근
      const idx = width * y + x;
      const color = pixels[idx];
      const b = brightness(color);
    }
  }
  updatePixels();
}
