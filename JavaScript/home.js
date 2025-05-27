$(document).ready(function () {
  const slider = {
    currentIndex: 0,
    autoPlayInterval: null,
    slides: [{ src: "../Asset/banner1.png" }, { src: "../Asset/banner2.png" }, { src: "../Asset/banner3.png" }],
    speed: 2000,

    init: function () {
      this.createDots();

      $("#prev-btn").click(() => this.prevSlide());
      $("#next-btn").click(() => this.nextSlide());

      this.startAutoPlay();

      $(".music-card").hover(
        () => this.stopAutoPlay(),
        () => this.startAutoPlay()
      );
    },

    showSlide: function (index) {
      if (index >= this.slides.length) {
        index = 0;
      } else if (index < 0) {
        index = this.slides.length - 1;
      }
      this.currentIndex = index;
      $("#banner").attr("src", this.slides[index].src);
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

  slider.init();
});

// hero
$(document).ready(function () {
  // Initially hide the elements
  $(".hero-text, .hero h1, .hero p").css({
    opacity: "0",
    transform: "translateY(20px)",
  });

  // Animate them in sequence
  $(".hero-text").animate(
    {
      opacity: 1,
      translateY: "0px",
    },
    600,
    function () {
      $(".hero h1").animate(
        {
          opacity: 1,
          translateY: "0px",
        },
        600,
        function () {
          $(".hero p").animate(
            {
              opacity: 0.9,
              translateY: "0px",
            },
            700
          );
        }
      );
    }
  );
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

function toggleMenu() {
  const menu = document.getElementById("menu");
  menu.classList.toggle("active");
  document.querySelector(".hamburger").classList.toggle("active");
}

document.addEventListener("DOMContentLoaded", function () {
  const albums = document.querySelectorAll(".top-album");

  const audio = new Audio();
  let currentlyPlaying = null;

  albums.forEach((album) => {
    const playBtn = document.createElement("button");
    playBtn.className = "play-btn";
    playBtn.innerHTML = "▶";
    playBtn.style.display = "none";
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

    album.style.position = "relative";
    album.appendChild(playBtn);

    album.addEventListener("mouseenter", () => {
      playBtn.style.display = "block";
    });
    album.addEventListener("mouseleave", () => {
      if (currentlyPlaying !== album) {
        playBtn.style.display = "none";
      }
    });

    playBtn.addEventListener("click", (e) => {
      e.stopPropagation();

      if (currentlyPlaying === album) {
        audio.pause();
        currentlyPlaying = null;
        playBtn.innerHTML = "▶";
        return;
      }

      currentlyPlaying = album;

      document.querySelectorAll(".play-btn").forEach((btn) => {
        btn.innerHTML = "▶";
      });

      playBtn.innerHTML = "❚❚";

      const trackUrl = getTrackUrl(album);
      audio.src = trackUrl;
      audio.play();

      playBtn.style.display = "block";
    });
  });

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
