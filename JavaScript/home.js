$(document).ready(function () {
  // Slider configuration
  const slider = {
    currentIndex: 0,
    autoPlayInterval: null,
    slides: [
      { src: "../Asset/banner1.png" },
      { src: "../Asset/banner2.png" },
      { src: "../Asset/banner3.png" },
      // Add more slides as needed
    ],
    speed: 2000, // Auto-play speed in milliseconds

    init: function () {
      // Create dots
      this.createDots();

      // Set up event handlers
      $("#prev-btn").click(() => this.prevSlide());
      $("#next-btn").click(() => this.nextSlide());

      // Start auto-play
      this.startAutoPlay();

      // Pause on hover
      $(".music-card").hover(
        () => this.stopAutoPlay(),
        () => this.startAutoPlay()
      );
    },

    showSlide: function (index) {
      // Wrap around if at ends
      if (index >= this.slides.length) {
        index = 0;
      } else if (index < 0) {
        index = this.slides.length - 1;
      }

      this.currentIndex = index;
      $("#banner").attr("src", this.slides[index].src);

      // Update active dot
      $(".dot").removeClass("active");
      $(`.dot[data-index="${index}"]`).addClass("active");
    },

    nextSlide: function () {
      this.showSlide(this.currentIndex + 1);
    },

    prevSlide: function () {
      this.showSlide(this.currentIndex - 1);
    },

    createDots: function () {
      const dotsContainer = $(".slider-dots");
      dotsContainer.empty();

      this.slides.forEach((slide, index) => {
        const dot = $('<div class="dot"></div>')
          .attr("data-index", index)
          .click(() => this.showSlide(index));

        if (index === 0) {
          dot.addClass("active");
        }

        dotsContainer.append(dot);
      });
    },

    startAutoPlay: function () {
      this.stopAutoPlay(); // Clear any existing interval
      this.autoPlayInterval = setInterval(() => this.nextSlide(), this.speed);
    },

    stopAutoPlay: function () {
      if (this.autoPlayInterval) {
        clearInterval(this.autoPlayInterval);
        this.autoPlayInterval = null;
      }
    },
  };

  // Initialize the slider
  slider.init();
});

//navbar
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

document.addEventListener("DOMContentLoaded", function () {
  // Get all album elements
  const albums = document.querySelectorAll(".top-album");

  // Create audio element (we'll reuse this for all tracks)
  const audio = new Audio();
  let currentlyPlaying = null;

  // Add hover effect to each album
  albums.forEach((album) => {
    // Create play button
    const playBtn = document.createElement("button");
    playBtn.className = "play-btn";
    playBtn.innerHTML = "▶";
    playBtn.style.display = "none"; // Hidden by default
    playBtn.style.position = "absolute";
    playBtn.style.right = "20px";
    playBtn.style.background = "rgba(0,0,0,0.7)";
    playBtn.style.border = "none";
    playBtn.style.borderRadius = "50%";
    playBtn.style.width = "40px";
    playBtn.style.height = "40px";
    playBtn.style.color = "white";
    playBtn.style.cursor = "pointer";
    playBtn.style.transition = "all 0.3s";

    // Add button to album
    album.style.position = "relative";
    album.appendChild(playBtn);

    // Mouse enter event
    album.addEventListener("mouseenter", () => {
      playBtn.style.display = "block";
    });

    // Mouse leave event
    album.addEventListener("mouseleave", () => {
      // Only hide if not currently playing this album
      if (currentlyPlaying !== album) {
        playBtn.style.display = "none";
      }
    });

    // Play button click event
    playBtn.addEventListener("click", (e) => {
      e.stopPropagation();

      // If this album is already playing, pause it
      if (currentlyPlaying === album) {
        audio.pause();
        currentlyPlaying = null;
        playBtn.innerHTML = "▶";
        return;
      }

      // Otherwise, play this album's track
      currentlyPlaying = album;

      // Update all buttons to show play icon (except this one)
      document.querySelectorAll(".play-btn").forEach((btn) => {
        btn.innerHTML = "▶";
      });

      // Set this button to show pause icon
      playBtn.innerHTML = "❚❚";

      // Get the track URL (you would replace this with actual track URLs)
      const trackUrl = getTrackUrl(album);
      audio.src = trackUrl;
      audio.play();

      // Show this button even when mouse leaves
      playBtn.style.display = "block";
    });
  });

  // When audio ends, reset the playing state
  audio.addEventListener("ended", () => {
    if (currentlyPlaying) {
      const playBtn = currentlyPlaying.querySelector(".play-btn");
      if (playBtn) {
        playBtn.innerHTML = "▶";
      }
      currentlyPlaying = null;
    }
  });

  // Function to get track URL (replace with your actual logic)
  function getTrackUrl(album) {
    // In a real implementation, you would get this from a data attribute
    // For example: album.dataset.trackUrl
    // For now, we'll use placeholder URLs

    const artist = album.querySelector(".album-artist").textContent;
    const title = album.querySelector(".album-title").textContent;

    // Return different sample tracks based on artist/album
    if (artist.includes("Weeknd")) {
      return "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
    } else if (artist.includes("Tulus")) {
      return "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3";
    } else if (artist.includes("Post Malone")) {
      return "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3";
    } else {
      return "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3";
    }
  }
});
