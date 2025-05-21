
const cowok = document.getElementById("cowok");
const rintangan = document.getElementById("rintangan");
const statusText = document.getElementById("status");

document.body.addEventListener("keydown", function(event) {
  if (event.code === "Space") {
    if (!cowok.classList.contains("lompat")) {
      cowok.classList.add("lompat");

      setTimeout(() => {
        cowok.classList.remove("lompat");
      }, 500);
    }
  }
});

let gameLoop = setInterval(() => {
  const cowokTop = parseInt(window.getComputedStyle(cowok).getPropertyValue("bottom"));
  const rintanganLeft = parseInt(window.getComputedStyle(rintangan).getPropertyValue("right"));

  if (rintanganLeft > (550 - 50) && rintanganLeft < (550 - 10) && cowokTop < 50) {
    statusText.textContent = "Game Over! Reload untuk main lagi.";
    rintangan.style.animation = "none";
    rintangan.style.right = rintanganLeft + "px";
    clearInterval(gameLoop);
  }
}, 10);
