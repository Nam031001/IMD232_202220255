class Cell {
  constructor(x, y, w, h, isClickable = true) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.isClickable = isClickable;
    this.state = false;
    this.nextState = this.state;
    this.neighbors = [];
  }

  setNeighbors(neighbors) {
    this.neighbors = neighbors;
  }

  calcNextState() {
    const livingNeighbors = this.neighbors.filter(
      (eachNeighbor) => eachNeighbor?.state
    );
    const livingNum = livingNeighbors.length;
    if (this.state) {
      if (livingNum < 2 || livingNum > 3) {
        this.nextState = false;
      } else {
        this.nextState = this.state;
      }
    } else {
      if (livingNum === 3) {
        this.nextState = true;
      } else {
        this.nextState = this.state;
      }
    }
  }

  update() {
    this.state = this.nextState;
  }

  isHover(mx, my) {
    return (
      this.x < mx && this.x + this.w > mx && this.y < my && this.y + this.h > my
    );
  }

  toggleState(mx, my) {
    if (!this.isClickable) return false;
    if (!this.isHover(mx, my)) return false;
    this.state = !this.state;
    return true;
  }

  display(mx, my) {
    push();
    translate(this.x, this.y);
    stroke(this.isHover(mx, my) ? 'red' : 'black');
    fill(this.state ? 255 : 64);
    rect(0, 0, this.w, this.h);
    pop();
  }
}

class RPSCell extends Cell {
  constructor(x, y, w, h, isClickable = true) {
    super(x, y, w, h, isClickable);
    this.states = ['rock', 'paper', 'scissors'];
    this.state = random(this.states); // 초기 상태 랜덤 설정
  }

  calcNextState() {
    if (!this.isClickable) return;

    // 주변 이웃 중에서 자신을 이길 수 있는 셀의 개수 계산
    const winningNeighbors = this.neighbors.filter((neighbor) => {
      return neighbor && this.canWinAgainst(neighbor);
    });

    // 이길 수 있는 셀의 개수에 따라 다음 상태 설정
    if (winningNeighbors.length <= 2) {
      this.nextState = this.state; // 2개 이하면 현재 상태 유지
    } else {
      // 2개 초과면 이긴 셀의 상태로 변화
      const randomWinner = random(winningNeighbors);
      this.nextState = randomWinner.state;
    }
  }

  canWinAgainst(otherCell) {
    // Rock > Scissors, Scissors > Paper, Paper > Rock
    const rules = {
      rock: 'scissors',
      scissors: 'paper',
      paper: 'rock',
    };
    return rules[this.state] === otherCell.state;
  }

  display(mx, my) {
    push();
    translate(this.x, this.y);
    stroke(this.isHover(mx, my) ? 'red' : 'black');

    // 각 상태에 따라 다른 색상으로 표시
    switch (this.state) {
      case 'rock':
        fill(255, 0, 0); // 빨간색
        break;
      case 'paper':
        fill(0, 0, 255); // 파란색
        break;
      case 'scissors':
        fill(0, 255, 0); // 초록색
        break;
    }

    rect(0, 0, this.w, this.h);
    pop();
  }
}
