/* =============================================
   PetCare Plus – script.js
   ============================================= */

// ---------- Header: scroll shadow + hamburger ----------
const header = document.getElementById('header');
const hamburger = document.getElementById('hamburger');
const headerNav = document.getElementById('headerNav');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

hamburger.addEventListener('click', () => {
  const isOpen = headerNav.classList.toggle('open');
  hamburger.classList.toggle('active', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
});

// Close mobile nav when a link is clicked
headerNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    headerNav.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// ---------- Scroll Reveal ----------
const revealTargets = [
  '.section-header',
  '.problem-card',
  '.service-card',
  '.feature-item',
  '.flow-step',
  '.voice-card',
  '.faq-item',
  '.trust-bar__item',
  '.problems__solution',
];

function addRevealClass() {
  revealTargets.forEach(selector => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.classList.add('reveal');
      const delay = Math.min(i, 5);
      if (delay > 0) el.classList.add(`reveal--delay-${delay}`);
    });
  });
}

function onReveal(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}

function initReveal() {
  addRevealClass();
  const observer = new IntersectionObserver(onReveal, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px',
  });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// Run after DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initReveal);
} else {
  initReveal();
}

// ---------- Smooth active nav link highlighting ----------
const sections = document.querySelectorAll('section[id], div[id]');
const navLinks = document.querySelectorAll('.header__nav-list a[href^="#"]');

const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${id}`
          ? 'var(--color-primary)'
          : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(sec => navObserver.observe(sec));
