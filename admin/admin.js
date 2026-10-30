/* ALEXIA EXPORTS dashboard. Runs entirely in the browser and publishes through the GitHub API. */
(function () {
  'use strict';
  var B = window.AlexiaBuilder;
  var $app = document.getElementById('app');

  /* ---------- interface language ---------- */
  var I = {
    en: {
      title: 'Website dashboard', signout: 'Sign out', tabs: { overview: 'Overview', products: 'Products', banner: 'Banner', seasons: 'Seasons', texts: 'Page texts', blocks: 'Sections', company: 'Contact', preview: 'Preview', publish: 'Publish', history: 'History' },
      connectH: 'Connect your website', connectP: 'This dashboard edits your website directly on GitHub. It needs a private access key (token) that only works for this one repository. You create it once.',
      s1: 'Open GitHub in Safari (desktop site) and go to Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token.',
      s2: 'Name it “Alexia dashboard”, set expiration to 1 year, and under “Repository access” choose Only select repositories → alexia-exports.',
      s3: 'Under “Repository permissions” set Contents to Read and write. Then press Generate token and copy it (starts with github_pat_).',
      s4: 'Paste it below. It is kept only in this browser. Treat it like a password and sign out on shared devices.',
      token: 'Access token', repo: 'Repository', branch: 'Branch', connect: 'Connect', connecting: 'Connecting…',
      errAuth: 'GitHub rejected the token. Check that it is copied completely and has Contents: Read and write.', errRepo: 'Repository not found. Check the name and that the token includes it.', errPush: 'The token can read but not write. Set Contents to Read and write.', errNet: 'Could not reach GitHub. Check your connection.',
      loading: 'Loading your content…', unpublished: 'You have unpublished changes', allSaved: 'Everything is published', publishNow: 'Review & publish', discard: 'Discard changes',
      products: 'Products', shown: 'Shown on site', hiddenN: 'Hidden', seasonsN: 'Seasons', missingAr: 'Missing Arabic', checkTitle: 'Content check', checkOk: 'No problems found. All fields are filled in English and Arabic.', goTo: 'Open',
      quick: 'Quick links', viewSite: 'View live website', viewAr: 'View Arabic page', backup: 'Download backup', restoreFile: 'Restore from backup file', badFile: 'This file is not a valid backup.', imported: 'Backup loaded. Review it, then publish.',
      addProduct: 'Add product', search: 'Search…', nameEn: 'Product name', desc: 'Description', tags: 'Tags (comma separated)', group: 'Category', icon: 'Icon', photo: 'Photo (optional)', upload: 'Upload photo', removePhoto: 'Remove photo', hideP: 'Hide from website', discussP: 'Button says “Discuss” instead of “Add to enquiry”', moveUp: 'Move up', moveDown: 'Move down', del: 'Delete', dup: 'Duplicate', confirmDel: 'Delete this item? This cannot be undone before publishing.', hiddenBadge: 'Hidden', newProduct: 'New product',
      photoHint: 'Photos are resized automatically. Shown on top of the product card.', noResults: 'Nothing matches.',
      mediaH: 'Photos & videos', addPhotos: 'Add photos', addVideo: 'Add video', mediaHint: 'Photos and videos play one after another automatically on the product card. Photos are resized for you. Videos: MP4, short (10–15 seconds), under 30 MB.', videoTooBig: 'This video is larger than 30 MB. Please use a shorter or compressed MP4.', processing: 'Processing…', earlier: 'Move earlier', later: 'Move later', remove: 'Remove', videoBadge: 'Video', noMedia: 'No photos or videos yet.', badMedia: 'This file type is not supported. Use JPG/PNG photos or MP4 videos.',
      bannerH: 'Website banner', bannerHint: 'Appears below the trust section on both the English and Arabic pages.', mOff: 'No banner', mFixed: 'Fixed banner (one photo or video)', mCarousel: 'Rotating banner (several photos and videos)', interval: 'Seconds per slide', slideN: 'Slide', addSlidePhoto: 'Add photo', addSlideVideo: 'Add video', replaceMedia: 'Replace file', headline: 'Headline (optional)', subtext: 'Short text (optional)', btnText: 'Button text (optional)', btnLink: 'Button link (e.g. #contact or https://…)', onlyFirst: 'Fixed mode shows only the first slide.', noSlides: 'No slides yet. Add a photo or video.', mbTotal: 'Files to upload', whatsappEn: 'WhatsApp number · English page (digits only, with country code)', whatsappAr: 'WhatsApp number · Arabic page (digits only, with country code)', waHelpH: 'WhatsApp auto-reply with the inquiry form', waHelpP: 'A website cannot detect messages inside WhatsApp, but the free WhatsApp Business app can reply automatically to every new chat. Open WhatsApp Business on each number, go to Settings → Business tools → Greeting message, switch it on, paste the text below, and choose “Everyone”. Use the English text on the English-page number and the Arabic text on the Arabic-page number.', waEnText: 'Greeting for the English-page number', waArText: 'Greeting for the Arabic-page number', copy: 'Copy',
      seasonAdd: 'Add season', seasonName: 'Product / season name', months: 'Months available', mlist: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], seasonHint: 'Highlighted months show in the website calendar. Please confirm these against your real harvest and shipping calendar.',
      textsH: 'Page texts', textsHint: 'Every sentence on the website. Orange fields have no Arabic yet, so the Arabic page will show the English text.', filter: 'Filter texts…', advanced: 'Technical texts', blocksH: 'Sections and lists', add: 'Add', itemN: 'Item',
      companyH: 'Contact details & website address', email: 'Email', phone1: 'Main phone', phone2: 'Second phone (optional)', whatsapp: 'WhatsApp number (digits only, with country code)', baseUrl: 'Website address', baseHint: 'Include the final slash. When you buy your domain, change this to https://yourdomain.com/ and publish.',
      previewH: 'Live preview', previewHint: 'This is your draft, not yet published.', phone: 'Phone', desktop: 'Desktop', refresh: 'Refresh',
      publishH: 'Publish changes', note: 'Short note (optional)', notePh: 'e.g. Added mango season', publish: 'Publish to website', nothing: 'No changes to publish.', publishing: 'Publishing…',
      merged: 'The website was changed elsewhere since you opened this page. Your edits were merged with those changes.', conflict: 'The website content was changed somewhere else since you opened this page. Publishing now will replace those changes. Continue?', done: 'Published. Your website updates in about 1–2 minutes.', failed: 'Publishing failed: ', willPublish: 'This will publish', pendingImgs: 'new photo(s)',
      historyH: 'Version history', historyHint: 'Every publish is saved. Restoring loads the old version into the editor; you still need to publish it.', restore: 'Restore this version', restored: 'Version loaded. Review it, then publish.', load: 'Load history', noHist: 'No history yet.',
      draftFound: 'Found unpublished edits from your last visit. Restore them?', copied: 'Copied', saved: 'Draft saved on this device', langBtn: 'العربية', leave: 'You have unpublished changes.'
    },
    ar: {
      title: 'لوحة تحكم الموقع', signout: 'تسجيل الخروج', tabs: { overview: 'نظرة عامة', products: 'المنتجات', banner: 'البانر', seasons: 'المواسم', texts: 'نصوص الصفحة', blocks: 'الأقسام', company: 'التواصل', preview: 'معاينة', publish: 'نشر', history: 'السجل' },
      connectH: 'اربط موقعك', connectP: 'تعدّل هذه اللوحة موقعك مباشرة على GitHub. تحتاج إلى مفتاح وصول خاص (Token) يعمل لهذا المستودع فقط. تنشئه مرة واحدة.',
      s1: 'افتح GitHub في Safari (نسخة الكمبيوتر) ثم Settings ← Developer settings ← Personal access tokens ← Fine-grained tokens ← Generate new token.',
      s2: 'سمِّه “Alexia dashboard” واجعل الصلاحية سنة، وفي “Repository access” اختر Only select repositories ← alexia-exports.',
      s3: 'في “Repository permissions” اجعل Contents على Read and write. ثم اضغط Generate token وانسخه (يبدأ بـ github_pat_).',
      s4: 'الصقه بالأسفل. يُحفظ في هذا المتصفح فقط. تعامل معه ككلمة مرور واخرج من الحساب على الأجهزة المشتركة.',
      token: 'مفتاح الوصول', repo: 'المستودع', branch: 'الفرع', connect: 'اتصال', connecting: 'جارٍ الاتصال…',
      errAuth: 'رفض GitHub المفتاح. تأكد أنه منسوخ كاملًا وأن Contents على Read and write.', errRepo: 'المستودع غير موجود. راجع الاسم وأن المفتاح يشمله.', errPush: 'المفتاح يقرأ فقط ولا يكتب. اجعل Contents على Read and write.', errNet: 'تعذر الوصول إلى GitHub. تحقق من الإنترنت.',
      loading: 'جارٍ تحميل المحتوى…', unpublished: 'لديك تغييرات غير منشورة', allSaved: 'كل شيء منشور', publishNow: 'مراجعة ونشر', discard: 'تجاهل التغييرات',
      products: 'المنتجات', shown: 'ظاهرة في الموقع', hiddenN: 'مخفية', seasonsN: 'المواسم', missingAr: 'ينقصها العربي', checkTitle: 'فحص المحتوى', checkOk: 'لا مشاكل. كل الحقول مملوءة بالإنجليزية والعربية.', goTo: 'فتح',
      quick: 'روابط سريعة', viewSite: 'عرض الموقع المنشور', viewAr: 'عرض الصفحة العربية', backup: 'تحميل نسخة احتياطية', restoreFile: 'استرجاع من ملف نسخة احتياطية', badFile: 'هذا الملف ليس نسخة احتياطية صحيحة.', imported: 'تم تحميل النسخة. راجعها ثم انشر.',
      addProduct: 'إضافة منتج', search: 'بحث…', nameEn: 'اسم المنتج', desc: 'الوصف', tags: 'الوسوم (مفصولة بفاصلة)', group: 'التصنيف', icon: 'الأيقونة', photo: 'صورة (اختياري)', upload: 'رفع صورة', removePhoto: 'حذف الصورة', hideP: 'إخفاء من الموقع', discussP: 'الزر يقول “ناقش” بدل “أضف للاستفسار”', moveUp: 'أعلى', moveDown: 'أسفل', del: 'حذف', dup: 'نسخ', confirmDel: 'حذف هذا العنصر؟ لا يمكن التراجع قبل النشر.', hiddenBadge: 'مخفي', newProduct: 'منتج جديد',
      photoHint: 'تُصغَّر الصور تلقائيًا وتظهر أعلى بطاقة المنتج.', noResults: 'لا نتائج.',
      mediaH: 'الصور والفيديو', addPhotos: 'إضافة صور', addVideo: 'إضافة فيديو', mediaHint: 'تُعرض الصور والفيديوهات تلقائيًا واحدة تلو الأخرى على بطاقة المنتج. تُصغَّر الصور تلقائيًا. الفيديو: MP4 قصير (10–15 ثانية) وأقل من 30 ميجابايت.', videoTooBig: 'حجم الفيديو أكبر من 30 ميجابايت. استخدم فيديو MP4 أقصر أو مضغوطًا.', processing: 'جارٍ المعالجة…', earlier: 'تقديم', later: 'تأخير', remove: 'حذف', videoBadge: 'فيديو', noMedia: 'لا توجد صور أو فيديوهات بعد.', badMedia: 'نوع الملف غير مدعوم. استخدم صور JPG/PNG أو فيديو MP4.',
      bannerH: 'بانر الموقع', bannerHint: 'يظهر أسفل قسم الثقة في الصفحتين العربية والإنجليزية.', mOff: 'بدون بانر', mFixed: 'بانر ثابت (صورة أو فيديو واحد)', mCarousel: 'بانر متحرك (عدة صور وفيديوهات)', interval: 'عدد الثواني لكل شريحة', slideN: 'شريحة', addSlidePhoto: 'إضافة صورة', addSlideVideo: 'إضافة فيديو', replaceMedia: 'استبدال الملف', headline: 'العنوان (اختياري)', subtext: 'نص قصير (اختياري)', btnText: 'نص الزر (اختياري)', btnLink: 'رابط الزر (مثل #contact أو https://…)', onlyFirst: 'البانر الثابت يعرض الشريحة الأولى فقط.', noSlides: 'لا توجد شرائح. أضف صورة أو فيديو.', mbTotal: 'ملفات للرفع', whatsappEn: 'رقم واتساب · الصفحة الإنجليزية (أرقام فقط مع رمز الدولة)', whatsappAr: 'رقم واتساب · الصفحة العربية (أرقام فقط مع رمز الدولة)', waHelpH: 'رد تلقائي على واتساب برابط نموذج الاستفسار', waHelpP: 'لا يستطيع الموقع رصد الرسائل داخل واتساب، لكن تطبيق WhatsApp Business المجاني يرد تلقائيًا على كل محادثة جديدة. افتح WhatsApp Business على كل رقم ← الإعدادات ← أدوات العمل ← رسالة الترحيب، فعّلها والصق النص أدناه واختر “الجميع”. استخدم النص الإنجليزي على رقم الصفحة الإنجليزية والعربي على رقم الصفحة العربية.', waEnText: 'رسالة ترحيب رقم الصفحة الإنجليزية', waArText: 'رسالة ترحيب رقم الصفحة العربية', copy: 'نسخ',
      seasonAdd: 'إضافة موسم', seasonName: 'اسم المنتج / الموسم', months: 'أشهر التوفر', mlist: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'], seasonHint: 'الأشهر المظللة تظهر في تقويم الموقع. يرجى مطابقتها مع تقويم الحصاد والشحن الفعلي لديك.',
      textsH: 'نصوص الصفحة', textsHint: 'كل جملة في الموقع. الحقول البرتقالية بلا ترجمة عربية بعد، فتظهر الإنجليزية في الصفحة العربية.', filter: 'تصفية النصوص…', advanced: 'نصوص تقنية', blocksH: 'الأقسام والقوائم', add: 'إضافة', itemN: 'عنصر',
      companyH: 'بيانات التواصل وعنوان الموقع', email: 'البريد الإلكتروني', phone1: 'الهاتف الرئيسي', phone2: 'هاتف ثانٍ (اختياري)', whatsapp: 'رقم واتساب (أرقام فقط مع رمز الدولة)', baseUrl: 'عنوان الموقع', baseHint: 'أضف الشرطة المائلة الأخيرة. عند شراء الدومين غيّره إلى https://yourdomain.com/ ثم انشر.',
      previewH: 'معاينة مباشرة', previewHint: 'هذه مسودتك وليست منشورة بعد.', phone: 'هاتف', desktop: 'كمبيوتر', refresh: 'تحديث',
      publishH: 'نشر التغييرات', note: 'ملاحظة قصيرة (اختياري)', notePh: 'مثال: إضافة موسم المانجو', publish: 'نشر على الموقع', nothing: 'لا توجد تغييرات للنشر.', publishing: 'جارٍ النشر…',
      merged: 'تغيّر الموقع من مكان آخر منذ فتحك للصفحة. تم دمج تعديلاتك مع تلك التغييرات.', conflict: 'تم تغيير محتوى الموقع من مكان آخر بعد فتحك لهذه الصفحة. النشر الآن سيستبدل تلك التغييرات. متابعة؟', done: 'تم النشر. يتحدث موقعك خلال دقيقة إلى دقيقتين.', failed: 'فشل النشر: ', willPublish: 'سيتم نشر', pendingImgs: 'صورة جديدة',
      historyH: 'سجل الإصدارات', historyHint: 'كل عملية نشر محفوظة. الاسترجاع يحمّل النسخة القديمة في المحرر وما زلت بحاجة إلى نشرها.', restore: 'استرجاع هذه النسخة', restored: 'تم تحميل النسخة. راجعها ثم انشر.', load: 'تحميل السجل', noHist: 'لا يوجد سجل بعد.',
      draftFound: 'وجدنا تعديلات غير منشورة من زيارتك السابقة. استرجاعها؟', copied: 'تم النسخ', saved: 'حُفظت المسودة على هذا الجهاز', langBtn: 'English', leave: 'لديك تغييرات غير منشورة.'
    }
  };

  /* ---------- state ---------- */
  var LS = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); return true; } catch (e) { return false; } },
    del: function (k) { try { localStorage.removeItem(k); } catch (e) {} }
  };
  var S = {
    ui: LS.get('alexia_ui') === 'ar' ? 'ar' : 'en',
    cfg: { token: LS.get('alexia_token') || '', repo: LS.get('alexia_repo') || 'mo7mdwaly-byte/alexia-exports', branch: LS.get('alexia_branch') || 'main' },
    content: null, blobs: {}, original: '', headSha: '', pending: {}, tab: 'overview', open: {}, prev: { lang: 'en', phone: false }, history: null, busy: false, log: ''
  };
  function t(k) { var d = I[S.ui]; return k.split('.').reduce(function (o, p) { return o == null ? o : o[p]; }, d) || k; }
  function normalize(c) {
    if (!c.banner || typeof c.banner !== 'object') c.banner = { mode: 'off', interval: 5, slides: [] };
    if (!Array.isArray(c.banner.slides)) c.banner.slides = [];
    if (!c.banner.mode) c.banner.mode = 'off';
    if (!c.banner.interval) c.banner.interval = 5;
    (c.products || []).forEach(function (p) {
      if (!Array.isArray(p.media)) p.media = p.image ? [{ type: 'image', src: p.image }] : [];
      p.image = '';
    });
    [['ui.prev', 'Previous', 'السابق'], ['ui.next', 'Next', 'التالي'], ['ui.slide', 'Slide {n}', 'الشريحة {n}']].forEach(function (d) { if (!c.text[d[0]]) c.text[d[0]] = { en: d[1], ar: d[2] }; });
    if (B.withDefaults) B.withDefaults(c);
    return c;
  }
  function same(a, b) { return JSON.stringify(a) === JSON.stringify(b); }
  function isObj(x) { return x && typeof x === 'object' && !Array.isArray(x); }
  /* three-way merge: keeps changes made elsewhere (theirs) and my edits (mine), relative to the version I loaded (base) */
  function merge3(base, mine, theirs) {
    if (same(mine, theirs)) return mine;
    if (base === undefined && Array.isArray(mine) && !mine.length) return theirs;
    if (same(mine, base)) return theirs;
    if (same(theirs, base)) return mine;
    if (isObj(base) && isObj(mine) && isObj(theirs)) {
      var out = {}, keys = {};
      [base, mine, theirs].forEach(function (o) { Object.keys(o).forEach(function (k) { keys[k] = 1; }); });
      Object.keys(keys).forEach(function (k) {
        var inB = k in base, inM = k in mine, inT = k in theirs;
        if (!inM && !inT) return;
        if (!inB) { out[k] = inM && inT ? merge3(undefined, mine[k], theirs[k]) : (inM ? mine[k] : theirs[k]); return; }
        if (!inM) { if (!same(theirs[k], base[k])) out[k] = theirs[k]; return; }
        if (!inT) { if (!same(mine[k], base[k])) out[k] = mine[k]; return; }
        out[k] = merge3(base[k], mine[k], theirs[k]);
      });
      return out;
    }
    return mine;
  }
  function canon(c) { return JSON.stringify(c, null, 2) + '\n'; }
  function dirty() { return !!S.content && (canon(S.content) !== S.original || Object.keys(S.pending).length > 0); }

  /* ---------- tiny DOM helper ---------- */
  function h(tag, props) {
    var el = document.createElement(tag);
    props = props || {};
    Object.keys(props).forEach(function (k) {
      var v = props[k];
      if (v == null || v === false) return;
      if (k === 'class') el.className = v;
      else if (k.slice(0, 2) === 'on') el.addEventListener(k.slice(2), v);
      else if (k === 'html') el.innerHTML = v;
      else if (k === 'value') el.value = v;
      else if (v === true) el.setAttribute(k, '');
      else el.setAttribute(k, v);
    });
    for (var i = 2; i < arguments.length; i++) add(el, arguments[i]);
    return el;
  }
  function add(el, c) {
    if (c == null || c === false) return;
    if (Array.isArray(c)) c.forEach(function (x) { add(el, x); });
    else el.appendChild(typeof c === 'string' || typeof c === 'number' ? document.createTextNode(String(c)) : c);
  }
  function toast(msg) {
    var old = document.querySelector('.toast'); if (old) old.remove();
    var el = h('div', { class: 'toast', role: 'status' }, msg); document.body.appendChild(el);
    setTimeout(function () { el.remove(); }, 2800);
  }

  /* ---------- GitHub API ---------- */
  function gh(path, opt) {
    opt = opt || {};
    var headers = { Authorization: 'Bearer ' + S.cfg.token, Accept: opt.raw ? 'application/vnd.github.raw+json' : 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28' };
    if (opt.body) headers['Content-Type'] = 'application/json';
    return fetch('https://api.github.com/repos/' + S.cfg.repo + path, { method: opt.method || 'GET', headers: headers, body: opt.body ? JSON.stringify(opt.body) : undefined, cache: 'no-store' }).then(function (r) {
      if (!r.ok) { var e = new Error('HTTP ' + r.status); e.status = r.status; return r.text().then(function (tx) { e.detail = tx; throw e; }); }
      return opt.raw ? r.text() : r.json();
    });
  }
  function fetchContent(ref) { return gh('/contents/content.json?ref=' + encodeURIComponent(ref || S.cfg.branch), { raw: true }); }

  /* ---------- helpers for bilingual objects ---------- */
  var LG = ['en', 'ar', 'fr', 'es'];
  function EMP() { return { en: '', ar: '', fr: '', es: '' }; }
  function ensureBi(o, k) { if (!o[k] || typeof o[k] !== 'object') o[k] = {}; LG.forEach(function (l) { if (o[k][l] == null) o[k][l] = ''; }); return o[k]; }
  function slug(s) { return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'item'; }
  function touch() { updateBar(); saveDraft(); }
  var draftTimer;
  function saveDraft() {
    clearTimeout(draftTimer);
    draftTimer = setTimeout(function () {
      if (!S.content) return;
      if (!dirty()) { LS.del('alexia_draft'); return; }
      if (!LS.set('alexia_draft', JSON.stringify({ content: S.content, pending: S.pending }))) LS.set('alexia_draft', JSON.stringify({ content: S.content, lost: Object.keys(S.pending) }));
    }, 600);
  }

  /* ---------- form widgets ---------- */
  function biField(obj, key, label, multi) {
    var v = ensureBi(obj, key);
    var mk = function (lang) {
      var cell = h('div', { class: 'cell' });
      var inp = h(multi ? 'textarea' : 'input', { type: multi ? null : 'text', dir: lang === 'ar' ? 'rtl' : 'ltr', lang: lang, value: v[lang], 'aria-label': label + ' (' + lang.toUpperCase() + ')' });
      var upd = function () { v[lang] = inp.value; if (lang !== 'en') cell.classList.toggle('miss', !inp.value.trim() && !!v.en.trim()); touch(); };
      inp.addEventListener('input', upd);
      if (lang !== 'en' && !(v[lang] || '').trim() && v.en.trim()) cell.classList.add('miss');
      add(cell, [inp, h('span', { class: 'tag' }, lang.toUpperCase())]);
      return cell;
    };
    return h('div', { class: 'field' }, label ? h('span', { class: 'lbl' }, label) : null, h('div', { class: 'bi-row' }, LG.map(mk)));
  }
  function strField(obj, key, label, opts) {
    opts = opts || {};
    var inp = h('input', { type: opts.type || 'text', dir: opts.dir || 'ltr', value: obj[key] == null ? '' : obj[key], autocomplete: 'off', inputmode: opts.inputmode, readonly: opts.readonly });
    inp.addEventListener('input', function () { obj[key] = inp.value; touch(); });
    return h('div', { class: 'field' }, h('label', null, label), inp, opts.hint ? h('p', { class: 'hint' }, opts.hint) : null);
  }
  function boolField(obj, key, label) {
    var c = h('input', { type: 'checkbox' }); c.checked = !!obj[key];
    c.addEventListener('change', function () { obj[key] = c.checked; touch(); render(); });
    return h('label', { class: 'chk' }, c, label);
  }
  function iconPicker(obj, key, names, small) {
    var wrap = h('div', { class: 'icons' });
    names.forEach(function (n) {
      var b = h('button', { type: 'button', 'aria-pressed': obj[key] === n ? 'true' : 'false', 'aria-label': n, title: n, html: small ? svgSm(n) : svgBig(n) });
      b.addEventListener('click', function () { obj[key] = n; Array.prototype.forEach.call(wrap.children, function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); }); touch(); });
      wrap.appendChild(b);
    });
    return h('div', { class: 'field' }, h('span', { class: 'lbl' }, t('icon')), wrap);
  }
  function svgBig(n) { return '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' + (B.ICONS[n] || '') + '</svg>'; }
  function svgSm(n) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + (B.SMALL[n] || '') + '</svg>'; }
  function move(arr, i, d) { var j = i + d; if (j < 0 || j >= arr.length) return false; var x = arr.splice(i, 1)[0]; arr.splice(j, 0, x); return true; }
  function rowActions(arr, i, onChange, opts) {
    opts = opts || {};
    return h('div', { class: 'acts' },
      h('button', { class: 'btn sm ghost', type: 'button', onclick: function () { if (move(arr, i, -1)) { onChange(); } } }, '↑ ' + t('moveUp')),
      h('button', { class: 'btn sm ghost', type: 'button', onclick: function () { if (move(arr, i, 1)) { onChange(); } } }, '↓ ' + t('moveDown')),
      opts.dup ? h('button', { class: 'btn sm ghost', type: 'button', onclick: function () { opts.dup(); } }, t('dup')) : null,
      opts.nodelete ? null : h('button', { class: 'btn sm danger', type: 'button', onclick: function () { if (confirm(t('confirmDel'))) { if (opts.onDelete) opts.onDelete(i); arr.splice(i, 1); onChange(); } } }, t('del')));
  }
  function detailsItem(id, summary, body) {
    var d = h('details', { class: 'item' }, h('summary', null, summary), h('div', { class: 'body' }, body));
    if (S.open[id]) d.open = true;
    d.addEventListener('toggle', function () { S.open[id] = d.open; });
    return d;
  }

  /* ---------- image handling ---------- */
  function resizeImage(file, max) {
    return new Promise(function (res, rej) {
      var url = URL.createObjectURL(file), img = new Image();
      img.onload = function () {
        var w = img.naturalWidth, hgt = img.naturalHeight, s = Math.min(1, max / Math.max(w, hgt));
        var c = document.createElement('canvas'); c.width = Math.round(w * s); c.height = Math.round(hgt * s);
        var cx = c.getContext('2d'); cx.fillStyle = '#fff'; cx.fillRect(0, 0, c.width, c.height); cx.drawImage(img, 0, 0, c.width, c.height);
        URL.revokeObjectURL(url);
        res(c.toDataURL('image/jpeg', 0.82).split(',')[1]);
      };
      img.onerror = function () { URL.revokeObjectURL(url); rej(new Error('image')); };
      img.src = url;
    });
  }
  function siteRoot() { try { return new URL('../', location.href).href; } catch (e) { return S.content.company.base_url; } }
  var MAX_VIDEO = 30 * 1024 * 1024;
  function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 5); }
  function readB64(file) { return new Promise(function (res, rej) { var r = new FileReader(); r.onload = function () { res(String(r.result).split(',')[1]); }; r.onerror = rej; r.readAsDataURL(file); }); }
  function addMedia(file, base, maxPx) {
    if (/^image\//.test(file.type)) {
      return resizeImage(file, maxPx).then(function (b64) { var path = 'images/' + slug(base) + '-' + uid() + '.jpg'; S.pending[path] = b64; return { type: 'image', src: path }; });
    }
    if (/^video\//.test(file.type)) {
      if (file.size > MAX_VIDEO) return Promise.reject(new Error('big'));
      var ext = file.type === 'video/webm' ? 'webm' : file.type === 'video/quicktime' ? 'mov' : 'mp4';
      return readB64(file).then(function (b64) { var path = 'videos/' + slug(base) + '-' + uid() + '.' + ext; S.pending[path] = b64; S.blobs[path] = URL.createObjectURL(file); return { type: 'video', src: path }; });
    }
    return Promise.reject(new Error('type'));
  }
  function dropMedia(path) { delete S.pending[path]; if (S.blobs[path]) { try { URL.revokeObjectURL(S.blobs[path]); } catch (e) {} delete S.blobs[path]; } }
  function mediaError(e) { alert(e && e.message === 'big' ? t('videoTooBig') : e && e.message === 'type' ? t('badMedia') : 'Error'); }
  function pickFiles(accept, multiple, onFiles) {
    var inp = h('input', { type: 'file', accept: accept, multiple: multiple ? true : null, class: 'hide' });
    document.body.appendChild(inp);
    inp.addEventListener('change', function () { var fs = Array.prototype.slice.call(inp.files); inp.remove(); if (fs.length) onFiles(fs); });
    inp.click();
  }
  function mediaTile(m, ctl) {
    var vis = m.type === 'video' ? h('video', { src: imgUrl(m.src) + '#t=0.1', muted: true, playsinline: true, preload: 'metadata' }) : h('img', { src: imgUrl(m.src), alt: '' });
    return h('div', { class: 'tile' }, vis, m.type === 'video' ? h('span', { class: 'badge vid' }, '▶ ' + t('videoBadge')) : null, h('div', { class: 'tile-acts' }, ctl));
  }
  function photoField(obj, key) {
    var wrap = h('div', { class: 'field' }, h('span', { class: 'lbl' }, t('photo')));
    if (obj[key]) wrap.appendChild(h('div', { class: 'tiles' }, mediaTile({ type: 'image', src: obj[key] }, [])));
    wrap.appendChild(h('div', { style: 'display:flex;gap:.5rem;flex-wrap:wrap' },
      h('button', { class: 'btn sm ghost', type: 'button', onclick: function () {
        pickFiles('image/*', false, function (files) { addMedia(files[0], 'pack', 1200).then(function (it) { if (obj[key]) dropMedia(obj[key]); obj[key] = it.src; touch(); render(); }, mediaError); });
      } }, t('upload')),
      obj[key] ? h('button', { class: 'btn sm danger', type: 'button', onclick: function () { dropMedia(obj[key]); obj[key] = ''; touch(); render(); } }, t('removePhoto')) : null));
    return wrap;
  }
  function mediaEditor(owner, key, o) {
    var list = owner[key] = owner[key] || [], wrap = h('div', { class: 'field' }), status = h('span', { class: 'muted small' });
    var grid = h('div', { class: 'tiles' });
    list.forEach(function (m, i) {
      grid.appendChild(mediaTile(m, [
        h('button', { class: 'btn sm ghost icon', type: 'button', 'aria-label': t('earlier'), title: t('earlier'), onclick: function () { if (move(list, i, -1)) { touch(); render(); } } }, '←'),
        h('button', { class: 'btn sm ghost icon', type: 'button', 'aria-label': t('later'), title: t('later'), onclick: function () { if (move(list, i, 1)) { touch(); render(); } } }, '→'),
        h('button', { class: 'btn sm danger icon', type: 'button', 'aria-label': t('remove'), title: t('remove'), onclick: function () { dropMedia(m.src); list.splice(i, 1); touch(); render(); } }, '✕')]));
    });
    if (!list.length) grid.appendChild(h('p', { class: 'muted small' }, t('noMedia')));
    var add = function (accept, multiple) {
      pickFiles(accept, multiple, function (files) {
        status.textContent = t('processing');
        files.reduce(function (chain, f) { return chain.then(function () { return addMedia(f, o.base, o.max).then(function (it) { list.push(it); }); }); }, Promise.resolve())
          .then(function () { touch(); render(); }, function (e) { status.textContent = ''; mediaError(e); touch(); render(); });
      });
    };
    wrap.appendChild(h('span', { class: 'lbl' }, t('mediaH')));
    wrap.appendChild(grid);
    wrap.appendChild(h('div', { class: 'acts', style: 'display:flex;gap:.5rem;flex-wrap:wrap;align-items:center' },
      h('button', { class: 'btn sm ghost', type: 'button', onclick: function () { add('image/*', true); } }, '+ ' + t('addPhotos')),
      o.video === false ? null : h('button', { class: 'btn sm ghost', type: 'button', onclick: function () { add('video/mp4,video/webm,video/quicktime,video/*', false); } }, '+ ' + t('addVideo')), status));
    wrap.appendChild(h('p', { class: 'hint' }, t('mediaHint')));
    return wrap;
  }
  function imgUrl(p) {
    if (!p) return '';
    if (S.blobs[p]) return S.blobs[p];
    if (S.pending[p]) return 'data:image/jpeg;base64,' + S.pending[p];
    return siteRoot() + p;
  }

  /* ---------- content check ---------- */
  function audit() {
    var out = [], c = S.content;
    function chk(obj, where, tab) { if (!obj) return; var en = (obj.en || '').trim(); var miss = (c.languages || LG).filter(function (l) { return l !== 'en' && !(obj[l] || '').trim(); }); if (en && miss.length) out.push({ where: where + ' [' + miss.map(function (l) { return l.toUpperCase(); }).join(', ') + ']', tab: tab }); if (!en && !(obj.ar || '').trim()) out.push({ where: where + ' (empty)', tab: tab }); }
    c.products.forEach(function (p) { chk(p.name, (p.name.en || p.id) + ' · name', 'products'); chk(p.desc, (p.name.en || p.id) + ' · description', 'products'); });
    c.seasons.forEach(function (s) { chk(s.name, 'Season: ' + (s.name.en || s.id), 'seasons'); if (!s.months.length) out.push({ where: 'Season has no months: ' + (s.name.en || s.id), tab: 'seasons' }); });
    Object.keys(c.text).forEach(function (k) { chk(c.text[k], 'Text: ' + k, 'texts'); });
    (c.banner.slides || []).forEach(function (sl, i) { ['title', 'text', 'cta'].forEach(function (f) { var v = sl[f]; chk(v, 'Banner slide ' + (i + 1) + ' · ' + f, 'banner'); }); });
    BLOCKS.forEach(function (def) {
      (c.lists[def.key] || []).forEach(function (it, i) { def.fields.forEach(function (f) { if (f.type === 'bi' || f.type === 'bit') chk(it[f.k], def.title + ' #' + (i + 1) + ' · ' + f.label, 'blocks'); }); });
    });
    return out;
  }

  /* ---------- section definitions ---------- */
  var BLOCKS = [
    { key: 'nav', title: 'Menu links', fields: [{ k: 'id', type: 'str', label: 'Section ID (products, seasons, about, process, terms, faq, contact)' }, { k: 'label', type: 'bi', label: 'Label' }], sum: function (x) { return x.label.en; }, make: function () { return { id: 'contact', label: EMP() }; } },
    { key: 'checks', title: 'Hero checklist', fields: [{ k: 'text', type: 'bi', label: 'Text' }], sum: function (x) { return x.text.en; }, make: function () { return { text: EMP() }; } },
    { key: 'brief', title: 'Hero enquiry card rows', fields: [{ k: 'label', type: 'bi', label: 'Label' }, { k: 'value', type: 'bi', label: 'Value' }], sum: function (x) { return x.label.en + ': ' + x.value.en; }, make: function () { return { label: EMP(), value: EMP() }; } },
    { key: 'trust', title: 'Trust highlights', fields: [{ k: 'icon', type: 'icon', label: 'Icon' }, { k: 'title', type: 'bi', label: 'Title' }, { k: 'text', type: 'bi', label: 'Text' }], sum: function (x) { return x.title.en; }, make: function () { return { icon: 'check', title: EMP(), text: EMP() }; } },
    { key: 'certs', title: 'Quality certifications (badges)', hint: 'Shown in the Quality assurance section. Add, rename, reorder or remove any badge.', fields: [{ k: 'icon', type: 'icon', label: 'Icon' }, { k: 'text', type: 'bi', label: 'Badge name' }], sum: function (x) { return x.text.en; }, make: function () { return { icon: 'shield', text: EMP() }; } },
    { key: 'packs', title: 'Packing solutions (cards)', hint: 'Each card can have a photo. Without a photo an icon is shown.', fields: [{ k: 'title', type: 'bi', label: 'Title' }, { k: 'text', type: 'bit', label: 'Description' }, { k: 'image', type: 'photo' }], sum: function (x) { return x.title.en; }, make: function () { return { title: EMP(), text: EMP(), image: '' }; }, onDelete: function (i) { var x = S.content.lists.packs[i]; if (x && x.image) dropMedia(x.image); } },
    { key: 'partnerpoints', title: 'Distribution partner: benefits list', fields: [{ k: 'text', type: 'bi', label: 'Text' }], sum: function (x) { return x.text.en; }, make: function () { return { text: EMP() }; } },
    { key: 'about', title: 'About paragraphs', fields: [{ k: 'text', type: 'bit', label: 'Paragraph' }], sum: function (x) { return x.text.en.slice(0, 60); }, make: function () { return { text: EMP() }; } },
    { key: 'values', title: 'About: values card', fields: [{ k: 'title', type: 'bi', label: 'Title' }, { k: 'text', type: 'bi', label: 'Text' }], sum: function (x) { return x.title.en; }, make: function () { return { title: EMP(), text: EMP() }; } },
    { key: 'steps', title: 'How it works (steps)', fields: [{ k: 'title', type: 'bi', label: 'Title' }, { k: 'text', type: 'bit', label: 'Text' }], sum: function (x) { return x.title.en; }, make: function () { return { title: EMP(), text: EMP() }; } },
    { key: 'groups', title: 'Product categories (filter buttons)', fields: [{ k: 'id', type: 'str', label: 'Category ID (lowercase, no spaces). Keep “all” first.' }, { k: 'label', type: 'bi', label: 'Label' }], sum: function (x) { return x.label.en + ' (' + x.id + ')'; }, make: function () { return { id: 'new-category', label: EMP() }; }, lock: function (x) { return x.id === 'all'; } },
    { key: 'terms', title: 'Trade terms (Incoterms)', special: 'terms', fields: [{ k: 'id', type: 'str', label: 'Code (e.g. FOB)' }, { k: 'title', type: 'bi', label: 'Name' }, { k: 'text', type: 'bit', label: 'Explanation' }, { k: 'seller', type: 'sellers', label: 'Seller covers these stages' }, { k: 'insurance', type: 'bool', label: 'Show “insurance included” badge' }], sum: function (x) { return x.id + ' · ' + x.title.en; }, make: function () { return { id: 'NEW', title: EMP(), text: EMP(), seller: [], insurance: false }; } },
    { key: 'segments', title: 'Trade terms: stages', fields: [{ k: 'text', type: 'bi', label: 'Stage' }], sum: function (x) { return x.text.en; }, make: function () { return { text: EMP() }; }, onDelete: function (i) { S.content.lists.terms.forEach(function (tm) { tm.seller = tm.seller.filter(function (n) { return n !== i; }).map(function (n) { return n > i ? n - 1 : n; }); }); } },
    { key: 'packaging', title: 'Packaging options (list)', fields: [{ k: 'text', type: 'bi', label: 'Text' }], sum: function (x) { return x.text.en; }, make: function () { return { text: EMP() }; } },
    { key: 'faq', title: 'FAQ', fields: [{ k: 'q', type: 'bi', label: 'Question' }, { k: 'a', type: 'bit', label: 'Answer' }], sum: function (x) { return x.q.en; }, make: function () { return { q: EMP(), a: EMP() }; } },
    { key: 'packopts', title: 'Enquiry form: packaging choices', hint: 'Keep the first one as “Not specified”.', fields: [{ k: 'text', type: 'bi', label: 'Choice' }], sum: function (x) { return x.text.en; }, make: function () { return { text: EMP() }; } },
    { key: 'termopts', title: 'Enquiry form: trade term choices', hint: 'Keep the first one as “Not specified”.', fields: [{ k: 'text', type: 'bi', label: 'Choice' }], sum: function (x) { return x.text.en; }, make: function () { return { text: EMP() }; } },
    { key: 'categories', title: 'Footer: categories', fields: [{ k: 'text', type: 'bi', label: 'Text' }], sum: function (x) { return x.text.en; }, make: function () { return { text: EMP() }; } },
    { key: 'footerlinks', title: 'Footer: links', fields: [{ k: 'id', type: 'str', label: 'Section ID' }, { k: 'label', type: 'bi', label: 'Label' }], sum: function (x) { return x.label.en; }, make: function () { return { id: 'contact', label: EMP() }; } }
  ];
  var TEXT_SECTIONS = [
    ['Popups (quote & quick view)', /^(qv|qm_|close$)/],
    ['Distribution partner', /^(pt_|pf\.)/],
    ['Packing solutions', /^pack_/],
    ['Page & header', /^(title|desc|alt|brand|strip_l|strip_r|quote|menu|skip)$/],
    ['Hero', /^(hero_eyebrow|h1a|h1b|lede|cta1|cta2|brief_|origin|bar\.)/],
    ['Products', /^(p_|search|none$|add$|added$|discuss$|fine$)/],
    ['Seasons', /^s_/],
    ['Quality assurance', /^q_/],
    ['About', /^(a_|plaque)/],
    ['How it works', /^pr_/],
    ['Trade terms & packaging', /^(t_|tins|tnote|pk_|tkey\.)/],
    ['FAQ', /^f_(eye|h)$/],
    ['Contact & enquiry form', /^(c_|fm_|submit|wnote|r_|float_wa|pill|fl\.)/],
    ['Footer', /^(foot_p|f_explore|f_cats|f_contact|copy_|egypt_line)/],
    ['Technical (messages, search engines)', /^(wa_text|msg\.|ui\.|jsonld_desc)/]
  ];

  /* ---------- views ---------- */
  var VIEWS = {};

  VIEWS.overview = function () {
    var c = S.content, a = audit(), box = h('div');
    box.appendChild(h('div', { class: 'stats' },
      stat(c.products.length, t('products')), stat(c.products.filter(function (p) { return !p.hidden; }).length, t('shown')),
      stat(c.products.filter(function (p) { return p.hidden; }).length, t('hiddenN')), stat(c.seasons.length, t('seasonsN')), stat(a.length, t('missingAr'))));
    var chk = h('div', { class: 'card' }, h('h3', null, t('checkTitle')));
    if (!a.length) chk.appendChild(h('p', { class: 'notice ok' }, t('checkOk')));
    else a.slice(0, 40).forEach(function (x) { chk.appendChild(h('div', { class: 'head', style: 'margin-bottom:.3rem' }, h('span', { class: 'badge warn' }, '!'), h('span', { style: 'flex:1;min-width:10rem' }, x.where), h('button', { class: 'btn sm ghost', type: 'button', onclick: function () { go(x.tab); } }, t('goTo')))); });
    if (a.length > 40) chk.appendChild(h('p', { class: 'muted small' }, '+' + (a.length - 40)));
    box.appendChild(chk);
    var base = c.company.base_url;
    var file = h('input', { type: 'file', accept: 'application/json,.json', class: 'hide' });
    file.addEventListener('change', function () {
      var f = file.files[0]; if (!f) return; var r = new FileReader();
      r.onload = function () { try { var o = JSON.parse(r.result); if (!o.products || !o.text || !o.lists || !o.company) throw 0; S.content = normalize(o); S.pending = {}; touch(); toast(t('imported')); render(); } catch (e) { alert(t('badFile')); } };
      r.readAsText(f);
    });
    box.appendChild(h('div', { class: 'card' }, h('h3', null, t('quick')), h('div', { class: 'acts', style: 'gap:.5rem;display:flex;flex-wrap:wrap' },
      h('a', { class: 'btn ghost', href: base, target: '_blank', rel: 'noopener' }, t('viewSite')),
      h('a', { class: 'btn ghost', href: base + 'ar.html', target: '_blank', rel: 'noopener' }, t('viewAr')),
      h('a', { class: 'btn ghost', href: base + 'fr.html', target: '_blank', rel: 'noopener' }, 'Français'),
      h('a', { class: 'btn ghost', href: base + 'es.html', target: '_blank', rel: 'noopener' }, 'Español'),
      h('button', { class: 'btn ghost', type: 'button', onclick: downloadBackup }, t('backup')),
      h('button', { class: 'btn ghost', type: 'button', onclick: function () { file.click(); } }, t('restoreFile')), file)));
    return box;
  };
  function stat(n, label) { return h('div', { class: 'stat' }, h('b', null, String(n)), h('span', null, label)); }
  function downloadBackup() {
    var blob = new Blob([canon(S.content)], { type: 'application/json' }), a = h('a', { href: URL.createObjectURL(blob), download: 'alexia-content-' + new Date().toISOString().slice(0, 10) + '.json' });
    document.body.appendChild(a); a.click(); a.remove();
  }
  function go(tab) { S.tab = tab; render(); window.scrollTo(0, 0); }

  VIEWS.products = function () {
    var c = S.content, box = h('div'), q = S.pq || '';
    var search = h('input', { type: 'search', placeholder: t('search'), value: q, 'aria-label': t('search') });
    var listBox = h('div');
    var paint = function () {
      listBox.innerHTML = '';
      var any = false;
      c.products.forEach(function (p, i) {
        var hay = ((p.name.en || '') + ' ' + (p.name.ar || '') + ' ' + p.id).toLowerCase();
        if (S.pq && hay.indexOf(S.pq.toLowerCase()) < 0) return;
        any = true; listBox.appendChild(productItem(p, i));
      });
      if (!any) listBox.appendChild(h('p', { class: 'muted' }, t('noResults')));
    };
    search.addEventListener('input', function () { S.pq = search.value; paint(); });
    box.appendChild(h('div', { class: 'head' }, h('h2', null, t('tabs.products')), h('button', { class: 'btn gold', type: 'button', onclick: function () {
      var p = { id: uniqueId('new-product'), group: (c.lists.groups.filter(function (g) { return g.id !== 'all'; })[0] || { id: 'fresh' }).id, icon: 'citrus', image: '', media: [], hidden: false, discuss: false, name: EMP(), desc: EMP(), tags: { en: [], ar: [], fr: [], es: [] } };
      c.products.unshift(p); S.open['p:' + p.id] = true; S.pq = ''; touch(); render();
    } }, '+ ' + t('addProduct'))));
    box.appendChild(h('div', { class: 'field' }, search));
    paint(); box.appendChild(listBox);
    return box;
  };
  function uniqueId(base) { var ids = S.content.products.map(function (p) { return p.id; }), id = base, n = 2; while (ids.indexOf(id) > -1) id = base + '-' + n++; return id; }
  function productItem(p, i) {
    var c = S.content;
    var thumb = h('span', { class: 'thumb' });
    var m0 = (p.media || [])[0];
    thumb.innerHTML = m0 && m0.type === 'image' ? '' : svgBig(p.icon);
    if (m0 && m0.type === 'image') thumb.appendChild(h('img', { src: imgUrl(m0.src), alt: '' }));
    var mcount = (p.media || []).length;
    var sum = [thumb, h('span', { class: 'tt' }, p.name.en || t('newProduct')), mcount ? h('span', { class: 'badge' }, String(mcount)) : null, p.hidden ? h('span', { class: 'badge off' }, t('hiddenBadge')) : null];
    var body = [];
    body.push(biField(p, 'name', t('nameEn')));
    body.push(biField(p, 'desc', t('desc'), true));
    LG.forEach(function (lang) {
      if (!p.tags) p.tags = { en: [], ar: [], fr: [], es: [] };
      var inp = h('input', { type: 'text', dir: lang === 'ar' ? 'rtl' : 'ltr', value: (p.tags[lang] || []).join(', ') });
      inp.addEventListener('input', function () { p.tags[lang] = inp.value.split(/[,،]/).map(function (x) { return x.trim(); }).filter(Boolean); touch(); });
      body.push(h('div', { class: 'field' }, h('label', null, t('tags') + ' · ' + lang.toUpperCase()), inp));
    });
    var sel = h('select');
    c.lists.groups.filter(function (g) { return g.id !== 'all'; }).forEach(function (g) { var o = h('option', { value: g.id }, g.label.en || g.id); if (g.id === p.group) o.selected = true; sel.appendChild(o); });
    sel.addEventListener('change', function () { p.group = sel.value; touch(); });
    body.push(h('div', { class: 'field' }, h('label', null, t('group')), sel));
    body.push(iconPicker(p, 'icon', B.ICON_NAMES, false));
    body.push(mediaEditor(p, 'media', { base: p.id, max: 1000 }));
    body.push(boolField(p, 'hidden', t('hideP')));
    body.push(boolField(p, 'discuss', t('discussP')));
    body.push(rowActions(c.products, i, function () { touch(); render(); }, { dup: function () {
      var cp = JSON.parse(JSON.stringify(p)); cp.id = uniqueId(p.id); cp.image = ''; cp.media = (p.media || []).map(function (m) { return { type: m.type, src: m.src }; }); cp.name.en += ' (copy)'; c.products.splice(i + 1, 0, cp); S.open['p:' + cp.id] = true; touch(); render();
    } }));
    return detailsItem('p:' + p.id, sum, body);
  }


  VIEWS.banner = function () {
    var b = S.content.banner, box = h('div'), slides = b.slides;
    box.appendChild(h('div', { class: 'head' }, h('h2', null, t('bannerH'))));
    box.appendChild(h('p', { class: 'hint' }, t('bannerHint')));
    var chips = h('div', { class: 'chips', style: 'margin-bottom:.9rem' });
    [['off', 'mOff'], ['fixed', 'mFixed'], ['carousel', 'mCarousel']].forEach(function (m) {
      chips.appendChild(h('button', { class: 'chip', type: 'button', 'aria-pressed': b.mode === m[0] ? 'true' : 'false', onclick: function () { b.mode = m[0]; touch(); render(); } }, t(m[1])));
    });
    box.appendChild(chips);
    if (b.mode === 'off') return box;
    if (b.mode === 'carousel') box.appendChild(h('div', { class: 'field', style: 'max-width:14rem' }, h('label', null, t('interval')), (function () {
      var inp = h('input', { type: 'number', min: 2, max: 30, value: b.interval, dir: 'ltr' }); inp.addEventListener('input', function () { b.interval = Math.max(2, Math.min(30, Number(inp.value) || 5)); touch(); }); return inp; })()));
    if (b.mode === 'fixed' && slides.length > 1) box.appendChild(h('p', { class: 'notice warn' }, t('onlyFirst')));
    var addBtn = function (label, accept) {
      return h('button', { class: 'btn gold sm', type: 'button', onclick: function () {
        pickFiles(accept, false, function (files) {
          addMedia(files[0], 'banner', 1920).then(function (it) {
            slides.push({ type: it.type, src: it.src, title: EMP(), text: EMP(), cta: EMP(), link: '' });
            S.open['bn:' + (slides.length - 1)] = true; touch(); render();
          }, mediaError);
        });
      } }, '+ ' + label);
    };
    var bar = h('div', { class: 'head' }, addBtn(t('addSlidePhoto'), 'image/*'), addBtn(t('addSlideVideo'), 'video/mp4,video/webm,video/quicktime,video/*'));
    box.appendChild(bar);
    if (!slides.length) box.appendChild(h('p', { class: 'muted' }, t('noSlides')));
    slides.forEach(function (sl, i) {
      var tile = mediaTile(sl, []);
      var body = [h('div', { class: 'tiles', style: 'margin-bottom:.8rem' }, tile,
        h('button', { class: 'btn sm ghost', type: 'button', onclick: function () {
          pickFiles('image/*,video/mp4,video/webm,video/quicktime,video/*', false, function (files) {
            addMedia(files[0], 'banner', 1920).then(function (it) { dropMedia(sl.src); sl.type = it.type; sl.src = it.src; touch(); render(); }, mediaError);
          });
        } }, t('replaceMedia'))),
        biField(sl, 'title', t('headline')), biField(sl, 'text', t('subtext')), biField(sl, 'cta', t('btnText')), strField(sl, 'link', t('btnLink'), { dir: 'ltr' }),
        rowActions(slides, i, function () { touch(); render(); }, { onDelete: function () { dropMedia(sl.src); } })];
      box.appendChild(detailsItem('bn:' + i, [h('span', { class: 'tt' }, t('slideN') + ' ' + (i + 1) + (sl.title && sl.title.en ? ' · ' + sl.title.en : '')), h('span', { class: 'badge' }, sl.type === 'video' ? t('videoBadge') : 'IMG')], body));
    });
    return box;
  };

  VIEWS.seasons = function () {
    var c = S.content, box = h('div');
    box.appendChild(h('div', { class: 'head' }, h('h2', null, t('tabs.seasons')), h('button', { class: 'btn gold', type: 'button', onclick: function () {
      var s = { id: 'season-' + Date.now().toString(36), months: [], name: EMP() }; c.seasons.push(s); S.open['s:' + s.id] = true; touch(); render();
    } }, '+ ' + t('seasonAdd'))));
    box.appendChild(h('p', { class: 'notice warn' }, t('seasonHint')));
    c.seasons.forEach(function (s, i) {
      var chips = h('div', { class: 'months' });
      t('mlist').forEach(function (name, m) {
        var b = h('button', { class: 'chip', type: 'button', 'aria-pressed': s.months.indexOf(m + 1) > -1 ? 'true' : 'false' }, name);
        b.addEventListener('click', function () {
          var k = s.months.indexOf(m + 1); if (k > -1) s.months.splice(k, 1); else s.months.push(m + 1);
          s.months.sort(function (a, b2) { return a - b2; }); b.setAttribute('aria-pressed', k > -1 ? 'false' : 'true'); touch();
        });
        chips.appendChild(b);
      });
      var on = function () { return s.months.length; };
      box.appendChild(detailsItem('s:' + s.id, [h('span', { class: 'tt' }, s.name.en || t('seasonName')), h('span', { class: 'meta' }, on() + '/12')],
        [biField(s, 'name', t('seasonName')), h('span', { class: 'lbl' }, t('months')), chips, rowActions(c.seasons, i, function () { touch(); render(); })]));
    });
    return box;
  };

  VIEWS.texts = function () {
    var c = S.content, box = h('div'), q = '';
    box.appendChild(h('div', { class: 'head' }, h('h2', null, t('textsH'))));
    box.appendChild(h('p', { class: 'hint' }, t('textsHint')));
    var f = h('input', { type: 'search', placeholder: t('filter'), 'aria-label': t('filter') });
    box.appendChild(h('div', { class: 'field' }, f));
    var holder = h('div'); box.appendChild(holder);
    var keys = Object.keys(c.text);
    var paint = function () {
      holder.innerHTML = '';
      var used = {};
      TEXT_SECTIONS.concat([['Other', /.*/]]).forEach(function (sec, si) {
        var ks = keys.filter(function (k) { return !used[k] && sec[1].test(k); });
        ks.forEach(function (k) { used[k] = 1; });
        ks = ks.filter(function (k) { var v = c.text[k]; return !q || (k + ' ' + v.en + ' ' + v.ar).toLowerCase().indexOf(q) > -1; });
        if (!ks.length) return;
        var inner = ks.map(function (k) {
          var v = ensureBi(c.text, k), long = (v.en || '').length > 70 || /^(desc|lede|p_lede|s_lede|t_lede|c_lede|foot_p|tnote|s_note|fine|wnote|fl\.message_ph|jsonld_desc|wa_text)$/.test(k);
          return h('div', null, biField(c.text, k, k.replace(/[._]/g, ' '), long));
        });
        var d = h('details', { class: 'item' }, h('summary', null, h('span', { class: 'tt' }, sec[0]), h('span', { class: 'meta' }, String(ks.length))), h('div', { class: 'body' }, inner));
        if (q || S.open['t:' + si]) d.open = true;
        d.addEventListener('toggle', function () { S.open['t:' + si] = d.open; });
        holder.appendChild(d);
      });
    };
    f.addEventListener('input', function () { q = f.value.trim().toLowerCase(); paint(); });
    paint();
    return box;
  };

  VIEWS.blocks = function () {
    var c = S.content, box = h('div');
    box.appendChild(h('div', { class: 'head' }, h('h2', null, t('blocksH'))));
    BLOCKS.forEach(function (def) {
      var arr = c.lists[def.key] || [];
      var sec = h('details', { class: 'item' });
      sec.appendChild(h('summary', null, h('span', { class: 'tt' }, def.title), h('span', { class: 'meta' }, String(arr.length))));
      var body = h('div', { class: 'body' });
      if (def.hint) body.appendChild(h('p', { class: 'hint' }, def.hint));
      arr.forEach(function (it, i) {
        var fields = def.fields.map(function (f) {
          if (f.type === 'bi') return biField(it, f.k, f.label);
          if (f.type === 'bit') return biField(it, f.k, f.label, true);
          if (f.type === 'str') return strField(it, f.k, f.label);
          if (f.type === 'icon') return iconPicker(it, f.k, B.TRUST_ICONS.concat(Object.keys(B.SMALL).filter(function (x) { return B.TRUST_ICONS.indexOf(x) < 0; })), true);
          if (f.type === 'bool') return boolField(it, f.k, f.label);
          if (f.type === 'photo') return photoField(it, f.k);
          if (f.type === 'sellers') {
            var w = h('div', { class: 'field' }, h('span', { class: 'lbl' }, f.label));
            (c.lists.segments || []).forEach(function (sg, n) {
              var cb = h('input', { type: 'checkbox' }); cb.checked = it.seller.indexOf(n) > -1;
              cb.addEventListener('change', function () { var k = it.seller.indexOf(n); if (cb.checked && k < 0) it.seller.push(n); if (!cb.checked && k > -1) it.seller.splice(k, 1); it.seller.sort(function (a, b) { return a - b; }); touch(); });
              w.appendChild(h('label', { class: 'chk' }, cb, sg.text.en || ('#' + (n + 1))));
            });
            return w;
          }
          return null;
        });
        var locked = def.lock && def.lock(it);
        var inner = h('div', null, fields, locked ? null : rowActions(arr, i, function () { touch(); render(); }, { onDelete: def.onDelete }));
        if (locked) inner.appendChild(rowActions(arr, i, function () { touch(); render(); }, { nodelete: true }));
        body.appendChild(detailsItem('b:' + def.key + ':' + i, h('span', { class: 'tt' }, def.sum(it) || (t('itemN') + ' ' + (i + 1))), inner));
      });
      body.appendChild(h('button', { class: 'btn sm gold', type: 'button', onclick: function () { if (!c.lists[def.key]) c.lists[def.key] = arr; arr.push(def.make()); S.open['b:' + def.key + ':' + (arr.length - 1)] = true; touch(); render(); } }, '+ ' + t('add')));
      if (S.open['sec:' + def.key]) sec.open = true;
      sec.addEventListener('toggle', function () { S.open['sec:' + def.key] = sec.open; });
      sec.appendChild(body); box.appendChild(sec);
    });
    return box;
  };

  function langCard() {
    var c = S.content, names = { en: 'English', ar: 'العربية', fr: 'Français', es: 'Español' };
    var card = h('div', { class: 'card' }, h('h3', null, S.ui === 'ar' ? 'لغات الموقع' : 'Website languages'), h('p', { class: 'hint' }, S.ui === 'ar' ? 'اختر اللغات التي تظهر للزوار. الإنجليزية دائمًا مفعّلة.' : 'Choose which languages visitors can switch to. English is always on.'));
    LG.forEach(function (l) {
      var cb = h('input', { type: 'checkbox' }); cb.checked = (c.languages || []).indexOf(l) > -1; if (l === 'en') cb.disabled = true;
      cb.addEventListener('change', function () { c.languages = LG.filter(function (x) { return x === 'en' || (x === l ? cb.checked : (c.languages || []).indexOf(x) > -1); }); touch(); });
      card.appendChild(h('label', { class: 'chk' }, cb, names[l]));
    });
    return card;
  }
  VIEWS.company = function () {
    var co = S.content.company, base = (co.base_url || '').replace(/\/?$/, '/');
    var texts = [
      [t('waEnText'), 'Hello, and thank you for contacting ALEXIA EXPORTS. To prepare your quote faster, please fill in our short enquiry form: ' + base + '#contact\nOr reply with your product, destination country, estimated quantity and packaging.'],
      [t('waArText'), 'أهلًا بك، وشكرًا لتواصلك مع ALEXIA EXPORTS. لتجهيز عرض السعر بشكل أسرع يرجى تعبئة نموذج الاستفسار: ' + base + 'ar.html#contact\nأو أرسل لنا المنتج والدولة والكمية التقريبية والتعبئة.'],
      ['Français', 'Bonjour, et merci de contacter ALEXIA EXPORTS. Pour préparer votre devis plus rapidement, merci de remplir notre formulaire de demande : ' + base + 'fr.html#contact\nOu répondez avec votre produit, le pays de destination, la quantité estimée et le conditionnement.'],
      ['Español', 'Hola, y gracias por contactar con ALEXIA EXPORTS. Para preparar su cotización más rápido, complete nuestro formulario de consulta: ' + base + 'es.html#contact\nO responda con su producto, país de destino, cantidad estimada y embalaje.']
    ];
    var help = h('div', { class: 'card' }, h('h3', null, t('waHelpH')), h('p', { class: 'hint' }, t('waHelpP')));
    texts.forEach(function (x, i) {
      var ta = h('textarea', { readonly: true, dir: i === 1 ? 'rtl' : 'ltr', rows: 4, value: x[1] });
      help.appendChild(h('div', { class: 'field' }, h('label', null, x[0]), ta, h('button', { class: 'btn sm ghost', type: 'button', style: 'margin-top:.4rem', onclick: function () {
        var done = function () { toast(t('copied')); }; try { navigator.clipboard.writeText(x[1]).then(done, function () { ta.select(); }); } catch (e) { ta.select(); }
      } }, t('copy'))));
    });
    return h('div', null, h('div', { class: 'head' }, h('h2', null, t('companyH'))), h('div', { class: 'card' },
      strField(co, 'email', t('email'), { type: 'email' }), h('div', { class: 'grid2' }, strField(co, 'phone1', t('phone1'), { type: 'text' }), strField(co, 'phone2', t('phone2'), { type: 'text' })),
      h('div', { class: 'grid2' }, strField(co, 'whatsapp', t('whatsappEn'), { inputmode: 'numeric' }), strField(co, 'whatsapp_ar', t('whatsappAr'), { inputmode: 'numeric' })),
      strField(co, 'base_url', t('baseUrl'), { type: 'url', hint: t('baseHint') })), langCard(), help);
  };

  VIEWS.preview = function () {
    var box = h('div'), P = S.prev;
    var frame = h('iframe', { title: 'Preview', sandbox: 'allow-scripts' });
    var wrap = h('div', { class: 'preview-wrap' + (P.phone ? ' phone' : '') }, frame);
    function paint() {
      try {
        var files = B.build(S.content, { imageSrc: imgUrl });
        var html = files[B.LANGS[P.lang] ? B.LANGS[P.lang].file : 'index.html'] || files['index.html'];
        var inject = '<base href="' + B.esc(siteRoot()) + '"><script>document.addEventListener("click",function(e){var a=e.target.closest&&e.target.closest("a");if(!a)return;var hr=a.getAttribute("href")||"";if(hr.charAt(0)==="#"){e.preventDefault();var el=document.getElementById(hr.slice(1));if(el)el.scrollIntoView({behavior:"smooth"});}else if(a.classList.contains("lang-link")){e.preventDefault();parent.postMessage({alexiaLang:a.getAttribute("hreflang")},"*");}},true);<\/script>';
        frame.srcdoc = html.replace('<head>', '<head>' + inject);
      } catch (e) { frame.srcdoc = '<p style="font:16px sans-serif;padding:1rem">Preview error: ' + B.esc(e.message) + '</p>'; }
    }
    function seg(label, active, fn) { return h('button', { class: 'chip', type: 'button', 'aria-pressed': active ? 'true' : 'false', onclick: fn }, label); }
    box.appendChild(h('div', { class: 'head' }, h('h2', null, t('previewH')),
      h('div', { class: 'chips' }, (S.content.languages || LG).map(function (l) { return seg(l.toUpperCase(), P.lang === l, function () { P.lang = l; render(); }); }),
        seg(t('phone'), P.phone, function () { P.phone = true; render(); }), seg(t('desktop'), !P.phone, function () { P.phone = false; render(); }),
        h('button', { class: 'chip', type: 'button', onclick: paint }, '↻ ' + t('refresh')))));
    box.appendChild(h('p', { class: 'hint' }, t('previewHint')));
    box.appendChild(wrap); paint();
    return box;
  };
  window.addEventListener('message', function (e) { if (e.data && e.data.alexiaLang && S.tab === 'preview') { S.prev.lang = LG.indexOf(e.data.alexiaLang) > -1 ? e.data.alexiaLang : 'en'; render(); } });

  VIEWS.publish = function () {
    var box = h('div'), n = Object.keys(S.pending).length;
    var note = h('input', { type: 'text', placeholder: t('notePh'), maxlength: 120 });
    var logEl = h('div', { class: 'log' + (S.log ? '' : ' hide') }, S.log);
    var btn = h('button', { class: 'btn gold', type: 'button', disabled: !dirty() || S.busy }, S.busy ? t('publishing') : t('publish'));
    btn.addEventListener('click', function () { publish(note.value.trim(), logEl, btn); });
    box.appendChild(h('div', { class: 'head' }, h('h2', null, t('publishH'))));
    box.appendChild(h('div', { class: 'card' },
      dirty() ? h('p', { class: 'notice warn' }, t('willPublish') + ': ' + S.content.products.length + ' ' + t('products').toLowerCase() + (n ? ' + ' + n + ' ' + t('pendingImgs') + ' (' + (Object.keys(S.pending).reduce(function (a, k) { return a + S.pending[k].length * 0.75; }, 0) / 1048576).toFixed(1) + ' MB)' : '')) : h('p', { class: 'notice ok' }, t('nothing')),
      h('div', { class: 'field' }, h('label', null, t('note')), note), btn));
    box.appendChild(logEl);
    return box;
  };
  function logTo(el, msg) { S.log += (S.log ? '\n' : '') + msg; el.textContent = S.log; el.classList.remove('hide'); el.scrollTop = el.scrollHeight; }

  function publish(note, logEl, btn) {
    if (S.busy) return;
    S.busy = true; S.log = ''; btn.disabled = true; btn.textContent = t('publishing');
    var branch = S.cfg.branch, ref = 'heads/' + encodeURIComponent(branch).replace(/%2F/g, '/'), snapshot = canon(S.content), pend = JSON.parse(JSON.stringify(S.pending)), files, headSha, treeSha;
    logTo(logEl, '1/6 Checking latest version…');
    gh('/git/ref/' + ref).then(function (r) {
      headSha = r.object.sha;
      return fetchContent(headSha).catch(function (e) { if (e.status === 404) return S.raw; throw e; });
    }).then(function (remote) {
      if (remote !== S.raw) {
        try { S.content = normalize(merge3(JSON.parse(S.raw), S.content, JSON.parse(remote))); snapshot = canon(S.content); logTo(logEl, t('merged')); }
        catch (e0) { if (!confirm(t('conflict'))) { var x = new Error('cancelled'); x.cancel = true; throw x; } }
      }
      logTo(logEl, '2/6 Building pages…');
      files = B.build(S.content);
      files['content.json'] = snapshot;
      return gh('/git/commits/' + headSha);
    }).then(function (cm) {
      treeSha = cm.tree.sha; var tree = [], names = Object.keys(files), imgs = Object.keys(pend);
      logTo(logEl, '3/6 Uploading ' + (names.length + imgs.length) + ' files…');
      var jobs = names.map(function (nm) { return gh('/git/blobs', { method: 'POST', body: { content: files[nm], encoding: 'utf-8' } }).then(function (b) { tree.push({ path: nm, mode: '100644', type: 'blob', sha: b.sha }); }); })
      ;
      return Promise.all(jobs).then(function () {
        return imgs.reduce(function (chain, p) {
          return chain.then(function () { logTo(logEl, '   ' + p); return gh('/git/blobs', { method: 'POST', body: { content: pend[p], encoding: 'base64' } }).then(function (b) { tree.push({ path: p, mode: '100644', type: 'blob', sha: b.sha }); }); });
        }, Promise.resolve());
      }).then(function () { return tree; });
    }).then(function (tree) {
      logTo(logEl, '4/6 Creating version…');
      return gh('/git/trees', { method: 'POST', body: { base_tree: treeSha, tree: tree } });
    }).then(function (tr) {
      return gh('/git/commits', { method: 'POST', body: { message: 'Dashboard: ' + (note || 'update website content'), tree: tr.sha, parents: [headSha] } });
    }).then(function (cm) {
      logTo(logEl, '5/6 Publishing…');
      return gh('/git/refs/' + ref, { method: 'PATCH', body: { sha: cm.sha } });
    }).then(function () {
      S.original = snapshot; S.raw = snapshot; Object.keys(pend).forEach(function (p) { delete S.pending[p]; }); S.history = null;
      logTo(logEl, '6/6 ' + t('done')); LS.del('alexia_draft'); S.busy = false; updateBar(); toast(t('done'));
      btn.textContent = t('publish'); btn.disabled = !dirty();
    }).catch(function (e) {
      S.busy = false; btn.textContent = t('publish'); btn.disabled = !dirty();
      if (e.cancel) { logTo(logEl, '—'); return; }
      logTo(logEl, t('failed') + (e.status ? 'HTTP ' + e.status + ' ' : '') + (e.detail ? e.detail.slice(0, 200) : e.message));
    });
  }

  VIEWS.history = function () {
    var box = h('div'), list = h('div');
    box.appendChild(h('div', { class: 'head' }, h('h2', null, t('historyH')), h('button', { class: 'btn sm ghost', type: 'button', onclick: load }, t('load'))));
    box.appendChild(h('p', { class: 'hint' }, t('historyHint'))); box.appendChild(list);
    function paint() {
      list.innerHTML = '';
      if (!S.history) return;
      if (!S.history.length) list.appendChild(h('p', { class: 'muted' }, t('noHist')));
      S.history.forEach(function (c) {
        list.appendChild(h('div', { class: 'card' }, h('div', { class: 'head', style: 'margin:0' }, h('div', { style: 'flex:1;min-width:10rem' }, h('b', null, c.commit.message.split('\n')[0]), h('div', { class: 'muted small' }, new Date(c.commit.author.date).toLocaleString(S.ui === 'ar' ? 'ar-EG' : 'en-GB'))),
          h('button', { class: 'btn sm ghost', type: 'button', onclick: function () {
            fetchContent(c.sha).then(function (txt) { var o = normalize(JSON.parse(txt)); S.content = o; S.pending = {}; touch(); toast(t('restored')); go('overview'); }).catch(function (e) { alert(t('failed') + e.message); });
          } }, t('restore')))));
      });
    }
    function load() { gh('/commits?path=content.json&per_page=15&sha=' + encodeURIComponent(S.cfg.branch)).then(function (r) { S.history = r; paint(); }).catch(function (e) { alert(t('failed') + (e.status || e.message)); }); }
    if (S.history) paint(); else load();
    return box;
  };

  /* ---------- shell ---------- */
  var TABS = ['overview', 'products', 'banner', 'seasons', 'texts', 'blocks', 'company', 'preview', 'publish', 'history'];
  function setDir() { document.documentElement.lang = S.ui; document.documentElement.dir = S.ui === 'ar' ? 'rtl' : 'ltr'; }
  function toggleLang() { S.ui = S.ui === 'ar' ? 'en' : 'ar'; LS.set('alexia_ui', S.ui); setDir(); render(); }

  function render() {
    setDir();
    $app.innerHTML = '';
    if (!S.cfg.token || !S.content) { $app.appendChild(connectView()); return; }
    var tabs = h('div', { class: 'tabs', role: 'tablist' });
    TABS.forEach(function (k) {
      var b = h('button', { type: 'button', role: 'tab', 'aria-current': S.tab === k ? 'true' : 'false' }, t('tabs.' + k), k === 'publish' && dirty() ? h('span', { class: 'dot' }) : null);
      b.addEventListener('click', function () { go(k); }); tabs.appendChild(b);
    });
    $app.appendChild(h('div', { class: 'top' }, h('div', { class: 'row' }, h('img', { src: '../logo.png', alt: 'ALEXIA EXPORTS' }), h('div', { class: 'ttl' }, 'ALEXIA EXPORTS', h('small', null, t('title'))),
      h('button', { class: 'btn sm ghost', type: 'button', onclick: toggleLang }, t('langBtn')), h('button', { class: 'btn sm ghost', type: 'button', onclick: signOut }, t('signout'))), tabs));
    var main = h('main'); main.appendChild(VIEWS[S.tab]()); $app.appendChild(main);
    $app.appendChild(h('div', { class: 'sticky-bar hide', id: 'bar' }, h('div', { class: 'in' }, h('span', { class: 'msg' }, t('unpublished')),
      h('button', { class: 'btn ghost sm', type: 'button', onclick: discard }, t('discard')), h('button', { class: 'btn gold sm', type: 'button', onclick: function () { go('publish'); } }, t('publishNow')))));
    updateBar();
    var cur = tabs.querySelector('[aria-current=true]'); if (cur && cur.scrollIntoView) { try { cur.scrollIntoView({ inline: 'center', block: 'nearest' }); } catch (e) {} }
  }
  function updateBar() {
    var bar = document.getElementById('bar'); if (!bar) return;
    bar.classList.toggle('hide', !dirty() || S.tab === 'publish');
    var dot = document.querySelector('.tabs .dot'), pb = Array.prototype.filter.call(document.querySelectorAll('.tabs button'), function (b) { return b.textContent === t('tabs.publish'); })[0];
    if (pb && dirty() && !pb.querySelector('.dot')) pb.appendChild(h('span', { class: 'dot' }));
    if (dot && !dirty()) dot.remove();
  }
  function discard() { if (!confirm(t('discard') + '?')) return; S.content = JSON.parse(S.original); S.pending = {}; LS.del('alexia_draft'); render(); }
  function signOut() { LS.del('alexia_token'); LS.del('alexia_draft'); S.cfg.token = ''; S.content = null; S.pending = {}; render(); }

  function connectView() {
    var tok = h('input', { type: 'password', autocomplete: 'off', autocapitalize: 'off', spellcheck: 'false', value: S.cfg.token, dir: 'ltr' });
    var repo = h('input', { type: 'text', value: S.cfg.repo, dir: 'ltr', autocapitalize: 'off' }), br = h('input', { type: 'text', value: S.cfg.branch, dir: 'ltr', autocapitalize: 'off' });
    var msg = h('div', { role: 'alert' }), btn = h('button', { class: 'btn gold', type: 'button', style: 'width:100%' }, t('connect'));
    btn.addEventListener('click', function () {
      S.cfg.token = tok.value.trim(); S.cfg.repo = repo.value.trim(); S.cfg.branch = br.value.trim() || 'main';
      msg.innerHTML = ''; btn.disabled = true; btn.textContent = t('connecting');
      connect().then(function () { LS.set('alexia_token', S.cfg.token); LS.set('alexia_repo', S.cfg.repo); LS.set('alexia_branch', S.cfg.branch); render(); offerDraft(); })
        .catch(function (e) {
          btn.disabled = false; btn.textContent = t('connect');
          var k = e.code || (e.status === 401 ? 'errAuth' : e.status === 404 ? 'errRepo' : e.status === 403 ? 'errAuth' : 'errNet');
          msg.appendChild(h('p', { class: 'notice err' }, t(k)));
        });
    });
    return h('div', { class: 'connect' }, h('img', { class: 'logo', src: '../logo.png', alt: 'ALEXIA EXPORTS' }),
      h('div', { class: 'head' }, h('h2', null, t('connectH')), h('button', { class: 'btn sm ghost', type: 'button', onclick: toggleLang }, t('langBtn'))),
      h('div', { class: 'card' }, h('p', null, t('connectP')), h('ol', { class: 'steps' }, h('li', null, t('s1')), h('li', null, t('s2')), h('li', null, t('s3')), h('li', null, t('s4'))),
        h('div', { class: 'field' }, h('label', null, t('token')), tok), h('div', { class: 'grid2' }, h('div', { class: 'field' }, h('label', null, t('repo')), repo), h('div', { class: 'field' }, h('label', null, t('branch')), br)), msg, btn));
  }
  function connect() {
    return gh('').then(function (r) {
      if (r.permissions && r.permissions.push === false) { var e = new Error('push'); e.code = 'errPush'; throw e; }
      return fetchContent();
    }).then(function (txt) {
      var o = normalize(JSON.parse(txt)); S.content = o; S.raw = txt; S.original = canon(o); S.pending = {}; S.history = null;
    });
  }
  function offerDraft() {
    var d = LS.get('alexia_draft'); if (!d) return;
    try { var o = JSON.parse(d); if (o.content && canon(normalize(o.content)) !== S.original && confirm(t('draftFound'))) {
      S.content = o.content; S.pending = o.pending || {};
      if (o.lost && o.lost.length) { var gone = function (m) { return o.lost.indexOf(m.src) < 0; }; S.content.products.forEach(function (p) { p.media = p.media.filter(gone); }); S.content.banner.slides = S.content.banner.slides.filter(gone); }
      render(); } else LS.del('alexia_draft'); } catch (e) { LS.del('alexia_draft'); }
  }
  window.addEventListener('beforeunload', function (e) { if (dirty()) { e.preventDefault(); e.returnValue = t('leave'); return t('leave'); } });

  /* ---------- start ---------- */
  setDir();
  if (S.cfg.token) {
    $app.appendChild(h('div', { class: 'connect' }, h('p', { class: 'notice' }, t('loading'))));
    connect().then(function () { render(); offerDraft(); }).catch(function (e) { S.content = null; if (e.status === 401) { LS.del('alexia_token'); S.cfg.token = ''; } render(); });
  } else render();
})();
