/* ALEXIA EXPORTS · shared behaviour (English and Arabic) */
(function () {
  'use strict';
  var D = window.ALEXIA || {};
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* header: shadow on scroll, mobile menu */
  var header = $('header.top');
  var onScroll = function () { header.classList.toggle('scrolled', window.scrollY > 8); };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  var menuBtn = $('.menu-btn'), nav = $('nav.main');
  menuBtn.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  $$('nav.main a').forEach(function (a) {
    a.addEventListener('click', function () { nav.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); });
  });

  /* seasonal calendar: highlight this month and list what is in season */
  var month = new Date().getMonth() + 1;
  $$('.cal [data-m]').forEach(function (el) {
    if (Number(el.getAttribute('data-m')) === month) el.classList.add('cur');
  });
  var inSeason = $$('.cal .rn').filter(function (r) {
    return (r.getAttribute('data-months') || '').split(',').indexOf(String(month)) > -1;
  }).map(function (r) { return r.textContent; });
  var nowEl = $('#nowline');
  if (nowEl) {
    nowEl.querySelector('.tag').textContent = D.months[month - 1];
    nowEl.querySelector('.list').textContent = inSeason.length ? inSeason.join(D.sep) : D.nothing;
  }

  /* enquiry basket (remembered between pages) */
  var KEY = 'alexia_enquiry';
  var basket = [];
  try { basket = JSON.parse(localStorage.getItem(KEY) || '[]').filter(function (id) { return D.names[id]; }); } catch (e) { basket = []; }
  var save = function () { try { localStorage.setItem(KEY, JSON.stringify(basket)); } catch (e) {} };

  var basketBox = $('#basket'), pill = $('#pillb'), pillCount = $('#pillb b');
  var render = function () {
    $$('.add').forEach(function (b) { b.setAttribute('aria-pressed', basket.indexOf(b.getAttribute('data-id')) > -1 ? 'true' : 'false'); });
    basketBox.innerHTML = '';
    if (!basket.length) {
      var n = document.createElement('span'); n.className = 'none'; n.textContent = D.ui.basketEmpty; basketBox.appendChild(n);
    }
    basket.forEach(function (id) {
      var b = document.createElement('button');
      b.type = 'button'; b.setAttribute('data-id', id);
      b.setAttribute('aria-label', D.ui.remove + ' ' + D.names[id]);
      b.innerHTML = '<em></em><span aria-hidden="true">×</span>';
      b.firstChild.textContent = D.names[id]; b.firstChild.style.fontStyle = 'normal';
      basketBox.appendChild(b);
    });
    pill.hidden = basket.length === 0;
    pillCount.textContent = basket.length;
  };
  var toggle = function (id) {
    var i = basket.indexOf(id);
    if (i > -1) basket.splice(i, 1); else basket.push(id);
    save(); render();
  };
  $$('.add').forEach(function (b) { b.addEventListener('click', function () { toggle(b.getAttribute('data-id')); }); });
  basketBox.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (b) toggle(b.getAttribute('data-id'));
  });
  var pick = $('#pick');
  pick.addEventListener('change', function () {
    if (pick.value && basket.indexOf(pick.value) < 0) { basket.push(pick.value); save(); render(); }
    pick.value = '';
  });
  pill.addEventListener('click', function () { $('#contact').scrollIntoView({ behavior: 'smooth' }); });
  render();

  /* product filter and search */
  var group = 'all', q = '';
  var cards = $$('.card'), emptyEl = $('#empty'), countEl = $('#count');
  var apply = function () {
    var shown = 0;
    cards.forEach(function (c) {
      var ok = (group === 'all' || c.getAttribute('data-group') === group) &&
               (!q || c.getAttribute('data-text').indexOf(q) > -1);
      c.hidden = !ok; if (ok) shown++;
    });
    emptyEl.hidden = shown !== 0;
    countEl.textContent = D.ui.showing.replace('{n}', shown).replace('{t}', cards.length);
  };
  $$('.pill').forEach(function (p) {
    p.addEventListener('click', function () {
      group = p.getAttribute('data-group');
      $$('.pill').forEach(function (x) { x.setAttribute('aria-pressed', x === p ? 'true' : 'false'); });
      apply();
    });
  });
  $('#search').addEventListener('input', function (e) { q = e.target.value.trim().toLowerCase(); apply(); });
  apply();

  /* header search: opens a bar, filters the products and jumps to them */
  var sBtn = $('.search-btn'), sBar = $('#gsearch-bar'), sIn = $('#gsearch');
  if (sBtn && sBar && sIn) {
    var openS = function (o) {
      sBar.hidden = !o; sBtn.setAttribute('aria-expanded', o ? 'true' : 'false');
      if (o) sIn.focus();
    };
    sBtn.addEventListener('click', function () { openS(sBar.hidden); });
    sIn.addEventListener('input', function () {
      var main = $('#search'); main.value = sIn.value; main.dispatchEvent(new Event('input'));
      if (sIn.value.trim()) { var all = $('.pill[data-group="all"]'); if (all) all.click(); }
    });
    sIn.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { e.preventDefault(); $('#products').scrollIntoView({ behavior: 'smooth' }); sIn.blur(); }
      if (e.key === 'Escape') openS(false);
    });
  }

  /* media carousels: auto-rotating photos and short videos (product cards and banner) */
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  $$('.mc').forEach(function (root) {
    var slides = $$('.mc-slide', root), dots = $$('.mc-dots button', root), n = slides.length;
    var interval = Number(root.getAttribute('data-interval')) || 4000;
    var cur = 0, timer = null, visible = false, hold = false;
    var vid = function (k) { return slides[k].querySelector('video'); };
    var stop = function () { clearTimeout(timer); timer = null; };
    var go = function (k) {
      cur = (k + n) % n;
      slides.forEach(function (s, j) {
        s.classList.toggle('is-active', j === cur);
        s.setAttribute('aria-hidden', j === cur ? 'false' : 'true');
        var v = s.querySelector('video'); if (v && j !== cur) v.pause();
      });
      dots.forEach(function (d, j) { if (j === cur) d.setAttribute('aria-current', 'true'); else d.removeAttribute('aria-current'); });
      run();
    };
    var next = function () { go(cur + 1); };
    var run = function () {
      stop();
      var v = vid(cur);
      if (!visible || document.hidden) { if (v) v.pause(); return; }
      if (v) {
        if (n > 1) v.currentTime = 0;
        var p = v.play();
        if (n > 1) {
          v.onended = function () { if (!hold && visible) next(); };
          if (p && p.catch) p.catch(function () { if (!hold && !reduceMotion) timer = setTimeout(next, interval); });
          if (!reduceMotion && !hold) timer = setTimeout(next, Math.max(interval, 30000));
        } else if (p && p.catch) p.catch(function () {});
        return;
      }
      if (n > 1 && !hold && !reduceMotion) timer = setTimeout(next, interval);
    };
    if (n > 1) {
      var pv = $('.mc-prev', root), nx = $('.mc-next', root);
      pv.addEventListener('click', function () { go(cur - 1); });
      nx.addEventListener('click', function () { go(cur + 1); });
      dots.forEach(function (d, j) { d.addEventListener('click', function () { go(j); }); });
      root.addEventListener('mouseenter', function () { hold = true; stop(); });
      root.addEventListener('mouseleave', function () { hold = false; run(); });
      root.addEventListener('focusin', function () { hold = true; stop(); });
      root.addEventListener('focusout', function () { hold = false; run(); });
      var x0 = null;
      root.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
      root.addEventListener('touchend', function (e) {
        if (x0 == null) return; var dx = e.changedTouches[0].clientX - x0; x0 = null;
        if (Math.abs(dx) < 40) return;
        var rtl = document.documentElement.dir === 'rtl';
        go(cur + ((dx < 0) !== rtl ? 1 : -1));
      }, { passive: true });
    }
    var start = function (on) { visible = on; run(); };
    if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { start(es[0].isIntersecting); }, { threshold: 0.35 }).observe(root);
    else start(true);
    document.addEventListener('visibilitychange', run);
  });

  /* trade terms tabs */
  var tabs = $$('.tab'), panels = $$('.panel');
  var show = function (i, focus) {
    tabs.forEach(function (t, k) { t.setAttribute('aria-selected', k === i ? 'true' : 'false'); t.tabIndex = k === i ? 0 : -1; });
    panels.forEach(function (p, k) { p.hidden = k !== i; });
    if (focus) tabs[i].focus();
  };
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { show(i); });
    t.addEventListener('keydown', function (e) {
      var rtl = document.documentElement.dir === 'rtl';
      var next = (e.key === 'ArrowRight') !== rtl ? 1 : -1;
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); show((i + next + tabs.length) % tabs.length, true); }
    });
  });
  show(0);

  /* enquiry form */
  var form = $('#qform'), result = $('#result'), msg = $('#msg'), err = $('#err');
  var wa = $('#send-wa'), mail = $('#send-mail'), copied = $('#copied');
  var val = function (id) { return $('#' + id).value.trim(); };
  var opt = function (id) { var s = $('#' + id); return s.selectedIndex > 0 ? s.options[s.selectedIndex].text : D.ui.notSpecified; };
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    err.textContent = '';
    if (!basket.length && !val('message')) { err.textContent = D.ui.needProduct; $('#pick').focus(); return; }
    var L = D.msg;
    var lines = [
      L.hello, '',
      L.name + ': ' + val('name'),
      L.company + ': ' + val('company'),
      L.email + ': ' + val('email'),
      L.country + ': ' + val('country'),
      L.products + ': ' + (basket.length ? basket.map(function (id) { return D.names[id]; }).join(', ') : '-'),
      L.qty + ': ' + (val('qty') || '-'),
      L.pack + ': ' + opt('pack'),
      L.term + ': ' + opt('term'),
      L.message + ': ' + (val('message') || '-')
    ];
    var text = lines.join('\n');
    msg.value = text;
    wa.href = 'https://wa.me/' + D.wa + '?text=' + encodeURIComponent(text);
    mail.href = 'mailto:' + D.email + '?subject=' + encodeURIComponent(L.subject) + '&body=' + encodeURIComponent(text);
    copied.textContent = '';
    result.hidden = false;
    result.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  });
  $('#copy').addEventListener('click', function () {
    var ok = function () { copied.textContent = D.ui.copied; };
    var fb = function () { msg.focus(); msg.select(); copied.textContent = D.ui.copyFail; };
    try { navigator.clipboard.writeText(msg.value).then(ok, fb); } catch (e) { fb(); }
  });
})();
