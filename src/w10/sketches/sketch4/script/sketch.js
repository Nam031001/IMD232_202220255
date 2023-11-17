let cells = [];

//홀수
const colNum = 51,
  rowNum = 1;

let w, h;

let currentGen = 0;

function setup() {
  setCanvasContainer('canvas', 1, 1, true);

  randomSeed(1);

  w = width / colNum;
  h = w;

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
      let state = false;
      if (col === floor(colNum / 2)) {
        state = true;
      }
      const idx = colNum * row + col;
      const newCell = new Cell(x, y, w, h, state, idx);
      cells.push(newCell);
    }
  }

  cells.forEach((eachCell) => {
    eachCell.addFriends(cells);
  });

  cells.forEach((eachCell) => {
    eachCell.setRule(54);
  });

  console.log(cells);

  frameRate(4);
  background('white');
  // 한번만 실행하고 멈추기
  // noLoop(0);
}

function draw() {
  background('white');

  const newGen = [];
  for (let col = 0; col < colNum; col++) {
    const idx = colNum * currentGen + col;
    cells[idx].calcNextState();
    const newCell = cells[idx].createNextGen();
    newGen.push(newCell);
    cells.push(newCell);
  }

  // cells.forEach((eachCell) => {
  //   eachCell.updateState();
  // });

  // newGen.forEach((eachNewGen) => {
  //   // cells에 eachNewGen를 넣는다
  //   cells.push(eachNewGen);
  // });

  newGen.forEach((eachNewGen) => {
    eachNewGen.addFriends(cells);
  });

  currentGen++;

  cells.forEach((eachCell) => {
    eachCell.display();
  });
}
