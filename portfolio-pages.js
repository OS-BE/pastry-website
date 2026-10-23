(() => {
  'use strict';
  const all = (selector, within = document) => [...within.querySelectorAll(selector)];
  const byId = id => document.getElementById(id);
  const language = () => document.documentElement.lang.startsWith('zh') ? 'zh' : 'en';
  const say = (en, zh) => language() === 'zh' ? zh : en;
  const pieces = all('.lp-piece');
  const dialog = byId('portfolio-dialog');
  const requestedCollection = new URLSearchParams(window.location.search).get('collection');
  let filter = ['cheesecake', 'desserts', 'bread', 'events'].includes(requestedCollection) ? requestedCollection : 'all';
  let current = 0;
  let opener;

  function refreshAccessibleText() {
    all('[data-aria-en]').forEach(el => el.setAttribute('aria-label', language() === 'zh' ? el.dataset.ariaZh : el.dataset.ariaEn));
    pieces.forEach(piece => {
      const title = piece.querySelector('h3');
      piece.querySelector('.lp-piece-open').setAttribute('aria-label', language() === 'zh' ? title.dataset.zh : title.dataset.en);
    });
    const title = document.body.dataset[language() === 'zh' ? 'titleZh' : 'titleEn'];
    if (title) document.title = title;
    if (pieces.length) updateGallery();
    if (dialog && dialog.open) showPhoto(current);
  }

  function matching() {
    return pieces.filter(piece => filter === 'all' || piece.dataset.portfolioCategory === filter);
  }

  function updateGallery() {
    const visible = matching();
    pieces.forEach(piece => { piece.hidden = !visible.includes(piece); });
    all('[data-portfolio-filter]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.portfolioFilter === filter)));
    all('[data-collection-context]').forEach(context => { context.hidden = context.dataset.collectionContext !== filter; });
    byId('portfolio-count').textContent = say(`${visible.length} ${visible.length === 1 ? 'work' : 'works'}`, `${visible.length} 件作品`);
  }

  function showPhoto(index) {
    current = index;
    const piece = pieces[index];
    const source = piece.querySelector('img');
    const heading = piece.querySelector('h3');
    const detail = piece.querySelector('.lp-piece-detail');
    const title = language() === 'zh' ? heading.dataset.zh : heading.dataset.en;
    byId('portfolio-dialog-image').src = source.getAttribute('src');
    byId('portfolio-dialog-image').alt = title;
    byId('portfolio-dialog-title').textContent = title;
    byId('portfolio-dialog-detail').textContent = language() === 'zh' ? detail.dataset.zh : detail.dataset.en;
    byId('portfolio-dialog-count').textContent = `${matching().indexOf(piece) + 1} / ${matching().length}`;
  }

  function movePhoto(direction) {
    const visible = matching();
    const index = (visible.indexOf(pieces[current]) + direction + visible.length) % visible.length;
    showPhoto(pieces.indexOf(visible[index]));
  }

  if (pieces.length && dialog) {
    all('[data-portfolio-filter]').forEach(button => button.addEventListener('click', () => {
      filter = button.dataset.portfolioFilter;
      updateGallery();
    }));
    all('[data-collection-jump]').forEach(link => link.addEventListener('click', () => {
      filter = link.dataset.collectionJump;
      updateGallery();
      const button = document.querySelector(`[data-portfolio-filter="${filter}"]`);
      if (button) button.focus({ preventScroll: true });
    }));
    all('[data-portfolio-index]').forEach(button => button.addEventListener('click', () => {
      opener = button;
      showPhoto(Number(button.dataset.portfolioIndex));
      dialog.showModal();
    }));
    byId('portfolio-close').addEventListener('click', () => dialog.close());
    byId('portfolio-previous').addEventListener('click', () => movePhoto(-1));
    byId('portfolio-next').addEventListener('click', () => movePhoto(1));
    dialog.addEventListener('keydown', event => {
      if (event.key === 'ArrowLeft') { event.preventDefault(); movePhoto(-1); }
      if (event.key === 'ArrowRight') { event.preventDefault(); movePhoto(1); }
    });
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const r = dialog.getBoundingClientRect();
      if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close();
    });
    dialog.addEventListener('close', () => { if (opener) opener.focus({ preventScroll: true }); });
  }

  document.addEventListener('lina:languagechange', refreshAccessibleText);
  new MutationObserver(refreshAccessibleText).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  refreshAccessibleText();
})();
