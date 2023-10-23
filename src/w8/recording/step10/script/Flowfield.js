// 1. 네모 타일의 크기 => resolution
// 2. 각각의 noise의 x,y값이 얼마나 클 것인가? =
// 클 수록 변화폭이 커진다 => noiseVel

class Flowfiled {
  constructor(resolution, noiseVel) {
    this.resolution = resolution;
    this.columnNum = ceil(width / this.resolution);
    this.rowNum = ceil(height / this.resolution);
    this.field = new Array(this.columnNum);
    for (let colIdx = 0; colIdx < this.columnNum; colIdx++) {
      this.field[colIdx] = new Array(this.rowNum);
    }
    // this.field = [this.columnNum][this.rowNum];
    this.noiseVel = noiseVel;
    this.init();
  }

  init() {
    // 만들떄마다 새롭게 만들어지게하기
    noiseSeed(random(1000));

    let noiseX = 0;
    for (let colIdx = 0; colIdx < this.columnNum; colIdx++) {
      let noiseY = 0;
      for (let rowIdx = 0; rowIdx < this.rowNum; rowIdx++) {
        // const angle = map(noise((noiseX, noiseY), 0, 1, 0, TAU));
        // const vector = createVector(1, 0);
        // vector.rotate(angle);
        // this.field[colIdx][rowIdx] = vector;
        //=
        const angle = map(noise(noiseX, noiseY), 0, 1, 0, TAU);
        this.field[colIdx][rowIdx] = p5.Vector.fromAngle(angle);
        noiseY += this.noiseVel;
      }
      noiseX += this.noiseVel;
    }
  }

  display() {
    for (let colIdx = 0; colIdx < this.columnNum; colIdx++) {
      for (let rowIdx = 0; rowIdx < this.rowNum; rowIdx++) {
        const vector = this.field[colIdx][rowIdx];
        const s = this.resolution;
        const x = s * colIdx + s * 0.5;
        const y = s * rowIdx + s * 0.5;
        const angle = vector.heading();
        push();
        translate(x, y);
        rotate(angle);
        noFill();
        stroke(0);
        line(-this.resolution * 0.4, 0, this.resolution * 0.4, 0);
        pop();
      }
    }
  }

  //   해당 벡터를 받아서 사용하게 함
  lookup(pos) {
    const colIdx = constrain(
      ceil(pos.x / this.resolution),
      0,
      this.columnNum - 1
    );
    // 인덱스 숫자로 나타낼때는 30개중 29까지만 표현(0부터 29까지 해서)
    const rowIdx = constrain(ceil(pos.y / this.resolution), 0, this.rowNum - 1);
    return this.field[colIdx][rowIdx];
  }
}
