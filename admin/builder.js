/* ALEXIA EXPORTS page builder.
   Turns content.json into the English and Arabic pages, sitemap and robots file.
   Used by the dashboard in the browser and by tools/build.js in Node. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.AlexiaBuilder = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var ICONS = {
    citrus: '<circle cx="24" cy="24" r="17"/><circle cx="24" cy="24" r="13"/><path d="M24 11v26M11 24h26M15 15l18 18M33 15L15 33"/>',
    grapes: '<circle cx="16" cy="19" r="4.2"/><circle cx="24" cy="19" r="4.2"/><circle cx="32" cy="19" r="4.2"/><circle cx="20" cy="27" r="4.2"/><circle cx="28" cy="27" r="4.2"/><circle cx="24" cy="35" r="4.2"/><path d="M24 14.5V9M24 10c2-4 6-5 11-4-1 4-5 6-11 4z"/>',
    mango: '<path d="M10 29c0-10 8-18 20-18 5 0 8 2 8 7 0 12-8 20-19 20-6 0-9-3-9-9z"/><path d="M31 11c1-4 4-6 9-6 0 4-2 7-7 8"/>',
    onion: '<path d="M24 6c-1 7-12 10-12 24a12 12 0 0 0 24 0c0-14-11-17-12-24z"/><path d="M24 12c-6 7-6 20 0 28M24 12c6 7 6 20 0 28"/>',
    olive: '<ellipse cx="24" cy="28" rx="10" ry="13"/><circle cx="24" cy="35" r="3"/><path d="M24 15c0-4 1-7 4-10M28 7c4 0 8 1 10 5-5 1-9 0-10-5z"/>',
    oil: '<path d="M20 5h8M21 5v9l-5 8v19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V22l-5-8V5"/><path d="M16 29h16"/><path d="M24 33c-2 3-2 6 0 6s2-3 0-6z"/>',
    frozen: '<path d="M24 5v38M7.5 14.5l33 19M7.5 33.5l33-19"/><path d="M19 8l5 4 5-4M19 40l5-4 5 4M9 21l6 1-1 6M39 27l-6-1 1-6"/>',
    palm: '<path d="M24 43V22"/><path d="M24 22c-4-6-12-6-17-2M24 22c4-6 12-6 17-2M24 22c-2-8-8-12-15-12M24 22c2-8 8-12 15-12"/><circle cx="20" cy="28" r="2.2"/><circle cx="28" cy="28" r="2.2"/>',
    salt: '<path d="M24 5l15 10v17L24 43 9 32V15z"/><path d="M9 15l15 10 15-10M24 25v18"/>',
    flask: '<path d="M19 5h10M21 5v15L9 38a3 3 0 0 0 3 5h24a3 3 0 0 0 3-5L27 20V5"/><path d="M14 31h20"/>',
    can: '<ellipse cx="24" cy="12" rx="12" ry="5"/><path d="M12 12v24c0 3 5 5 12 5s12-2 12-5V12"/><path d="M12 24c0 3 5 5 12 5s12-2 12-5"/>',
    drop: '<path d="M24 5C16 15 12 21 12 28a12 12 0 0 0 24 0c0-7-4-13-12-23z"/><path d="M17 30a7 7 0 0 0 7 7"/>'
  };
  var SMALL = {
    leaf: '<path d="M5 19c0-8 6-14 15-14 0 9-6 15-14 15"/><path d="M5 19c4-4 7-7 11-9"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 4 6 4 9s-1 6-4 9c-3-3-4-6-4-9s1-6 4-9z"/>',
    tag: '<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="8.5" r="1.3"/>',
    shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
    doc: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',
    chat: '<path d="M4 5h16v11H9l-5 4z"/><path d="M8 9h8M8 12h5"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
    pin: '<path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    wa: '<path d="M4 20l1.4-4.2A8.5 8.5 0 1 1 8.3 18.7z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1.3-1.5-2-1-.8.8c-1-.4-1.8-1.2-2.2-2.2l.8-.8-1-2z"/>'
  };
  var TRUST_ICONS = ['leaf', 'globe', 'tag', 'shield', 'doc', 'chat'];

  var LANGS = {
    en: {
      lang: 'en', dir: 'ltr', other: 'ar.html', otherLabel: 'العربية', otherCode: 'ar',
      fonts: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Manrope:wght@400;600;700;800&display=swap',
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      mon3: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], arabicDigits: false
    },
    ar: {
      lang: 'ar', dir: 'rtl', other: 'index.html', otherLabel: 'English', otherCode: 'en',
      fonts: 'https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap',
      months: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
      mon3: ['ينا', 'فبر', 'مار', 'أبر', 'ماي', 'يون', 'يول', 'أغس', 'سبت', 'أكت', 'نوف', 'ديس'], arabicDigits: true
    }
  };

  function esc(s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;');
  }
  function big(name) {
    return '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICONS[name] || ICONS.citrus) + '</svg>';
  }
  function sm(name, cls) {
    return '<svg' + (cls ? ' class="' + cls + '"' : '') + ' viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (SMALL[name] || SMALL.check) + '</svg>';
  }
  function arrow() { return sm('arrow', 'arrow'); }
  function ltr(s) { return '<span class="ltr">' + s + '</span>'; }
  function digits(s) { return String(s).replace(/\D/g, ''); }
  function jsonForScript(o) { return JSON.stringify(o).replace(/</g, '\\u003c').replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029'); }

  var ROUTES = '<svg class="routes" viewBox="0 0 560 460" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' +
    '<circle class="ring" cx="150" cy="330" r="70"/><circle class="ring" cx="150" cy="330" r="140"/><circle class="ring" cx="150" cy="330" r="210"/><circle class="ring" cx="150" cy="330" r="280"/>' +
    '<path class="route" d="M150 330 Q230 130 470 110"/><path class="route" d="M150 330 Q370 230 520 260"/><path class="route" d="M150 330 Q190 150 330 60"/>' +
    '<path class="route" d="M150 330 Q60 250 70 120"/><path class="route" d="M150 330 Q290 420 400 400"/>' +
    '<g><circle class="node" cx="470" cy="110" r="4.5"/><circle class="pulse" cx="470" cy="110" r="5"/></g>' +
    '<g><circle class="node" cx="520" cy="260" r="4.5"/><circle class="pulse" cx="520" cy="260" r="5" style="animation-delay:.8s"/></g>' +
    '<g><circle class="node" cx="330" cy="60" r="4.5"/><circle class="pulse" cx="330" cy="60" r="5" style="animation-delay:1.6s"/></g>' +
    '<g><circle class="node" cx="70" cy="120" r="4.5"/><circle class="pulse" cx="70" cy="120" r="5" style="animation-delay:2.2s"/></g>' +
    '<g><circle class="node" cx="400" cy="400" r="4.5"/><circle class="pulse" cx="400" cy="400" r="5" style="animation-delay:1.1s"/></g>' +
    '<circle class="origin" cx="150" cy="330" r="8"/><circle class="pulse" cx="150" cy="330" r="8" style="stroke:var(--gold-light)"/></svg>';

  function build(content, opts) {
    opts = opts || {};
    var imageSrc = opts.imageSrc || function (p) { return p; };
    var co = content.company;
    var BASE = co.base_url.replace(/\/?$/, '/');
    var EMAIL = co.email.trim();
    var PH1 = co.phone1.trim(), PH2 = (co.phone2 || '').trim();
    var PH1T = '+' + digits(PH1), PH2T = '+' + digits(PH2);
    var WA = digits(co.whatsapp || PH1);

    function page(langKey) {
      var G = LANGS[langKey], ar = langKey === 'ar';
      var pick = function (o) { return o ? (o[langKey] || o.en || '') : ''; };
      var T = function (k) { return pick(content.text[k]); };
      var list = function (k) { return content.lists[k] || []; };
      var visible = content.products.filter(function (p) { return !p.hidden; });
      var groups = list('groups');
      var glabel = {};
      groups.forEach(function (g) { glabel[g.id] = pick(g.label); });
      var names = {};
      visible.forEach(function (p) { names[p.id] = pick(p.name); });

      var nav = list('nav').map(function (n) { return '<a class="nl" href="#' + esc(n.id) + '">' + esc(pick(n.label)) + '</a>'; }).join('');
      var trust = list('trust').map(function (t) { return '<article><div class="ico">' + sm(t.icon) + '</div><div><h3>' + esc(pick(t.title)) + '</h3><p>' + esc(pick(t.text)) + '</p></div></article>'; }).join('');
      var brief = list('brief').map(function (b) { return '<dt>' + esc(pick(b.label)) + '</dt><dd>' + esc(pick(b.value)) + '</dd>'; }).join('');
      var pills = groups.map(function (g) { return '<button class="pill" type="button" data-group="' + esc(g.id) + '" aria-pressed="' + (g.id === 'all' ? 'true' : 'false') + '">' + esc(pick(g.label)) + '</button>'; }).join('');

      var cards = visible.map(function (p) {
        var n = pick(p.name), d = pick(p.desc);
        var tags = (p.tags && p.tags[langKey] && p.tags[langKey].length ? p.tags[langKey] : (p.tags && p.tags.en) || []);
        var gl = glabel[p.group] || '';
        var text = (n + ' ' + d + ' ' + tags.join(' ') + ' ' + gl).toLowerCase();
        var photo = p.image ? '<img class="photo" src="' + esc(imageSrc(p.image)) + '" alt="' + esc(n) + '" loading="lazy">' : '';
        return '<article class="card" data-group="' + esc(p.group) + '" data-text="' + esc(text) + '">' + photo + '<div class="top"><div class="ic">' + big(p.icon) + '</div><span class="grp">' + esc(gl) + '</span></div>' +
          '<h3>' + esc(n) + '</h3><p>' + esc(d) + '</p><ul class="tags">' + tags.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul>' +
          '<button class="add" type="button" data-id="' + esc(p.id) + '" aria-pressed="false"><span class="off">' + esc(p.discuss ? T('discuss') : T('add')) + '</span><span class="on">' + esc(T('added')) + '</span>' + sm('plus') + '</button></article>';
      }).join('');

      var cal = '<div></div>';
      for (var i = 0; i < 12; i++) cal += '<div class="mh" data-m="' + (i + 1) + '">' + esc(G.mon3[i]) + '</div>';
      content.seasons.forEach(function (s) {
        cal += '<div class="rn" data-months="' + s.months.join(',') + '">' + esc(pick(s.name)) + '</div>';
        for (var m = 1; m <= 12; m++) cal += '<i data-m="' + m + '"' + (s.months.indexOf(m) > -1 ? ' class="on"' : '') + '></i>';
      });

      var ap = list('about').map(function (p) { return '<p class="lede">' + esc(pick(p.text)) + '</p>'; }).join('');
      var values = list('values').map(function (v) { return '<div><b>' + sm('check') + esc(pick(v.title)) + '</b><span>' + esc(pick(v.text)) + '</span></div>'; }).join('');
      var arDigits = '٠١٢٣٤٥٦٧٨٩';
      var steps = list('steps').map(function (s, i) {
        var n = i + 1;
        var label = ar ? String(n).split('').map(function (c) { return arDigits[Number(c)]; }).join('') : (n < 10 ? '0' + n : String(n));
        return '<li><span class="n">' + label + '</span><h3>' + esc(pick(s.title)) + '</h3><p>' + esc(pick(s.text)) + '</p></li>';
      }).join('');

      var terms = list('terms');
      var segs = list('segments');
      var tabs = terms.map(function (t) { return '<button class="tab" role="tab" type="button" id="tab-' + esc(t.id) + '" aria-controls="pn-' + esc(t.id) + '" aria-selected="false">' + esc(t.id) + '</button>'; }).join('');
      var panels = terms.map(function (t) {
        var sg = segs.map(function (s, i) { return '<div class="seg' + (t.seller.indexOf(i) > -1 ? ' s' : '') + '">' + esc(pick(s.text)) + '</div>'; }).join('');
        var badge = t.insurance ? '<span class="badge">' + esc(T('tins')) + '</span>' : '';
        return '<div class="panel" role="tabpanel" id="pn-' + esc(t.id) + '" aria-labelledby="tab-' + esc(t.id) + '" hidden><div><h3>' + esc(pick(t.title) + ' (' + t.id + ')') + '</h3><p>' + esc(pick(t.text)) + '</p></div>' +
          '<div class="flow">' + sg + '<div class="flow-key"><span><i></i>' + esc(T('tkey.0')) + '</span><span><i class="b"></i>' + esc(T('tkey.1')) + '</span></div>' + badge + '</div></div>';
      }).join('');
      var pk = list('packaging').map(function (x) { return '<li>' + esc(pick(x.text)) + '</li>'; }).join('');
      var faq = list('faq').map(function (f) { return '<details><summary>' + esc(pick(f.q)) + '</summary><p>' + esc(pick(f.a)) + '</p></details>'; }).join('');

      var pickOpts = '<option value="" selected>' + esc(T('fl.pick_ph')) + '</option>' + visible.map(function (p) { return '<option value="' + esc(p.id) + '">' + esc(pick(p.name)) + '</option>'; }).join('');
      var packopts = list('packopts').map(function (o, i) { return '<option value="' + i + '">' + esc(pick(o.text)) + '</option>'; }).join('');
      var termopts = list('termopts').map(function (o, i) { return '<option value="' + i + '">' + esc(pick(o.text)) + '</option>'; }).join('');
      var flinks = list('footerlinks').map(function (l) { return '<li><a href="#' + esc(l.id) + '">' + esc(pick(l.label)) + '</a></li>'; }).join('');
      var fcats = list('categories').map(function (c) { return '<li>' + esc(pick(c.text)) + '</li>'; }).join('');
      var checks = list('checks').map(function (c) { return '<li>' + sm('check') + esc(pick(c.text)) + '</li>'; }).join('');

      var uiObj = {}, msgObj = {};
      Object.keys(content.text).forEach(function (k) {
        if (k.indexOf('ui.') === 0) uiObj[k.slice(3)] = T(k);
        if (k.indexOf('msg.') === 0) msgObj[k.slice(4)] = T(k);
      });
      var data = { names: names, months: G.months, sep: T('s_sep'), nothing: T('s_none'), ui: uiObj, msg: msgObj, email: EMAIL, wa: WA };
      var jsonld = {
        '@context': 'https://schema.org', '@type': 'Organization', name: 'ALEXIA EXPORTS', slogan: T('bar.0'), url: BASE, logo: BASE + 'logo.png',
        email: EMAIL, telephone: PH1T, description: T('jsonld_desc'), address: { '@type': 'PostalAddress', addressCountry: 'EG' },
        contactPoint: [{ '@type': 'ContactPoint', contactType: 'sales', email: EMAIL, telephone: PH1T, availableLanguage: ['English', 'Arabic'] }]
      };
      var thisUrl = BASE + (ar ? 'ar.html' : '');
      var enUrl = BASE, arUrl = BASE + 'ar.html';
      var alt = T('alt'), title = T('title'), desc = T('desc');
      var waText = encodeURIComponent(T('wa_text'));
      var h1 = esc(T('h1a')) + ' <em>' + esc(T('h1b')) + '</em>';

      return '<!doctype html>\n' +
'<html lang="' + G.lang + '" dir="' + G.dir + '">\n<head>\n<meta charset="utf-8">\n' +
'<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n' +
'<title>' + esc(title) + '</title>\n' +
'<meta name="description" content="' + esc(desc) + '">\n<meta name="theme-color" content="#0A2A66">\n' +
'<link rel="canonical" href="' + thisUrl + '">\n' +
'<link rel="alternate" hreflang="en" href="' + enUrl + '">\n<link rel="alternate" hreflang="ar" href="' + arUrl + '">\n<link rel="alternate" hreflang="x-default" href="' + enUrl + '">\n' +
'<meta property="og:type" content="website">\n<meta property="og:site_name" content="ALEXIA EXPORTS">\n<meta property="og:title" content="' + esc(title) + '">\n<meta property="og:description" content="' + esc(desc) + '">\n' +
'<meta property="og:url" content="' + thisUrl + '">\n<meta property="og:image" content="' + BASE + 'og-image.png">\n<meta name="twitter:card" content="summary_large_image">\n' +
'<link rel="icon" type="image/png" href="favicon.png">\n<link rel="apple-touch-icon" href="apple-touch-icon.png">\n<link rel="manifest" href="manifest.webmanifest">\n' +
'<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n' +
'<link rel="stylesheet" href="' + G.fonts + '">\n<link rel="stylesheet" href="style.css">\n' +
'<script type="application/ld+json">' + jsonForScript(jsonld) + '</script>\n</head>\n<body>\n' +
'<a class="skip" href="#products">' + esc(T('skip')) + '</a>\n\n' +
'<div class="strip"><div class="wrap">\n  <span><b>✦</b> ' + esc(T('strip_l')) + '</span>\n' +
'  <span class="links"><span>' + esc(T('strip_r')) + '</span> <a href="mailto:' + esc(EMAIL) + '">' + esc(EMAIL) + '</a> <a href="tel:' + PH1T + '">' + ltr(esc(PH1)) + '</a></span>\n</div></div>\n\n' +
'<header class="top"><div class="wrap">\n' +
'  <a class="brand" href="#top" aria-label="' + esc(T('brand')) + '"><img src="logo.png" width="106" height="56" alt="' + esc(alt) + '"></a>\n' +
'  <button class="search-btn" type="button" aria-label="' + esc(T('search')) + '" aria-expanded="false" aria-controls="gsearch-bar">' + sm('search') + '</button>\n' +
'  <button class="menu-btn" type="button" aria-label="' + esc(T('menu')) + '" aria-expanded="false" aria-controls="nav"><span></span></button>\n' +
'  <nav class="main" id="nav" aria-label="' + esc(T('menu')) + '">' + nav + '\n' +
'    <a class="lang" href="' + G.other + '" hreflang="' + G.otherCode + '" lang="' + G.otherCode + '">' + G.otherLabel + '</a>\n' +
'    <a class="btn btn-gold btn-sm" href="#contact">' + esc(T('quote')) + '</a>\n  </nav>\n</div>\n  <div class="gsearch" id="gsearch-bar" hidden><div class="wrap"><div class="search">' + sm('search') + '<input id="gsearch" type="search" placeholder="' + esc(T('search_ph')) + '" aria-label="' + esc(T('search')) + '" autocomplete="off"></div></div></div>\n</header>\n\n' +
'<main id="top">\n<section class="hero">\n  <div class="wrap">\n    <div class="hero-copy">\n' +
'      <p class="eyebrow">' + esc(T('hero_eyebrow')) + '</p>\n      <h1>' + h1 + '</h1>\n      <p class="lede">' + esc(T('lede')) + '</p>\n' +
'      <div class="cta-row">\n        <a class="btn btn-gold" href="#products">' + esc(T('cta1')) + arrow() + '</a>\n        <a class="btn btn-ghost" href="#contact">' + esc(T('cta2')) + '</a>\n      </div>\n' +
'      <ul class="checks">' + checks + '</ul>\n    </div>\n    <div class="hero-visual">\n      ' + ROUTES + '\n      <span class="origin-tag">' + esc(T('origin')) + '</span>\n' +
'      <div class="brief">\n        <header><h2>' + esc(T('brief_title')) + '</h2><span class="chip">' + esc(T('brief_chip')) + '</span></header>\n        <dl>' + brief + '</dl>\n' +
'        <footer>' + sm('wa') + '<span>' + esc(T('brief_foot')) + '</span></footer>\n      </div>\n    </div>\n  </div>\n' +
'  <div class="tagline-bar"><div class="wrap"><span>' + esc(T('bar.0')) + '</span><span>' + esc(T('bar.1')) + '</span></div></div>\n</section>\n\n' +
'<div class="wrap"><div class="trust">' + trust + '</div></div>\n\n' +
'<section class="sec" id="products">\n  <div class="wrap">\n    <div class="head"><p class="eyebrow">' + esc(T('p_eye')) + '</p><h2>' + esc(T('p_h')) + '</h2><p class="lede">' + esc(T('p_lede')) + '</p></div>\n' +
'    <div class="tools">\n      <div class="filters" role="group" aria-label="' + esc(T('p_eye')) + '">' + pills + '</div>\n' +
'      <div class="search">' + sm('search') + '<input id="search" type="search" placeholder="' + esc(T('search_ph')) + '" aria-label="' + esc(T('search')) + '" autocomplete="off"></div>\n    </div>\n' +
'    <p class="count" id="count" aria-live="polite"></p>\n    <div class="grid">' + cards + '</div>\n    <p class="empty" id="empty" hidden>' + esc(T('none')) + '</p>\n' +
'    <p class="fine">' + esc(T('fine')) + '</p>\n  </div>\n</section>\n\n' +
'<section class="sec seasons" id="seasons">\n  <div class="wrap">\n    <div class="head"><p class="eyebrow">' + esc(T('s_eye')) + '</p><h2>' + esc(T('s_h')) + '</h2><p class="lede">' + esc(T('s_lede')) + '</p></div>\n' +
'    <p class="nowline" id="nowline"><span class="tag">' + esc(T('s_now')) + '</span><span class="list"></span></p>\n' +
'    <div class="scroll"><div class="cal">' + cal + '</div></div>\n' +
'    <div class="legend"><span><i></i>' + esc(T('s_key.0')) + '</span><span><i class="cur"></i>' + esc(T('s_key.1')) + '</span></div>\n' +
'    <p class="note">' + esc(T('s_note')) + '</p>\n  </div>\n</section>\n\n' +
'<section class="sec" id="about">\n  <div class="wrap about">\n    <div class="about-copy">\n      <p class="eyebrow">' + esc(T('a_eye')) + '</p>\n      <h2>' + esc(T('a_h')) + '</h2>\n      ' + ap + '\n' +
'      <a class="btn btn-navy" href="#contact">' + esc(T('a_btn')) + arrow() + '</a>\n    </div>\n' +
'    <div class="plaque"><img src="logo.png" alt="' + esc(alt) + '" width="352" height="186" loading="lazy"><p>' + esc(T('plaque')) + '</p><div class="values">' + values + '</div></div>\n  </div>\n</section>\n\n' +
'<section class="sec process" id="process">\n  <div class="wrap">\n    <div class="head"><p class="eyebrow">' + esc(T('pr_eye')) + '</p><h2>' + esc(T('pr_h')) + '</h2><p class="lede">' + esc(T('pr_lede')) + '</p></div>\n' +
'    <ol class="steps">' + steps + '</ol>\n  </div>\n</section>\n\n' +
'<section class="sec" id="terms">\n  <div class="wrap">\n    <div class="head"><p class="eyebrow">' + esc(T('t_eye')) + '</p><h2>' + esc(T('t_h')) + '</h2><p class="lede">' + esc(T('t_lede')) + '</p></div>\n' +
'    <div class="tabs" role="tablist" aria-label="' + esc(T('t_eye')) + '">' + tabs + '</div>\n    ' + panels + '\n    <p class="note">' + esc(T('tnote')) + '</p>\n' +
'    <div class="pack"><h3>' + esc(T('pk_h')) + '</h3><ul>' + pk + '</ul></div>\n  </div>\n</section>\n\n' +
'<section class="sec faq" id="faq">\n  <div class="wrap">\n    <div class="head"><p class="eyebrow">' + esc(T('f_eye')) + '</p><h2>' + esc(T('f_h')) + '</h2></div>\n    <div class="list">' + faq + '</div>\n  </div>\n</section>\n\n' +
'<section class="sec" id="contact">\n  <div class="wrap contact">\n    <div>\n      <div class="head"><p class="eyebrow">' + esc(T('c_eye')) + '</p><h2>' + esc(T('c_h')) + '</h2><p class="lede">' + esc(T('c_lede')) + '</p></div>\n      <div class="cinfo">\n' +
'        <a class="ccard" href="mailto:' + esc(EMAIL) + '"><span class="ico">' + sm('mail') + '</span><span><small>' + esc(T('c_email')) + '</small><b>' + esc(EMAIL) + '</b></span></a>\n' +
'        <a class="ccard" href="tel:' + PH1T + '"><span class="ico">' + sm('phone') + '</span><span><small>' + esc(T('c_call')) + '</small><b>' + ltr(esc(PH1)) + '</b></span></a>\n' +
(PH2 ? '        <a class="ccard" href="tel:' + PH2T + '"><span class="ico">' + sm('phone') + '</span><span><small>' + esc(T('c_more')) + '</small><b>' + ltr(esc(PH2)) + '</b></span></a>\n' : '') +
'        <div class="ccard"><span class="ico">' + sm('pin') + '</span><span><small>' + esc(T('c_based')) + '</small><b>' + esc(T('c_egypt')) + '</b></span></div>\n      </div>\n    </div>\n' +
'    <div class="formcard">\n      <h3>' + esc(T('fm_h')) + '</h3>\n      <p>' + esc(T('fm_p')) + '</p>\n      <form id="qform">\n' +
'        <div class="f"><label for="name">' + esc(T('fl.name')) + '</label><input id="name" name="name" autocomplete="name" required></div>\n' +
'        <div class="f"><label for="company">' + esc(T('fl.company')) + '</label><input id="company" name="company" autocomplete="organization" required></div>\n' +
'        <div class="f"><label for="email">' + esc(T('fl.email')) + '</label><input id="email" name="email" type="email" autocomplete="email" required dir="ltr"></div>\n' +
'        <div class="f"><label for="country">' + esc(T('fl.country')) + '</label><input id="country" name="country" autocomplete="country-name" required></div>\n' +
'        <div class="f full"><span class="lbl" id="plbl">' + esc(T('fl.products')) + '</span><div class="basket" id="basket" aria-labelledby="plbl"></div></div>\n' +
'        <div class="f full"><label for="pick">' + esc(T('fl.pick')) + '</label><select id="pick">' + pickOpts + '</select></div>\n' +
'        <div class="f"><label for="qty">' + esc(T('fl.qty')) + '</label><input id="qty" name="qty" placeholder="' + esc(T('fl.qty_ph')) + '"></div>\n' +
'        <div class="f"><label for="pack">' + esc(T('fl.pack')) + '</label><select id="pack">' + packopts + '</select></div>\n' +
'        <div class="f full"><label for="term">' + esc(T('fl.term')) + '</label><select id="term">' + termopts + '</select></div>\n' +
'        <div class="f full"><label for="message">' + esc(T('fl.message')) + '</label><textarea id="message" name="message" placeholder="' + esc(T('fl.message_ph')) + '"></textarea></div>\n' +
'        <div class="f full"><p class="err" id="err" role="alert"></p><button class="btn btn-navy" type="submit">' + esc(T('submit')) + arrow() + '</button><p class="hint">' + esc(T('wnote')) + '</p></div>\n' +
'        <div class="result" id="result" hidden>\n          <strong>' + esc(T('r_h')) + '</strong>\n          <textarea id="msg" readonly aria-label="' + esc(T('r_h')) + '"></textarea>\n          <div class="acts">\n' +
'            <a class="btn btn-gold btn-sm" id="send-wa" href="https://wa.me/' + WA + '" target="_blank" rel="noopener">' + sm('wa') + esc(T('r_wa')) + '</a>\n' +
'            <a class="btn btn-navy btn-sm" id="send-mail" href="mailto:' + esc(EMAIL) + '">' + sm('mail') + esc(T('r_mail')) + '</a>\n' +
'            <button class="btn btn-ghost btn-sm" type="button" id="copy">' + esc(T('r_copy')) + '</button>\n            <span class="copied" id="copied" aria-live="polite"></span>\n          </div>\n        </div>\n      </form>\n    </div>\n  </div>\n</section>\n</main>\n\n' +
'<footer class="site"><div class="wrap">\n  <div class="fgrid">\n    <div class="fbrand"><img src="logo.png" alt="' + esc(alt) + '" width="130" height="70" loading="lazy"><p>' + esc(T('foot_p')) + '</p></div>\n' +
'    <div><h4>' + esc(T('f_explore')) + '</h4><ul>' + flinks + '</ul></div>\n    <div><h4>' + esc(T('f_cats')) + '</h4><ul>' + fcats + '</ul></div>\n' +
'    <div><h4>' + esc(T('f_contact')) + '</h4><ul><li><a href="mailto:' + esc(EMAIL) + '">' + esc(EMAIL) + '</a></li><li><a href="tel:' + PH1T + '">' + ltr(esc(PH1)) + '</a></li>' +
(PH2 ? '<li><a href="tel:' + PH2T + '">' + ltr(esc(PH2)) + '</a></li>' : '') + '<li>' + esc(T('egypt_line')) + '</li></ul></div>\n  </div>\n' +
'  <div class="fbottom"><span>' + esc(T('copy_l')) + '</span><span>' + esc(T('copy_r')) + '</span></div>\n</div></footer>\n\n' +
'<button class="float pillb" id="pillb" type="button" hidden>' + esc(T('pill')) + ' <b>0</b></button>\n' +
'<a class="float wa" href="https://wa.me/' + WA + '?text=' + waText + '" target="_blank" rel="noopener" aria-label="' + esc(T('float_wa')) + '">' + sm('wa') + '<span class="lbl2">' + esc(T('float_wa')) + '</span></a>\n\n' +
'<script>window.ALEXIA=' + jsonForScript(data) + ';</script>\n<script src="app.js" defer></script>\n</body>\n</html>\n';
    }

    var out = {};
    out['index.html'] = page('en');
    out['ar.html'] = page('ar');
    out['sitemap.xml'] = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' +
      [BASE, BASE + 'ar.html'].map(function (u) {
        return '  <url><loc>' + u + '</loc>\n    <xhtml:link rel="alternate" hreflang="en" href="' + BASE + '"/>\n    <xhtml:link rel="alternate" hreflang="ar" href="' + BASE + 'ar.html"/></url>\n';
      }).join('') + '</urlset>\n';
    out['robots.txt'] = 'User-agent: *\nAllow: /\nSitemap: ' + BASE + 'sitemap.xml\n';
    return out;
  }

  return { build: build, ICONS: ICONS, SMALL: SMALL, ICON_NAMES: Object.keys(ICONS), TRUST_ICONS: TRUST_ICONS, LANGS: LANGS, esc: esc };
});
