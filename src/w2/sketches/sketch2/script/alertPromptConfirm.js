alert('나의 홈페이지에 당도한 것을 환영하오 낯선 이여.');
let userType = prompt('자네 이름이 무엇인가?', '홍길동');
let confirmVal = confirm('당신의 이름이' + userType + '이/가 맞습니까?');
if (confirmVal == true) {
  alert('환영합니다' + userType + '님');
}
