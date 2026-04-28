import { initAnimations } from './animations.js';
import { initForms } from './forms.js';
import { initTracking } from './tracking.js';

document.addEventListener('DOMContentLoaded', () => {
  loadImages();
  initAnimations();
  initForms();
  initTracking();
  initMobileMenu();
  initFaq();
});

function loadImages() {
  document.querySelectorAll('img[data-src]').forEach(img => {
    img.src = img.dataset.src;
  });
}

function initMobileMenu() {
  const toggle = document.querySelector('.header__menu-toggle');
  const menu = document.querySelector('.header__mobile-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    menu.setAttribute('aria-hidden', String(!isOpen));
  });

  menu.querySelectorAll('.header__link').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      menu.setAttribute('aria-hidden', 'true');
    });
  });
}

function initFaq() {
  document.querySelectorAll('.faq__trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const expanded = trigger.getAttribute('aria-expanded') === 'true';
      const answer = document.getElementById(trigger.getAttribute('aria-controls'));
      trigger.setAttribute('aria-expanded', String(!expanded));
      if (answer) answer.hidden = expanded;
    });
  });
}
