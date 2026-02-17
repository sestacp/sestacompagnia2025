document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("audio");
  const playPause = document.getElementById("playPause");
  const progressContainer = document.querySelector(".progress-container");
  const progressBar = document.querySelector(".progress-bar");
  const currentTimeEl = document.getElementById("currentTime");
  const durationEl = document.getElementById("duration");

  let isDragging = false;

  /* PLAY / PAUSE */
  playPause.addEventListener("click", () => {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  });

  audio.addEventListener("play", () => {
    playPause.textContent = "⏸";
    // Blocca il video se in riproduzione
    const video = document.getElementById("video");
    if (video && !video.paused) video.pause();
  });

  audio.addEventListener("pause", () => playPause.textContent = "▶");

  /* METADATA */
  audio.addEventListener("loadedmetadata", () => {
    if (!isNaN(audio.duration)) {
      durationEl.textContent = formatTime(audio.duration);
    }
  });

  /* AGGIORNA TEMPO + BARRA */
  audio.addEventListener("timeupdate", () => {
    if (!isDragging && !isNaN(audio.duration)) {
      currentTimeEl.textContent = formatTime(audio.currentTime);
      progressBar.style.width =
        (audio.currentTime / audio.duration) * 100 + "%";
    }
  });

  /* CLICK SULLA BARRA */
  progressContainer.addEventListener("click", (e) => {
    seek(e.clientX);
  });

  /* DRAG DESKTOP */
  progressContainer.addEventListener("mousedown", () => {
    isDragging = true;
  });
  document.addEventListener("mousemove", (e) => {
    if (isDragging) seek(e.clientX);
  });
  document.addEventListener("mouseup", () => {
    isDragging = false;
  });

  /* DRAG MOBILE */
  progressContainer.addEventListener("touchstart", () => {
    isDragging = true;
  });
  document.addEventListener("touchmove", (e) => {
    if (isDragging) seek(e.touches[0].clientX);
  });
  document.addEventListener("touchend", () => {
    isDragging = false;
  });

  /* SEEK LOGIC */
  function seek(clientX) {
    const rect = progressContainer.getBoundingClientRect();
    const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
    const percent = x / rect.width;

    if (!isNaN(audio.duration)) {
      audio.currentTime = percent * audio.duration;
      progressBar.style.width = percent * 100 + "%";
    }
  }

  /* FORMATTA TEMPO */
  function formatTime(time) {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
  }
});
