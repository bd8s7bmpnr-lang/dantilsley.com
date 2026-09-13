/* Navigation and image previews; no external scripts or tracking. */
(() => {
  document.documentElement.classList.add('js');
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('#navigation');
  toggle.hidden = false;
  const closeMenu = () => { menu.classList.remove('open'); toggle.setAttribute('aria-expanded','false'); };
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    menu.classList.toggle('open', open);
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && menu.classList.contains('open')) {closeMenu();toggle.focus();} });
  menu.addEventListener('click', e => { if(e.target.closest('a')) closeMenu(); });
  const breath = document.querySelector('.breath-toggle');
  if (breath && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    breath.hidden = false;
    breath.addEventListener('click', () => {
      const paused = document.querySelector('.breathing-demo').classList.toggle('paused');
      breath.setAttribute('aria-pressed', String(paused));
      breath.textContent = paused ? 'Resume animation' : 'Pause animation';
    });
  }
  const dialog = document.querySelector('.image-dialog');
  if (!dialog || typeof dialog.showModal !== 'function') return;
  document.querySelectorAll('.feature-art .poster, .ipad-art .poster').forEach(img => {
    const button = document.createElement('button');
    button.type='button'; button.className='gallery-button';
    button.setAttribute('aria-label','Enlarge: '+img.alt);
    img.replaceWith(button); button.append(img);
    button.addEventListener('click', () => {
      const full = dialog.querySelector('img'); full.src=img.src; full.alt=img.alt;
      dialog.showModal();
    });
  });
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', e => { if(e.target === dialog) {const b=dialog.getBoundingClientRect();if(e.clientX<b.left || e.clientX>b.right || e.clientY<b.top || e.clientY>b.bottom) dialog.close();} });
})();
