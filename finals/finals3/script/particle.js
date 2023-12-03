let alpha;
alpha = map(mouseX, 0, width, 5, 35);

class Particle {
  constructor(xIn, yIn, cIn) {
    this.posX = xIn;
    this.posY = yIn;
    this.incr = 0;
    this.theta = 0;
    this.c = cIn;
  }

  move() {
    this.update();
    this.wrap();
    this.display();
  }

  update() {
    this.incr += 0.008;
    this.theta =
      noise(this.posX * 0.006, this.posY * 0.004, this.incr) * TWO_PI;
    this.posX += 2 * cos(this.theta);
    this.posY += 2 * sin(this.theta);
  }

  display() {
    if (
      this.posX > 0 &&
      this.posX < width &&
      this.posY > 0 &&
      this.posY < height
    ) {
      let pix = (floor(this.posX) + floor(this.posY) * width) * 4;
      pixels[pix] = red(this.c);
      pixels[pix + 1] = green(this.c);
      pixels[pix + 2] = blue(this.c);
      pixels[pix + 3] = alpha(this.c);
    }
  }

  wrap() {
    if (this.posX < 0) this.posX = width;
    if (this.posX > width) this.posX = 0;
    if (this.posY < 0) this.posY = height;
    if (this.posY > height) this.posY = 0;
  }
}
