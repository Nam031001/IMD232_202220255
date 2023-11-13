class Cell {
  constructor(x, y, w, h, state) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.state = state;
  }

  display() {
    push();
    translate(this.x, this.y);

    // state가 꺼졌을때
    // if (this.state) {
    //   fill(32);
    // } else {
    //   // 켜졌을때
    //   fill(255);
    // }
    fill(this.state ? 32 : 255);

    rect(0, 0, this.w, this.h);
    pop();
  }
}
