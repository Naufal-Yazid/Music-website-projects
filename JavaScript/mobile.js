
document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
  const navLinks = document.querySelector('.nav-links');
  navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints;
}

if (isTouchDevice()) {
  document.documentElement.classList.add('touch-device');
}

document.addEventListener('DOMContentLoaded', function() {
  if (window.innerWidth <= 800) {
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      input.addEventListener('focus', function() {
        window.scrollTo(0, 0);
        document.body.style.zoom = "1.0";
      });
    });
  }
});

function setVhUnit() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener('resize', setVhUnit);
setVhUnit();