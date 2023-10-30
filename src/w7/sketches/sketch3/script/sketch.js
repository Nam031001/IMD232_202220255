let traffic;
let infiniteOffset = 80;

function setup() {
  setCanvasContainer('mySketchGoesHere', 3, 2, true);
  colorMode(HSL, 360, 100, 100, 100);
  background(255);
  traffic = new Traffic();
  for (let n = 0; n < 10; n++) {
    traffic.addVehicle(random(width), random(height));
  }
}

function draw() {
  background(255);
  traffic.run();
}

function mouseDragged() {
  traffic.addVehicle(mouseX, mouseY);
}
