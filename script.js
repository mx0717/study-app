// 포인트 및 레벨 상태 초기화
let points = Number(localStorage.getItem('points')) || 0;

// 요소 참조
const completeBtn = document.getElementById('complete-btn');
const studyMinusBtn = document.getElementById('study-btn');
const classCompleteBtn = document.getElementById('class-complete-btn');
const classMinusBtn = document.getElementById('class-minus-btn');
const menuBtn = document.getElementById('menu-btn');
const menuModal = document.getElementById('menu-modal');
const resetPointsBtn = document.getElementById('reset-points-btn');
const darkModeBtn = document.getElementById('toggle-dark-mode');
const openRecordBtn = document.getElementById('open-record-btn');
const recordPanel = document.getElementById('record-panel');
const pointsDisplay = document.getElementById('points');
const levelDisplay = document.getElementById('level');
const appInfoBtn = document.getElementById('app-info-btn');


let isDarkMode = localStorage.getItem('darkMode') === 'true';

// 포인트, 레벨 업데이트 함수
function updateLevel() {
  if (points >= 600) levelDisplay.textContent = '레벨: 🌌';
  else if (points >= 300) levelDisplay.textContent = '레벨: 🌠';
  else if (points >= 150) levelDisplay.textContent = '레벨: 🌟';
  else if (points >= 75) levelDisplay.textContent = '레벨: ⭐';
  else levelDisplay.textContent = '레벨: 💧';
}

function updatePoints() {
  pointsDisplay.textContent = `${points} Points`;
  localStorage.setItem('points', points);
  updateLevel();
}

// 날짜 문자열 반환 (YYYY-MM-DD)
function getTodayDate() {
  return new Date().toISOString().split('T')[0];
}

// 기록 불러오기 / 저장하기
function loadRecords() {
  const records = localStorage.getItem('studyRecords');
  return records ? JSON.parse(records) : {};
}
function saveRecords(records) {
  localStorage.setItem('studyRecords', JSON.stringify(records));
}

// 오늘 날짜 기록에 점수 추가 (기본 1점)
function addPointToToday(amount = 1) {
  const records = loadRecords();
  const today = getTodayDate();
  if (!records[today]) records[today] = 0;
  records[today] += amount;
  saveRecords(records);
}

// 차트 렌더링
const ctx = document.getElementById('record-chart').getContext('2d');
let recordChart = null;

function renderChart() {
  const records = loadRecords();
  const dates = Object.keys(records).sort();
  const pointsArr = dates.map(date => records[date]);

  if (recordChart) recordChart.destroy();

  recordChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: dates,
      datasets: [{
        label: '포인트 기록',
        data: pointsArr,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      }]
    },
    options: {
      scales: {
        x: { title: { display: true, text: '날짜' } },
        y: { beginAtZero: true, title: { display: true, text: '포인트' } }
      }
    }
  });
}

// 이벤트 리스너

// 공부 완료 버튼 (+10점)
completeBtn.addEventListener('click', () => {
  if (confirm("정말로 공부를 완료하셨습니까?")) {
    points += 10;
    updatePoints();
    addPointToToday(10);
    renderChart();
  }
});

// 공부 -10점 버튼
studyMinusBtn.addEventListener('click', () => {
  if (confirm("정말로 포인트를 줄이시겠습니까?")) {
    if (points >= 10) {
      points -= 10;
      updatePoints();
      addPointToToday(-10);
      renderChart();
    } else {
      alert('포인트가 10점 이상 있어야 감소할 수 있습니다.');
    }
  }
});

// 수업 완료 버튼 (+2점)
classCompleteBtn.addEventListener('click', () => {
  if (confirm("정말로 수업을 완료하셨습니까?")) {
    points += 2;
    updatePoints();
    addPointToToday(2);
    renderChart();
  }
});

// 수업 -2점 버튼
classMinusBtn.addEventListener('click', () => {
  if (confirm("정말로 포인트를 줄이시겠습니까?")) {
    if (points >= 2) {
      points -= 2;
      updatePoints();
      addPointToToday(-2);
      renderChart();
    } else {
      alert('포인트가 2점 이상 있어야 감소할 수 있습니다.');
    }
  }
});

// 메뉴 버튼 토글
menuBtn.addEventListener('click', () => {
  menuModal.classList.toggle('active');
});

// 메뉴 내 앱 정보 버튼
appInfoBtn.addEventListener('click', () => {
  alert('📱 Study App v0.4\n만든이: mx0');
  menuModal.classList.remove('active');
});

// 메뉴 내 초기화 버튼
resetPointsBtn.addEventListener('click', () => {
  if (confirm('정말 초기화 하시겠습니까?')) {
    points = 0;
    updatePoints();
    localStorage.removeItem('studyRecords');
    renderChart();
    menuModal.classList.remove('active');
    alert('포인트 및 기록이 초기화되었습니다.');
  }
});


// 다크 모드 토글
function updateDarkModeUI() {
  if (isDarkMode) {
    document.body.classList.add('dark-mode');
    darkModeBtn.textContent = '라이트 모드 켜기';
  } else {
    document.body.classList.remove('dark-mode');
    darkModeBtn.textContent = '다크 모드 켜기';
  }
  localStorage.setItem('darkMode', isDarkMode);
}
darkModeBtn.addEventListener('click', () => {
  isDarkMode = !isDarkMode;
  updateDarkModeUI();
});
updateDarkModeUI();

// 기록 패널 열기
openRecordBtn.addEventListener('click', () => {
  menuModal.classList.remove('active');
  recordPanel.classList.add('active');
  renderChart();
});

// 기록 패널 밖 클릭 시 닫기
document.addEventListener('click', (e) => {
  if (recordPanel.classList.contains('active') &&
      !recordPanel.contains(e.target) &&
      !openRecordBtn.contains(e.target)) {
    recordPanel.classList.remove('active');
  }
});

// 초기화면 렌더링
updatePoints();
renderChart();

// 출석 체크 관련 변수
let attendanceData = JSON.parse(localStorage.getItem('attendanceData')) || {
  lastDate: null,
  streak: 0,
  markedDays: []
};

// 출석 버튼과 창 열기
const attendanceBtn = document.getElementById('attendance-btn');
const attendancePanel = document.getElementById('attendance-panel');
const closeAttendance = document.getElementById('close-attendance');
const calendar = document.getElementById('calendar');
const streakInfo = document.getElementById('streak-info');

// 패널 열기
attendanceBtn.addEventListener('click', () => {
  attendancePanel.classList.add('active');
  renderCalendar();
  updateStreakInfo();
});

// 패널 닫기
closeAttendance.addEventListener('click', () => {
  attendancePanel.classList.remove('active');
});

// 오늘 날짜를 'YYYY-MM-DD' 형식으로 반환
function getTodayKey() {
  return new Date().toISOString().split('T')[0];
}

// 출석 체크 처리
function checkAttendance() {
  const today = getTodayKey();
  if (attendanceData.markedDays.includes(today)) {
    alert('오늘은 이미 출석했습니다!');
    return;
  }

  attendanceData.markedDays.push(today);

  // 연속 출석 계산
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayKey = yesterday.toISOString().split('T')[0];

  if (attendanceData.lastDate === yesterdayKey) {
    attendanceData.streak += 1;
  } else {
    attendanceData.streak = 1;
  }

  attendanceData.lastDate = today;
  localStorage.setItem('attendanceData', JSON.stringify(attendanceData));

  // 포인트 2점 추가
  points += 2;
  updatePoints();
  saveStudyRecord(2); // 기록 저장
  renderChart();

  renderCalendar();
  updateStreakInfo();

  alert('출석 완료! +2포인트');
}

// 달력 렌더링
function renderCalendar() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  let html = `<table style="width:100%; border-collapse: collapse; text-align:center;">`;
  html += `<tr><th colspan="7">${year}년 ${month + 1}월</th></tr>`;
  html += `<tr><th>일</th><th>월</th><th>화</th><th>수</th><th>목</th><th>금</th><th>토</th></tr>`;

  const firstDay = new Date(year, month, 1).getDay();
  let day = 1;
  html += `<tr>`;

  for (let i = 0; i < firstDay; i++) {
    html += `<td></td>`;
  }

  while (day <= daysInMonth) {
    const current = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const isToday = current === getTodayKey();
    const isMarked = attendanceData.markedDays.includes(current);
    html += `<td style="padding:5px; cursor:pointer; background:${isMarked ? '#a3e6a3' : isToday ? '#ddd' : ''}" onclick="checkAttendance()">${day}</td>`;

    if ((day + firstDay) % 7 === 0) html += `</tr><tr>`;
    day++;
  }

  html += `</tr></table>`;
  calendar.innerHTML = html;
}

// 연속 출석 정보 업데이트
function updateStreakInfo() {
  streakInfo.textContent = `🔥 연속 출석: ${attendanceData.streak}일`;
}
