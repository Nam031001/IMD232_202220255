const tiles = [];
const rowNum = 50,
  colNum = 50;

function setup() {
  setCanvasContainer('canvas', 1, 1, true);

  const w = width / colNum;
  const h = w;
  for (let row = 0; row < rowNum; row++) {
    for (let col = 0; col < colNum; col++) {
      const x = w * col;
      const y = h * row;
      const newTile = new RPSCell(x, y, w, h);
      tiles.push(newTile);
    }
  }
  for (let row = 0; row < rowNum; row++) {
    for (let col = 0; col < colNum; col++) {
      const neighborsIdx = [
        getIdx(row - 1, col - 1),
        getIdx(row - 1, col),
        getIdx(row - 1, col + 1),
        getIdx(row, col + 1),
        getIdx(row + 1, col + 1),
        getIdx(row + 1, col),
        getIdx(row + 1, col - 1),
        getIdx(row, col - 1),
      ];
      if (col === 0) {
        neighborsIdx[0] = -1;
        neighborsIdx[6] = -1;
        neighborsIdx[7] = -1;
      } else if (col === colNum - 1) {
        neighborsIdx[2] = -1;
        neighborsIdx[3] = -1;
        neighborsIdx[4] = -1;
      }
      if (row === 0) {
        neighborsIdx[0] = -1;
        neighborsIdx[1] = -1;
        neighborsIdx[2] = -1;
      } else if (row === rowNum - 1) {
        neighborsIdx[4] = -1;
        neighborsIdx[5] = -1;
        neighborsIdx[6] = -1;
      }
      const neighbors = [];
      neighborsIdx.forEach((eachIdx) => {
        neighbors.push(eachIdx >= 0 ? tiles[eachIdx] : null);
      });
      const idx = getIdx(row, col);
      tiles[idx].setNeighbors(neighbors);
    }
  }
  randomSeed(1);
  tiles.forEach((each) => {
    each.state = random(each.states); // 각 셀 초기 상태 랜덤 설정
  });

  frameRate(15);
  background(255);
  tiles.forEach((each) => {
    each.display(mouseX, mouseY);
  });
}

function draw() {
  background(255);

  tiles.forEach((each) => {
    each.calcNextState();
  });
  tiles.forEach((each) => {
    each.update();
  });

  tiles.forEach((each) => {
    each.display(mouseX, mouseY);
  });
}

function getIdx(row, col) {
  return row * colNum + col;
}

// mouseClicked 이벤트 삭제

function keyPressed() {
  // mouseClicked 이벤트 대신 자동 계산으로 변경
  tiles.forEach((each) => {
    each.calcNextState();
  });
  tiles.forEach((each) => {
    each.update();
  });
}
