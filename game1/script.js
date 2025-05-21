let score = 0;
let isPlaying = false;
let timer;

function startGame() {
  score = 0;
  isPlaying = true;
  document.getElementById("score").textContent = score;
  document.getElementById("status").textContent = "Waktu dimulai!";
  document.getElementById("clickBtn").disabled = false;

  timer = setTimeout(() => {
    isPlaying = false;
    document.getElementById("clickBtn").disabled = true;
    document.getElementById("status").textContent = "Waktu habis! Skor akhir: " + score;
  }, 5000);
}

function handleClick() {
  if (!isPlaying) return;
  score++;
  document.getElementById("score").textContent = score;
}
