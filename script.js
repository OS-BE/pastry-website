(() => {
  'use strict';
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];
  let language = 'en';
  let filter = 'all';
  let expanded = false;
  let currentIndex = 0;
  let toastTimer;
  const works = $$('.work');
  const dialog = $('#lightbox');
  const say = (en, zh) => language === 'en' ? en : zh;
  const toast = text => { $('#toast').textContent = text; $('#toast').classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => $('#toast').classList.remove('show'), 3500); };
  function renderGallery() {
    const matching = works.filter(w => filter === 'all' || w.dataset.category === filter);
    works.forEach(w => w.hidden = !matching.includes(w) || (!expanded && matching.indexOf(w) >= 6));
    $('#show-more').hidden = matching.length <= 6 || expanded;
    $('#gallery-count').textContent = say(`${Math.min(expanded ? matching.length : 6, matching.length)} of ${matching.length} creations`, `${Math.min(expanded ? matching.length : 6, matching.length)} / ${matching.length} 件作品`);
  }
  function setLanguage(next) {
    language = next;
    document.documentElement.lang = next === 'zh' ? 'zh-Hans' : 'en';
    $$('[data-en]').forEach(el => el.textContent = el.dataset[next]);
    $$('[data-alt-en]').forEach(el => el.alt = next === 'en' ? el.dataset.altEn : el.dataset.altZh);
    $('.brand').setAttribute('aria-label',say('LINA.Pastry home','LINA.Pastry 首页'));
    $('.scroll-cue').setAttribute('aria-label',say('Explore services','了解合作服务'));
    const film = $('video'); if(film)film.setAttribute('aria-label',say('Pastry preparation film','甜品制作短片'));
    $('#language').textContent = say('中文', 'EN');
    $('#language').setAttribute('aria-label',say('Switch to Chinese','Switch to English'));
    $('.skip').textContent = say('Skip to content','跳至内容');
    $('#main-nav').setAttribute('aria-label',say('Main navigation','主导航'));
    $('.filters').setAttribute('aria-label',say('Filter creations','筛选作品'));
    $('#menu-toggle').setAttribute('aria-label',say('Toggle navigation','展开或收起导航'));
    $('#close-lightbox').setAttribute('aria-label',say('Close image','关闭图片'));
    $('#previous-photo').setAttribute('aria-label',say('Previous image','上一张'));
    $('#next-photo').setAttribute('aria-label',say('Next image','下一张'));
    works.forEach(w => w.querySelector('button').setAttribute('aria-label',w.querySelector('h3').textContent));
    document.title = say('LINA.Pastry | Pastry consulting & venue experiences','LINA.Pastry | 甜品顾问与场地活动体验');
    try { localStorage.setItem('lina-pastry-language', next); } catch {}
    renderGallery();
    if (dialog.open) showPhoto(currentIndex);
    updateMotionLabel();
  }
  let saved; try { saved = localStorage.getItem('lina-pastry-language') || localStorage.getItem('angelina-language'); } catch {}
  setLanguage(saved === 'zh' ? 'zh' : 'en');
  $('#language').addEventListener('click', () => setLanguage(language === 'en' ? 'zh' : 'en'));
  $('#year').textContent = new Date().getFullYear();
  function updateMotionLabel() {
    const film = $('#craft-film'); const control = $('#motion-toggle');
    if (!film || !control) return;
    control.textContent = film.paused ? say('Resume motion', '继续动画') : say('Pause motion', '暂停动画');
    control.setAttribute('aria-label', control.textContent);
  }
  const film = $('#craft-film');
  if (film) {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let manuallyPaused = reducedMotion.matches;
    film.muted = true;
    if (manuallyPaused) film.pause();
    film.addEventListener('play', updateMotionLabel); film.addEventListener('pause', updateMotionLabel);
    $('#motion-toggle').addEventListener('click', () => {
      if (film.paused) { manuallyPaused = false; film.play().catch(updateMotionLabel); }
      else { manuallyPaused = true; film.pause(); }
    });
    new IntersectionObserver(entries => { for (const entry of entries) {
      if (entry.isIntersecting && !manuallyPaused) film.play().catch(updateMotionLabel);
      else film.pause();
    } }, { threshold: 0.1 }).observe(film);
    updateMotionLabel();
  }

  const menu = $('#main-nav');
  $('#menu-toggle').addEventListener('click', () => {const open = menu.classList.toggle('open');$('#menu-toggle').setAttribute('aria-expanded',String(open));});
  $$('#main-nav a').forEach(a => a.addEventListener('click', () => {menu.classList.remove('open');$('#menu-toggle').setAttribute('aria-expanded','false');}));
  document.addEventListener('keydown', e => {if(e.key === 'Escape'){menu.classList.remove('open');$('#menu-toggle').setAttribute('aria-expanded','false');}});
  $$('.filter').forEach(button => button.addEventListener('click', () => {
    filter = button.dataset.filter; expanded = false;
    $$('.filter').forEach(b => {b.classList.toggle('active',b === button);b.setAttribute('aria-pressed',String(b === button));});renderGallery();
  }));
  $('#show-more').addEventListener('click', () => {const firstNew = works.filter(w => filter === 'all' || w.dataset.category === filter)[6];expanded = true;renderGallery();if(firstNew)firstNew.querySelector('button').focus({preventScroll:true});});
  function showPhoto(index) {
    currentIndex = index;
    const w = works[index];
    $('#lightbox-image').src = w.querySelector('img').getAttribute('src');
    $('#lightbox-image').alt = w.querySelector('h3').textContent;
    $('#lightbox-title').textContent = w.querySelector('h3').textContent;
    $('#lightbox-detail').textContent = w.querySelector('figcaption p').textContent;
    const matching = works.filter(w => filter === 'all' || w.dataset.category === filter);
    $('#lightbox-counter').textContent = `${matching.indexOf(w)+1} / ${matching.length}`;
  }
  function movePhoto(direction) {const matching = works.filter(w => filter === 'all' || w.dataset.category === filter);const next = (matching.indexOf(works[currentIndex])+direction+matching.length)%matching.length;showPhoto(works.indexOf(matching[next]));}
  $$('.gallery-open').forEach(button => button.addEventListener('click', () => {showPhoto(Number(button.dataset.index));dialog.showModal();}));
  $('#close-lightbox').addEventListener('click',() => dialog.close());
  $('#previous-photo').addEventListener('click',() => movePhoto(-1));
  $('#next-photo').addEventListener('click',() => movePhoto(1));
  dialog.addEventListener('keydown',e => {if(e.key === 'ArrowLeft'){e.preventDefault();movePhoto(-1);}if(e.key === 'ArrowRight'){e.preventDefault();movePhoto(1);}});
  dialog.addEventListener('click', e => {if(e.target !== dialog)return;const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();});
  $$('[data-service]').forEach(a => a.addEventListener('click',() => {$('#service-select').value = a.dataset.service;}));
  async function copyText(text) {try {await navigator.clipboard.writeText(text);return true;}catch{const box=document.createElement('textarea');box.value=text;box.style.position='fixed';box.style.opacity='0';document.body.append(box);box.select();const ok=document.execCommand('copy');box.remove();return ok;}}
  $('#copy-wechat').addEventListener('click',async () => {const ok=await copyText('+8618817793912');toast(ok?say('WeChat number copied','微信号码已复制'):say('Copy this number: +86 188 1779 3912','请复制号码：+86 188 1779 3912'));});
  const requestedService = new URLSearchParams(window.location.search).get('service');
  if (['menu','celebration','workshop','other'].includes(requestedService)) $('#service-select').value = requestedService;
  document.addEventListener('click', e => { if (!e.target.closest('.nav-services')) $$('.nav-services').forEach(d => d.open = false); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') $$('.nav-services').forEach(d => d.open = false); });
  const form = $('#project-form');
  function formStatus(en, zh) { const status = $('#form-status'); status.dataset.en = en; status.dataset.zh = zh; status.textContent = say(en, zh); }
  function brief() {
    const data = new FormData(form);
    const service = $('#service-select').selectedOptions[0].textContent;
    const lines=[say('Hello Lina, I would like to discuss a project.','Lina 您好，我希望咨询合作。'),''];
    [['Name','姓名','name'],['Venue & city','场地与城市','venue']].forEach(([en,zh,key])=>lines.push(`${say(en,zh)}: ${data.get(key)||'—'}`));
    lines.push(`${say('Project','项目')}: ${service}`);
    if(data.get('date'))lines.push(`${say('Preferred date','期望日期')}: ${data.get('date')}`);
    if(data.get('guests'))lines.push(`${say('Guests','人数')}: ${data.get('guests')}`);
    lines.push('',String(data.get('message')||''));return lines.join('\n');
  }
  form.addEventListener('submit',e => {e.preventDefault();if(!form.reportValidity())return;const body=brief();const subject=say('LINA.Pastry — project enquiry','LINA.Pastry — 合作咨询');window.location.href=`mailto:lina.shipihina@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;formStatus('Your email draft is ready. If your email app did not open, use “Copy brief” and send it by email or WeChat.','邮件草稿已准备好。如果邮件应用未打开，请点击“复制需求”，通过邮件或微信发送。');});
  $('#copy-brief').addEventListener('click',async () => {if(!form.reportValidity())return;const ok=await copyText(brief());if(ok)formStatus('Brief copied. Paste it into WeChat or an email to Lina.','需求已复制，请粘贴到微信或邮件中发送给 Lina。');else formStatus('Could not copy automatically. Please select and copy your details manually.','无法自动复制，请手动选择并复制填写内容。');});
})();
