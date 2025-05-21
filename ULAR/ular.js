const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score');
const restartBtn = document.getElementById('restartBtn');

const box = 20; // ukuran kotak ular dan makanan
const canvasSize = 400;

let snake = [];
let direction;
let food;
let score;
let game;

function init() {
  snake = [
    { x: 9 * box, y: 10 * box },
    { x: 8 * box, y: 10 * box },
    { x: 7 * box, y: 10 * box }
  ];
  direction = 'RIGHT';
  createFood();
  score = 0;
  scoreEl.textContent = score;
  if (game) clearInterval(game);
  game = setInterval(draw, 100);
}

function createFood() {
  food = {
    x: Math.floor(Math.random() * (canvasSize / box)) * box,
    y: Math.floor(Math.random() * (canvasSize / box)) * box
  };
  // Pastikan makanan tidak muncul di posisi ular
  for (let part of snake) {
    if (part.x === food.x && part.y === food.y) {
      createFood();
      break;
    }
  }
}

function draw() {
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // gambar ular
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? '#4caf50' : '#8bc34a';
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
    ctx.strokeStyle = '#33691e';
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }

  // gambar makanan
  ctx.fillStyle = '#f44336';
  ctx.fillRect(food.x, food.y, box, box);

  // posisi kepala ular sekarang
  let headX = snake[0].x;
  let headY = snake[0].y;

  // arah gerak
  if (direction === 'LEFT') headX -= box;
  else if (direction === 'RIGHT') headX += box;
  else if (direction === 'UP') headY -= box;
  else if (direction === 'DOWN') headY += box;

  // cek tabrakan dengan tubuh
  for (let i = 0; i < snake.length; i++) {
    if (headX === snake[i].x && headY === snake[i].y) {
      gameOver();
      return;
    }
  }

  // cek tabrakan dengan dinding
  if (headX < 0 || headX >= canvasSize || headY < 0 || headY >= canvasSize) {
    gameOver();
    return;
  }

  // jika makan makanan
  if (headX === food.x && headY === food.y) {
    score++;
    scoreEl.textContent = score;
    createFood();
  } else {
    snake.pop(); // hapus ekor jika tidak makan
  }

  // tambah kepala baru
  snake.unshift({ x: headX, y: headY });
}

function gameOver() {
  clearInterval(game);
  alert('Game Over! Skor kamu: ' + score);
}

document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
  else if (e.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
  else if (e.key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
  else if (e.key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
});

restartBtn.addEventListener('click', init);

// mulai game
init();