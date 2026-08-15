(() => {
  const header = document.querySelector('.site-header');
  const menuButton = document.querySelector('.menu-button');
  const navLinks = document.querySelector('.nav-links');

  const setMenuOpen = open => {
    if (!menuButton || !navLinks) return;
    navLinks.classList.toggle('open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    menuButton.textContent = open ? '×' : '☰';
  };

  const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 8);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  menuButton?.addEventListener('click', () => {
    setMenuOpen(!navLinks?.classList.contains('open'));
  });

  navLinks?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    setMenuOpen(false);
  }));

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') setMenuOpen(false);
  });

  const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 }) : null;

  document.querySelectorAll('.reveal').forEach(el => {
    if (observer) {
      observer.observe(el);
    } else {
      el.classList.add('visible');
    }
  });

  const dialog = document.querySelector('#screenshot-dialog');
  const dialogImage = dialog?.querySelector('img');

  document.querySelectorAll('[data-full]').forEach(button => button.addEventListener('click', () => {
    if (!dialog || !dialogImage) return;
    dialogImage.src = button.dataset.full;
    dialogImage.alt = button.querySelector('img')?.alt || 'Heard app screenshot';
    dialog.showModal();
  }));

  dialog?.querySelector('.dialog-close')?.addEventListener('click', () => dialog.close());
  dialog?.addEventListener('click', event => {
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  dialog?.addEventListener('close', () => {
    if (dialogImage) dialogImage.removeAttribute('src');
  });

  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
})();
