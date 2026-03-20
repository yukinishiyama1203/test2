/* NAV scroll */
const nav = document.getElementById('main-nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

/* Hamburger */
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');
const mobileNavClose = document.getElementById('mobile-nav-close');
hamburger.addEventListener('click', () => mobileNav.classList.add('active'));
mobileNavClose.addEventListener('click', closeMobileNav);
function closeMobileNav() { mobileNav.classList.remove('active'); }

/* FAQ accordion */
document.querySelectorAll('.faq-q').forEach(q => {
  q.addEventListener('click', () => {
    const item = q.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

/* Scroll reveal */
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
