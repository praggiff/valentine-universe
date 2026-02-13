const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let centerX = canvas.width / 2;
let centerY = canvas.height / 2;

let stars = [];
let angle = 0;
let distance = 140;

let introDone = false;
let heartMode = false;
let asteroids = [];
let petals = [];
let shake = 0;

const story = document.getElementById("storyText");
const intro = document.getElementById("intro");
const finalBtn = document.getElementById("finalBtn");

/* ---------- STARFIELD ---------- */
for (let i = 0; i < 400; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 2,
    speed: Math.random() * 0.3
  });
}

/* ---------- PASSWORD ---------- */
function checkPassword() {
  const input = document.getElementById("passwordInput").value;
  const error = document.getElementById("errorMsg");

  if (input === "Love") {
    intro.style.opacity = 0;

    setTimeout(() => {
      intro.style.display = "none";
      introDone = true;
      startStory();
    }, 2000);

  } else {
    error.classList.remove("hidden");
  }
}

/* ---------- STORY ---------- */
function showText(text, delay = 0) {
  setTimeout(() => {
    story.innerHTML = text;
    story.classList.add("show");
  }, delay);
}

function startStory() {
  showText("We started as two different worlds.");
  setTimeout(() => showText("But on 23 March 2024…"), 3000);
  setTimeout(() => showText("We chose the same sky."), 6000);

  setTimeout(() => showText("We built dreams."), 9000);
  setTimeout(() => showText("We built laughter."), 11000);
  setTimeout(() => showText("We built a universe."), 13000);

  setTimeout(() => showText("But even stable systems face disturbance."), 16000);
  setTimeout(() => showText("And I became the instability."), 19000);

  setTimeout(() => showText("I let distance grow."), 22000);
  setTimeout(() => showText("And I regret that."), 24000);

  setTimeout(() => showText("You love physics."), 27000);
  setTimeout(() => showText("So I started learning it."), 29000);
  setTimeout(() => showText("Because loving you means learning your universe."), 32000);

  setTimeout(() => showText("Every model improves with iteration."), 35000);
  setTimeout(() => showText("So will I."), 38000);

  setTimeout(() => showText("I am sorry."), 41000);
  setTimeout(() => showText("Not just in words."), 43000);
  setTimeout(() => showText("But in growth."), 45000);

  setTimeout(() => finalBtn.classList.remove("hidden"), 48000);
}

/* ---------- FINAL CLIMAX ---------- */
function finalClimax() {
  finalBtn.classList.add("hidden");

  for (let i = 0; i < 4; i++) {
    asteroids.push({
      x: Math.random() * canvas.width,
      y: -100,
      dx: (Math.random() - 0.5) * 4,
      dy: 9,
      size: 15 + Math.random() * 5
    });
  }
}

/* ---------- ANIMATION LOOP ---------- */
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let gradient = ctx.createRadialGradient(centerX, centerY, 200, centerX, centerY, 800);
  gradient.addColorStop(0, heartMode ? "#6a008f" : "#0a0a2a");
  gradient.addColorStop(1, "#000");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (shake > 0) {
    ctx.translate(Math.random() * shake - shake/2, Math.random() * shake - shake/2);
    shake *= 0.9;
  }

  /* ---------- STARS ---------- */
  ctx.fillStyle = "white";
  stars.forEach(star => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fill();
    star.y += star.speed;
    if (star.y > canvas.height) star.y = 0;
  });

  /* ---------- ORBITS (ONLY AFTER PASSWORD) ---------- */
  if (introDone) {
    angle += 0.02;

    let x1 = centerX + Math.cos(angle) * distance;
    let y1 = centerY + Math.sin(angle) * distance;
    let x2 = centerX - Math.cos(angle) * distance;
    let y2 = centerY - Math.sin(angle) * distance;

    ctx.shadowBlur = 25;

    ctx.shadowColor = "pink";
    ctx.fillStyle = "pink";
    ctx.beginPath();
    ctx.arc(x1, y1, 12, 0, Math.PI * 2);
    ctx.fill();

    ctx.shadowColor = "cyan";
    ctx.fillStyle = "cyan";
    ctx.beginPath();
    ctx.arc(x2, y2, 12, 0, Math.PI * 2);
    ctx.fill();

    ctx.shadowBlur = 0;
  }

  /* ---------- ASTEROIDS ---------- */
  asteroids.forEach((a, i) => {
    ctx.fillStyle = "#aaa";
    ctx.beginPath();
    ctx.arc(a.x, a.y, a.size, 0, Math.PI * 2);
    ctx.fill();

    a.x += a.dx;
    a.y += a.dy;

    if (a.y >= centerY) {
      shake = 25;

      for (let j = 0; j < 50; j++) {
        petals.push({
          x: centerX,
          y: centerY,
          angle: Math.random() * Math.PI * 2,
          speed: Math.random() * 4 + 2,
          size: Math.random() * 4 + 2
        });
      }

      asteroids.splice(i, 1);
      heartMode = true;
    }
  });

  /* ---------- PETALS ---------- */
  petals.forEach((p, i) => {
    ctx.fillStyle = "rgba(255,105,180,0.8)";
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();

    p.x += Math.cos(p.angle) * p.speed;
    p.y += Math.sin(p.angle) * p.speed;
    p.size *= 0.97;

    if (p.size < 0.5) petals.splice(i, 1);
  });

  /* ---------- HEART ---------- */
  if (heartMode) {
    ctx.fillStyle = "pink";
    for (let t = 0; t < Math.PI * 2; t += 0.02) {
      let x = 16 * Math.pow(Math.sin(t), 3);
      let y =
        13 * Math.cos(t) -
        5 * Math.cos(2 * t) -
        2 * Math.cos(3 * t) -
        Math.cos(4 * t);

      ctx.beginPath();
      ctx.arc(centerX + x * 15, centerY - y * 15, 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  requestAnimationFrame(animate);
}

animate();
