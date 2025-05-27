// 1. Mobile Menu Toggle
document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
  const navLinks = document.querySelector('.nav-links');
  navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// 2. Touch Device Detection
function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints;
}

// 3. Apply touch-specific styles
if (isTouchDevice()) {
  document.documentElement.classList.add('touch-device');
}

// 4. Prevent Zooming on Input Focus
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

// 5. Viewport Height Adjustment for Mobile
function setVhUnit() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener('resize', setVhUnit);
setVhUnit();