(function () {
  'use strict';
  const track = document.querySelector('.featured-showcase__track');
  if (!track) return;
  const slides = Array.from(track.children);
  const choices = Array.from(document.querySelectorAll('[data-feature-index]'));
  const previous = document.querySelector('[data-feature-prev]');
  const next = document.querySelector('[data-feature-next]');
  const position = document.querySelector('.featured-showcase__position');
  const names = ['Heard', 'Teachin’ Time', 'Rock the Fox'];
  let current = 0;
  function sync() {
    const left = track.getBoundingClientRect().left;
    let nearest = 0;
    slides.forEach((slide, index) => {
      if (Math.abs(slide.getBoundingClientRect().left - left) < Math.abs(slides[nearest].getBoundingClientRect().left - left)) nearest = index;
    });
    current = nearest;
    choices.forEach((button, index) => {
      if (index === current) button.setAttribute('aria-current', 'true');
      else button.removeAttribute('aria-current');
      // Keep links in offscreen slides out of the keyboard tab sequence.
      slides[index].inert = index !== current;
    });
    previous.disabled = current === 0;
    next.disabled = current === slides.length - 1;
    position.textContent = '0' + (current + 1) + ' / 03 · ' + names[current];
  }
  function go(index) {
    const target = Math.max(0, Math.min(slides.length - 1, index));
    const offset = slides[target].getBoundingClientRect().left - track.getBoundingClientRect().left;
    track.scrollTo({ left: track.scrollLeft + offset, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  }
  choices.forEach((button, index) => button.addEventListener('click', () => go(index)));
  previous.addEventListener('click', () => go(current - 1));
  next.addEventListener('click', () => go(current + 1));
  track.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      go(current + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  let frame;
  track.addEventListener('scroll', () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(sync);
  }, { passive: true });
  window.addEventListener('resize', () => go(current));
  sync();
})();
