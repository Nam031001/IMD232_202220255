class Cell {
  constructor(x, y, w, h, state, idx) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.state = state;
    this.nextState = state;
    this.idx = idx;
    //한 사각형을 감싸고 있는 2개 사각형
    this.friends = [];
    //다음 모양에 따른 룰
    // this.rule = [
    //   false, //111=7
    //   false, //110=6
    //   false, //101=5
    //   true, //100=4
    //   true, //011=3
    //   true, //010=2
    //   true, //001 =1
    //   false, //000 = 0
    // ];
    // this.rule = [
    //   false, //000 = 0
    //   true, //001 =1
    //   true, //010=2
    //   true, //011=3
    //   true, //100=4
    //   false, //101=5
    //   false, //110=6
    //   false, //111=7
    // ];
  }

  // cell 어레이를 프렌즈 어레이에 넣는다, 내가 몇인지를 알아야한다
  addFriends(cellArray) {
    const idxList = [
      this.idx - 1, //오
      this.idx + 1, //왼
    ];
    const myCol = this.idx % colNum;
    //내가 몇번째인지..
    //두번째 세번쨰 줄에서도 잘 작동하려면 % colNum를 추가해줘야 한다

    //현재 위치를 기준으로 아직 생성되지 않은 값이 다른 값으로 우연히 계산되는 이슈 발생
    //친구를 가질 수 없는 경우를 친구를 가질 수 없도록 특수처리
    //왼쪽 귀퉁이,
    if (myCol === 0) {
      // 0번째 위치의 왼쪽부분을 -1로 설정
      idxList[0] = -1;
    }
    //오른쪽 귀퉁이
    else if (myCol === colNum - 1) {
      // 0번째 위치의 왼쪽부분을 -1로 설정
      idxList[1] = -1;
    }

    idxList.forEach((eachIdx) => {
      this.friends.push(cells[eachIdx]);
    });
  }

  //wolfram cellular automata
  // 내 주변에 있는 친구들이 몇개인가=> 모양을 따짐
  calcNextState() {
    // 이진수 만들기
    let binaratyString = '';
    // 왼쪽 친구가 true(존재할 경우)일 경우, 1을 넣어주고, 그게 아니면 0을 넣어줘라
    //가장 양끝에 있는 친구가 없는 경우 존재,[]옆에 ?넣어주면 해결
    binaratyString += this.friends[0]?.state ? '1' : '0';
    binaratyString += this.state ? '1' : '0';
    binaratyString += this.friends[1]?.state ? '1' : '0';
    // console.log('binary', binaratyString);

    // 2진수 문자를 10진수 문자로 변환
    const decimalNum = parseInt(binaratyString, 2);
    // console.log('decimalNum', decimalNum);
    // 예를 들어 binary값 2가 나왔을 때 해당 값을 rule에 넣으면 인덱스순으로
    // 세져서 1이 나오는 난제 해결
    const ruleIdx = rule.length - 1 - decimalNum;
    this.nextState = rule[ruleIdx];
    // console.log(this.nextState);
  }

  updateState() {
    this.state = this.nextState;
  }

  createNextGen() {
    // 나 자신(클래스)를 만들어서 뱉기
    return new Cell(
      this.x,
      this.y + this.h,
      this.w,
      this.h,
      this.nextState,
      this.idx + colNum
    );
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
