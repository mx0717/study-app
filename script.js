let points = Number(localStorage.getItem('points')) || 0;

function updatePoints() {
  document.getElementById('points').textContent = `${points} Points`;
  localStorage.setItem('points', points);
}

const completeBtn = document.getElementById('complete-btn');
const studyMinusBtn = document.getElementById('study-btn');
const classCompleteBtn = document.getElementById('class-complete-btn');
const classMinusBtn = document.getElementById('class-minus-btn');
const menuBtn = document.getElementById('menu-btn');
const menuModal = document.getElementById('menu-modal');
const closeMenuBtn = document.getElementById('close-menu');
const resetPointsBtn = document.getElementById('reset-points-btn');

// 공부 완료 버튼
completeBtn.addEventListener('click', () => {
  if (confirm("정말로 공부를 완료하셨습니까?")) {
    points += 10;
    updatePoints();
  }
});

// 공부 -10 버튼
studyMinusBtn.addEventListener('click', () => {
  if (confirm("정말로 포인트를 줄이시겠습니까?")) {
    if (points >= 10) {
      points -= 10;
      updatePoints();
    } else {
      alert('포인트가 10점 이상 있어야 감소할 수 있습니다.');
    }
  }
});

// 수업 완료 버튼
classCompleteBtn.addEventListener('click', () => {
  if (confirm("정말로 수업을 완료하셨습니까?")) {
    points += 2;
    updatePoints();
  }
});

// 수업 -2 버튼
classMinusBtn.addEventListener('click', () => {
  if (confirm("정말로 포인트를 줄이시겠습니까?")) {
    if (points >= 2) {
      points -= 2;
      updatePoints();
    } else {
      alert('포인트가 2점 이상 있어야 감소할 수 있습니다.');
    }
  }
});

menuBtn.addEventListener('click', () => {
  menuModal.classList.toggle('active');  // hidden 대신 active 토글
});

const menuItems = document.querySelectorAll('.menu-item');

menuItems.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    if(index === 0) {
      alert('Study App v0.2\n만든이: mx0');
    } else if(index === 1) {
      const confirmed = confirm('정말 초기화 하시겠습니까?');
      if (confirmed) {
        points = 0;
        updatePoints();
        alert('포인트가 초기화되었습니다.');
        menuModal.classList.add('hidden');
      }
    } else if(index === 2) {
      alert('');
    }
  });
});

updatePoints();