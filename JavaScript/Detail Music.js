const body = document.body;
let lastScroll = 0;

window.addEventListener("scroll", function () {
  const currentScroll = window.pageYOffset;

  if (currentScroll <= 0) {
    body.classList.remove("scroll-up");
  }

  if (currentScroll > lastScroll && !body.classList.contains("scroll-down")) {
    body.classList.remove("scroll-up");
    body.classList.add("scroll-down");
  }

  if (currentScroll < lastScroll && body.classList.contains("scroll-down")) {
    body.classList.remove("scroll-down");
    body.classList.add("scroll-up");
  }

  lastScroll = currentScroll;
});

const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const repeatBtn = document.getElementById("repeatBtn");
const progressBar = document.getElementById("progressBar");
const progressContainer = document.getElementById("progressContainer");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");

let isRepeat = false;

// Play/Pause
playBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playBtn.innerHTML = "❚❚";
  } else {
    audio.pause();
    playBtn.innerHTML = "▶";
  }
});

// Repeat
repeatBtn.addEventListener("click", () => {
  isRepeat = !isRepeat;
  repeatBtn.classList.toggle("active");
  audio.loop = isRepeat;
});

// Update progress bar
audio.addEventListener("timeupdate", () => {
  const { duration, currentTime } = audio;
  const progressPercent = (currentTime / duration) * 100;
  progressBar.style.width = `${progressPercent}%`;

  // Update time display
  const currentMinutes = Math.floor(currentTime / 60);
  const currentSeconds = Math.floor(currentTime % 60)
    .toString()
    .padStart(2, "0");
  currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
});

// Set progress when clicked on progress bar
progressContainer.addEventListener("click", (e) => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
});

// Update duration time
audio.addEventListener("loadedmetadata", () => {
  const durationMinutes = Math.floor(audio.duration / 60);
  const durationSeconds = Math.floor(audio.duration % 60)
    .toString()
    .padStart(2, "0");
  durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
});

// Reset when song ends
audio.addEventListener("ended", () => {
  if (!isRepeat) {
    progressBar.style.width = "0%";
    currentTimeEl.textContent = "0:00";
    playBtn.innerHTML = "▶";
  }
});
