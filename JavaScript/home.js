// Slider
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
      this.stopAutoPlay(); 
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
  $(".hero-text, .hero h1, .hero p").css({
    opacity: "0",
    transform: "translateY(20px)",
  });

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


// Music Album
document.addEventListener("DOMContentLoaded", function () {
  const albumSongs = {
    "Dawn FM": "../Asset/The Weeknd - Dawn FM.mp3",
    "Manusia": "../Asset/TULUS - Manusia Kuat.mp3",
    "a Beautiful Blur": "../Asset/cause you have to.mp3",
    "The 1975": "../Asset/The 1975 - About You.mp3",
  };

  const audioPlayer = new Audio();
  let currentPlayingAlbum = null;

  const albums = document.querySelectorAll(".top-album");

  albums.forEach((album) => {
    const playBtn = document.createElement("button");
    playBtn.className = "play-btn";
    playBtn.innerHTML = '<i class="fas fa-play"></i>';

    album.appendChild(playBtn);

    const albumTitle = album.querySelector(".album-title").textContent;

    playBtn.addEventListener("click", function (e) {
      e.stopPropagation();

      if (currentPlayingAlbum === album && !audioPlayer.paused) {
        audioPlayer.pause();
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
        currentPlayingAlbum = null;
        return;
      }

      if (currentPlayingAlbum && currentPlayingAlbum !== album) {
        const prevPlayBtn = currentPlayingAlbum.querySelector(".play-btn");
        prevPlayBtn.innerHTML = '<i class="fas fa-play"></i>';
      }

      audioPlayer.src = albumSongs[albumTitle];

      audioPlayer
        .play()
        .then(() => {
          playBtn.innerHTML = '<i class="fas fa-pause"></i>';
          currentPlayingAlbum = album;
        })
        .catch((error) => {
          console.error("Error playing audio:", error);
        });
    });

    audioPlayer.addEventListener("ended", function () {
      playBtn.innerHTML = '<i class="fas fa-play"></i>';
      currentPlayingAlbum = null;
    });

    audioPlayer.addEventListener("pause", function () {
      if (currentPlayingAlbum === album) {
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
      }
    });
  });

  const fontAwesome = document.createElement("link");
  fontAwesome.rel = "stylesheet";
  fontAwesome.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css";
  document.head.appendChild(fontAwesome);
});
