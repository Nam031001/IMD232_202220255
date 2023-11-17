let cells = [];

const colNum = 50,
  rowNum = colNum;

let w, h;

let patternBlock = {
  width: 4,
  height: 4,
  trueBlockIdx: [5, 6, 9, 10],
};
let patternBlinker = {
  width: 5,
  height: 5,
  trueBlockIdx: [11, 12, 13],
};
let patternToad = {
  width: 6,
  height: 6,
  trueBlockIdx: [14, 15, 16, 19, 20, 21],
};
let patternGlider = {
  width: 5,
  height: 5,
  trueBlockIdx: [7, 13, 16, 17, 18],
};

let addPattern = (x, y, pattern) => {
  for (let row = 0; row < pattern.height; row++) {
    for (let col = 0; col < pattern.width; col++) {
      const colIdx = x + col;
      const rowIdx = y + row;
      const idx = colNum * rowIdx + colIdx;
      // 패턴의 trueBlockIdx속 어레이 속 숫자들만 true로 설정
      if (pattern.trueBlockIdx.includes(pattern.width * row + col)) {
        cells[idx].state = true;
      }
    }
  }
};

function setup() {
  setCanvasContainer('canvas', 1, 1, true);

  randomSeed(1);

  w = width / colNum;
  h = height / rowNum;

  //숫자의 시작이 0 일때 내 위치번호(idx)를 구하는 공식 idx = totalColumNumber * row + col;
  //나의 위치번호를 알고 있을 떄 내 위치를 알아낼 수 있는 공식 col = idx%totalColNum
  for (let row = 0; row < rowNum; row++) {
    for (let col = 0; col < colNum; col++) {
      const x = w * col;
      const y = h * row;

      // state의 랜덤값이 0.5보다 작을경우 false, 그렇지 않을 경우 true
      // let state;
      // if (random() < 0.5) {
      //   state = false;
      // } else {
      //   state = true;
      // }

      // const state = random() < 0.5;
      const state = false;
      const idx = colNum * row + col;
      const newCell = new Cell(x, y, w, h, state, idx);
      cells.push(newCell);
    }
  }

  addPattern(0, 0, patternBlock);
  addPattern(20, 10, patternBlock);
  addPattern(30, 10, patternBlinker);
  addPattern(10, 30, patternToad);
  addPattern(1, 10, patternGlider);

  cells.forEach((eachCell) => {
    eachCell.addFriends(cells);
  });

  console.log(cells);

  frameRate(4);
  background('white');
}

function draw() {
  background('white');

  cells.forEach((eachCell) => {
    eachCell.calcNextState();
  });

  cells.forEach((eachCell) => {
    eachCell.updateState();
  });

  cells.forEach((eachCell) => {
    eachCell.display();
  });
}
