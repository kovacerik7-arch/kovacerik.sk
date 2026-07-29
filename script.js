const header = document.querySelector('.site-header');
const menuBtn = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
const langBtn = document.querySelector('.lang-toggle');

addEventListener('scroll', () => header.classList.toggle('scrolled', scrollY > 30));

menuBtn.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
});

document.querySelectorAll('.site-nav a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  menuBtn.setAttribute('aria-expanded', 'false');
}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

let lang = 'sk';
langBtn.addEventListener('click', () => {
  lang = lang === 'sk' ? 'en' : 'sk';
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-sk][data-en]').forEach(el => {
    el.textContent = el.dataset[lang];
  });
  langBtn.textContent = lang === 'sk' ? 'EN' : 'SK';
});

const dialog = document.querySelector('.lightbox');
const dialogImg = dialog.querySelector('img');
document.querySelectorAll('.gallery-item img').forEach(img => {
  img.parentElement.addEventListener('click', () => {
    dialogImg.src = img.src;
    dialogImg.alt = img.alt;
    dialog.showModal();
  });
});
dialog.querySelector('button').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });
