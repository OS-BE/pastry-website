(() => {
  'use strict';
  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];
  let language = 'en';
  const say = (en, zh) => language === 'zh' ? zh : en;
  const nav = $('#main-nav');
  function setLanguage(value) {
    language = value === 'zh' ? 'zh' : 'en';
    document.documentElement.lang = language === 'zh' ? 'zh-Hans' : 'en';
    $$('[data-en][data-zh]').forEach(el => { el.textContent = el.dataset[language]; });
    $$('[data-alt-en][data-alt-zh]').forEach(el => { el.alt = language === 'en' ? el.dataset.altEn : el.dataset.altZh; });
    const title = $('title');
    if (title?.dataset[language]) document.title = title.dataset[language];
    $('#language').textContent = say('中文', 'EN');
    $('#language').setAttribute('aria-label', say('Switch to Chinese', 'Switch to English'));
    $('#menu-toggle').setAttribute('aria-label', say('Toggle navigation', '展开或收起导航'));
    nav.setAttribute('aria-label', say('Main navigation', '主导航'));
    $('.site-header .brand').setAttribute('aria-label', say('Lina.Pastry home', 'Lina.Pastry 首页'));
    $('.skip').textContent = say('Skip to content', '跳至内容');
    try { localStorage.setItem('lina-pastry-language', language); } catch {}
    document.dispatchEvent(new CustomEvent('lina:languagechange', { detail: { language } }));
  }
  let stored; try { stored = localStorage.getItem('lina-pastry-language'); } catch {}
  setLanguage(stored);
  $('#language').addEventListener('click', () => setLanguage(language === 'en' ? 'zh' : 'en'));
  $('#menu-toggle').addEventListener('click', () => { const open = nav.classList.toggle('open'); $('#menu-toggle').setAttribute('aria-expanded', String(open)); });
  $$('#main-nav a').forEach(a => a.addEventListener('click', () => { nav.classList.remove('open'); $('#menu-toggle').setAttribute('aria-expanded', 'false'); }));
  document.addEventListener('click', e => { if (!e.target.closest('.nav-services')) $$('.nav-services').forEach(d => { d.open = false; }); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { nav.classList.remove('open'); $('#menu-toggle').setAttribute('aria-expanded', 'false'); $$('.nav-services').forEach(d => { d.open = false; }); } });
  const year = $('#year'); if (year) year.textContent = new Date().getFullYear();
})();
