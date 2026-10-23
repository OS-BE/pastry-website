(() => {
  const toggle = document.querySelector('#language');
  let language = 'en';
  function setLanguage(next) {
    language = next;
    document.documentElement.lang = next === 'zh' ? 'zh-Hans' : 'en';
    document.querySelectorAll('[data-en]').forEach(el => el.textContent = el.dataset[next]);
    toggle.textContent = next === 'en' ? '中文' : 'EN';
    toggle.setAttribute('aria-label', next === 'en' ? 'Switch to Chinese' : 'Switch to English');
    document.querySelector('.skip').textContent = next === 'en' ? 'Skip to content' : '跳至内容';
    document.querySelector('#close-lightbox').setAttribute('aria-label',next === 'en' ? 'Close image' : '关闭图片');
    document.querySelectorAll('.gallery-open').forEach(btn => btn.setAttribute('aria-label',btn.parentElement.querySelector('[data-en]').textContent));
    try { localStorage.setItem('angelina-language',next); } catch {}
  }
  let saved; try { saved = localStorage.getItem('angelina-language'); } catch {}
  setLanguage(saved === 'zh' ? 'zh' : 'en');
  toggle.addEventListener('click', () => setLanguage(language === 'en' ? 'zh' : 'en'));
  document.querySelector('#year').textContent = new Date().getFullYear();
  const dialog = document.querySelector('#lightbox');
  document.querySelectorAll('.gallery-open').forEach(btn => btn.addEventListener('click',() => {
    const source = btn.querySelector('img');
    const image = document.querySelector('#lightbox-image');
    image.src = source.src; image.alt = btn.getAttribute('aria-label');
    document.querySelector('#lightbox-caption').textContent = image.alt;
    dialog.showModal();
  }));
  document.querySelector('#close-lightbox').addEventListener('click',() => dialog.close());
  dialog.addEventListener('click',e => { if(e.target === dialog) {const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();} });
})();
