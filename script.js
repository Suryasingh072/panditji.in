/* ══════════════════════════════════════════════════
   PANDIT JI BOOKING – LUCKNOW | script.js
══════════════════════════════════════════════════ */

/* ── Navbar scroll effect ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

/* ── Hamburger menu ── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

/* ── Smooth scroll for all anchor links ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ── Scroll Reveal ── */
const revealEls = document.querySelectorAll('.reveal, .reveal-right');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObserver.observe(el));

/* ── Booking Form Submit → Thank You Popup ── */
const bookingForm   = document.getElementById('bookingForm');
const popupOverlay  = document.getElementById('popupOverlay');
const popupClose    = document.getElementById('popupClose');

bookingForm.addEventListener('submit', (e) => {
  e.preventDefault();
  popupOverlay.classList.add('active');
  bookingForm.reset();
});
popupClose.addEventListener('click', () => popupOverlay.classList.remove('active'));
popupOverlay.addEventListener('click', (e) => {
  if (e.target === popupOverlay) popupOverlay.classList.remove('active');
});

/* ── Animated counter for trust numbers ── */
function animateCounter(el, target, suffix = '') {
  let current = 0;
  const step  = Math.ceil(target / 60);
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = current + suffix;
  }, 28);
}
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const val = parseInt(el.dataset.count);
      const sfx = el.dataset.suffix || '';
      animateCounter(el, val, sfx);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

/* ── Active nav link on scroll ── */
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.getAttribute('id');
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active-link');
    if (link.getAttribute('href') === '#' + current) link.classList.add('active-link');
  });
});
