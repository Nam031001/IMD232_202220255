let particles = [];
const num = 2200;
const noiseScale = 0.01 / 2;

function setup() {
  setCanvasContainer('canvas', 3, 1, true);
  for (let i = 0; i < num; i++) {
    particles.push(createVector(random(width), random(height)));
  }

  stroke(255);
  clear();
  document.addEventListener('keydown', function (event) {
    if (event.key === 'a') {
      location.reload();
    }
  });
}

function draw() {
  stroke('LightYellow');
  let cursorThickness = map(mouseY, 0, canvas.height, 0.5, 5); // 조절 가능한 선의 두께 범위
  strokeWeight(cursorThickness);

  background(0, 10);

  for (let i = 0; i < num; i++) {
    let p = particles[i];
    point(p.x, p.y);
    let n = noise(
      p.x * noiseScale,
      p.y * noiseScale,
      frameCount * noiseScale * noiseScale
    );

    let a = TAU * n;
    p.x += cos(a);
    p.y += sin(a);
    if (!onScreen(p)) {
      p.x = random(width);
      p.y = random(height);
    }
  }
}

function mouseReleased() {
  noiseSeed(millis());
}

function onScreen(v) {
  return v.x >= 0 && v.x <= width && v.y >= 0 && v.y <= height;
}
