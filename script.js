// sPoints 초기값 불러오기
let sPoints = parseInt(localStorage.getItem("sPoints")) || 0;

// 화면 초기 포인트 표시
updatePoints();

// 공부 완료 버튼 클릭
document.getElementById("complete-btn").addEventListener("click", () => {
  sPoints++;
  savePoints();
  updatePoints();
});

// 공부 -1 버튼 클릭
document.getElementById("study-btn").addEventListener("click", () => {
  if (sPoints > 0) {
    sPoints--;
    savePoints();
    updatePoints();
  } else {
    alert("포인트는 0 이하로 내려갈 수 없습니다!");
  }
});

// 수업 완료 버튼 클릭
document.getElementById("class-complete-btn").addEventListener("click", () => {
  sPoints++;
  savePoints();
  updatePoints();
});

// 수업 -1 버튼 클릭
document.getElementById("class-minus-btn").addEventListener("click", () => {
  if (sPoints > 0) {
    sPoints--;
    savePoints();
    updatePoints();
  } else {
    alert("포인트는 0 이하로 내려갈 수 없습니다!");
  }
});

// 포인트 화면에 표시
function updatePoints() {
  document.getElementById("points").textContent = `${sPoints} Points`;
}

// 포인트 저장
function savePoints() {
  localStorage.setItem("sPoints", sPoints);
}
