(() => {
  document.documentElement.classList.add('js');
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#navigation');
  toggle.hidden = false;
  const close = () => {nav.classList.remove('open'); toggle.setAttribute('aria-expanded','false');};
  toggle.addEventListener('click', () => {const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open);});
  nav.addEventListener('click',e=>{if(e.target.closest('a'))close();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){close();toggle.focus();}});
  const dialog=document.querySelector('.image-dialog');
  if(!dialog || typeof dialog.showModal!=='function')return;
  document.querySelectorAll('.screenshot-link').forEach(link=>link.addEventListener('click',e=>{e.preventDefault();const img=dialog.querySelector('img');img.src=link.href;img.alt=link.querySelector('img').alt;dialog.showModal();}));
  dialog.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
})();
