// 포인트 초기값 불러오기 또는 0
let points = Number(localStorage.getItem('points')) || 0;

// 포인트 표시 함수
function updatePoints() {
  document.getElementById('points').textContent = `${points} Points`;
  localStorage.setItem('points', points);
}

// 버튼 엘리먼트 가져오기
const completeBtn = document.getElementById('complete-btn');
const studyMinusBtn = document.getElementById('study-btn');
const classCompleteBtn = document.getElementById('class-complete-btn');
const classMinusBtn = document.getElementById('class-minus-btn');

const menuBtn = document.getElementById('menu-btn');
const menuModal = document.getElementById('menu-modal');
const closeMenuBtn = document.getElementById('close-menu');

// 점수 증가 버튼
completeBtn.addEventListener('click', () => {
  points++;
  updatePoints();
});

// 공부 -1 버튼
studyMinusBtn.addEventListener('click', () => {
  if(points > 0) {
    points--;
    updatePoints();
  } else {
    alert('포인트는 0 이하로 내려갈 수 없습니다.');
  }
});

// 수업 완료 버튼
classCompleteBtn.addEventListener('click', () => {
  points++;
  updatePoints();
});

// 수업 -1 버튼
classMinusBtn.addEventListener('click', () => {
  if(points > 0) {
    points--;
    updatePoints();
  } else {
    alert('포인트는 0 이하로 내려갈 수 없습니다.');
  }
});

// 메뉴 열기
menuBtn.addEventListener('click', () => {
  menuModal.classList.remove('hidden');
});

// 메뉴 닫기
closeMenuBtn.addEventListener('click', () => {
  menuModal.classList.add('hidden');
});

// 앱 시작 시 포인트 업데이트
updatePoints();
