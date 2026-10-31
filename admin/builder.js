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
      lang: 'en', dir: 'ltr', label: 'English', name: 'English', locale: 'en_US', file: 'index.html',
      fonts: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Manrope:wght@400;600;700;800&display=swap',
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      mon3: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], arabicDigits: false
    },
    ar: {
      lang: 'ar', dir: 'rtl', label: 'العربية', name: 'Arabic', locale: 'ar_AR', file: 'ar.html',
      fonts: 'https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap',
      months: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
      mon3: ['ينا', 'فبر', 'مار', 'أبر', 'ماي', 'يون', 'يول', 'أغس', 'سبت', 'أكت', 'نوف', 'ديس'], arabicDigits: true
    },
    fr: {
      lang: 'fr', dir: 'ltr', label: 'Français', name: 'French', locale: 'fr_FR', file: 'fr.html',
      fonts: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Manrope:wght@400;600;700;800&display=swap',
      months: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
      mon3: ['Janv', 'Févr', 'Mars', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc'], arabicDigits: false
    },
    es: {
      lang: 'es', dir: 'ltr', label: 'Español', name: 'Spanish', locale: 'es_ES', file: 'es.html',
      fonts: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Manrope:wght@400;600;700;800&display=swap',
      months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      mon3: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'], arabicDigits: false
    }
  };
  var LANG_ORDER = ['en', 'ar', 'fr', 'es'];


  var B2 = function (en, ar) { return { en: en, ar: ar }; };
  var B4 = function (en, ar, fr, es) { return { en: en, ar: ar, fr: fr, es: es }; };
  var DEFAULT_ORDER = ['hero', 'trust', 'banner', 'products', 'seasons', 'certs', 'about', 'process', 'packing', 'terms', 'faq', 'partner', 'contact'];
  function layoutOf(c) {
    var seen = {}, out = [];
    ((c && c.layout) || []).forEach(function (x) { if (x && DEFAULT_ORDER.indexOf(x.id) > -1 && !seen[x.id]) { seen[x.id] = 1; out.push({ id: x.id, hidden: !!x.hidden }); } });
    DEFAULT_ORDER.forEach(function (id) { if (!seen[id]) out.push({ id: id, hidden: false }); });
    return out;
  }
  var DEFAULT_TEXT = {
    'qv': B2('Quick view', 'نظرة سريعة'),
    'qv_quote': B2('Request a quote for this product', 'اطلب عرض سعر لهذا المنتج'),
    'close': B2('Close', 'إغلاق'),
    'qm_h': B2('Request a quote', 'اطلب عرض سعر'),
    'qm_p': B2('Tell us what you need. We will prepare your request and you can send it by WhatsApp or email.', 'أخبرنا بما تحتاجه. سنجهّز طلبك ويمكنك إرساله عبر واتساب أو البريد الإلكتروني.'),
    'qm_submit': B2('Prepare my request', 'جهّز طلبي'),
    'pt_eye': B2('Distribution partners', 'شركاء التوزيع'),
    'pt_h': B2('Become a distribution partner', 'كن شريك توزيع'),
    'pt_lede': B2('Importers, wholesalers and retailers: tell us your market and volumes and we will propose a supply plan.', 'للمستوردين وتجار الجملة والتجزئة: أخبرنا عن سوقك وكمياتك لنقترح خطة توريد.'),
    'pt_btn': B2('Apply as a distributor', 'قدّم كموزّع'),
    'pt_p': B2('Share your details. We will review your application and reply.', 'شاركنا بياناتك وسنراجع طلبك ونرد عليك.'),
    'pt_submit': B2('Prepare my application', 'جهّز طلب الشراكة'),
    'pf.phone': B2('Phone / WhatsApp', 'الهاتف / واتساب'),
    'pf.city': B2('City', 'المدينة'),
    'pf.volume': B2('Estimated monthly volume', 'الكمية الشهرية التقريبية'),
    'pf.products': B2('Products of interest', 'المنتجات المهتم بها'),
    'pf.details': B2('Business details', 'نبذة عن نشاطك'),
    'pack_eye': B2('Packing solutions', 'حلول التعبئة'),
    'pack_h': B2('Packaging to match your market', 'تعبئة تناسب سوقك'),
    'pack_lede': B2('Choose the format that suits your channel. Final options depend on the product and destination.', 'اختر الشكل المناسب لقناة البيع. تعتمد الخيارات النهائية على المنتج والوجهة.'),
    'msg.p_hello': B2('Hello ALEXIA EXPORTS, I would like to apply as a distribution partner.', 'مرحبًا ALEXIA EXPORTS، أرغب في التقديم كشريك توزيع.'),
    'msg.p_subject': B2('Distribution partner application', 'طلب شراكة توزيع'),
    'msg.phone': B2('Phone', 'الهاتف'),
    'msg.city': B2('City', 'المدينة'),
    'msg.volume': B2('Monthly volume', 'الكمية الشهرية'),
    'msg.details': B2('Business details', 'نبذة عن النشاط'),
    'pd_view': B4('View details', 'عرض التفاصيل', 'Voir les détails', 'Ver detalles'),
    'pd_home': B4('Home', 'الرئيسية', 'Accueil', 'Inicio'),
    'pd_back': B4('All products', 'كل المنتجات', 'Tous les produits', 'Todos los productos'),
    'pd_cat': B4('Category', 'الفئة', 'Catégorie', 'Categoría'),
    'pd_origin': B4('Country of origin', 'بلد المنشأ', 'Pays d\u2019origine', 'País de origen'),
    'pd_avail': B4('Availability', 'التوفر', 'Disponibilité', 'Disponibilidad'),
    'pd_a_yes': B4('Available', 'متوفر', 'Disponible', 'Disponible'),
    'pd_a_seasonal': B4('Seasonal', 'موسمي', 'Saisonnier', 'De temporada'),
    'pd_a_no': B4('Not available now', 'غير متوفر حاليًا', 'Indisponible actuellement', 'No disponible por ahora'),
    'pd_apps': B4('Main applications', 'الاستخدامات الرئيسية', 'Principales applications', 'Aplicaciones principales'),
    'pd_specs': B4('Specifications', 'المواصفات', 'Spécifications', 'Especificaciones'),
    'pd_pack': B4('Packaging', 'التعبئة', 'Conditionnement', 'Embalaje'),
    'pd_docs': B4('Technical documents', 'المستندات الفنية', 'Documents techniques', 'Documentos técnicos'),
    'pd_download': B4('Download', 'تحميل', 'Télécharger', 'Descargar'),
    'pd_more': B4('More details', 'تفاصيل إضافية', 'Détails complémentaires', 'Más detalles'),
    'pd_gallery': B4('Gallery', 'معرض الصور', 'Galerie', 'Galería'),
    'pd_quote': B4('Request a quote', 'اطلب عرض سعر', 'Demander un devis', 'Solicitar cotización'),
    'pd_wa': B4('Ask on WhatsApp', 'اسأل عبر واتساب', 'Demander sur WhatsApp', 'Preguntar por WhatsApp'),
    'pd_related': B4('Other products', 'منتجات أخرى', 'Autres produits', 'Otros productos'),
    'pd_note': B4('Specifications are indicative and are confirmed in each offer.', 'المواصفات استرشادية وتُؤكَّد في كل عرض سعر.', 'Les spécifications sont indicatives et confirmées dans chaque offre.', 'Las especificaciones son orientativas y se confirman en cada oferta.'),
    'pd_wa_msg': B4('Hello ALEXIA EXPORTS, I would like information about: {p}', 'مرحبًا ALEXIA EXPORTS، أرغب في معلومات عن: {p}', 'Bonjour ALEXIA EXPORTS, je souhaite des informations sur : {p}', 'Hola ALEXIA EXPORTS, me gustaría recibir información sobre: {p}')
  };
  var DEFAULT_LISTS = {
    packs: [
      { title: B2('Cartons', 'كراتين'), text: B2('Strong cartons in sizes to suit retail, food-service and wholesale needs.', 'كراتين متينة بمقاسات تناسب التجزئة والمطاعم والجملة.'), image: '' },
      { title: B2('Plastic crates', 'صناديق بلاستيكية'), text: B2('Ventilated crates that protect fresh produce on the way to market.', 'صناديق مهوّاة تحمي المنتجات الطازجة أثناء النقل للسوق.'), image: '' },
      { title: B2('Bulk bins and bags', 'عبوات وأكياس كبيرة'), text: B2('Large-volume formats for industrial and processing buyers.', 'عبوات كبيرة الحجم للمشترين الصناعيين والتصنيع.'), image: '' },
      { title: B2('Retail packs', 'عبوات تجزئة'), text: B2('Consumer-ready packs sized and labelled for your shelves.', 'عبوات جاهزة للمستهلك بحجم وملصقات تناسب رفوفك.'), image: '' },
      { title: B2('Custom and private label', 'تعبئة خاصة وعلامة خاصة'), text: B2('Packaging and labels prepared to your specification, subject to product and order size.', 'تعبئة وملصقات حسب مواصفاتك، حسب المنتج وحجم الطلب.'), image: '' }
    ],
    partnerpoints: [
      { text: B2('A dedicated point of contact', 'جهة اتصال مخصصة') },
      { text: B2('Supply proposals built on your specifications', 'عروض توريد مبنية على مواصفاتك') },
      { text: B2('Documents and packing prepared for each order', 'مستندات وتعبئة مجهّزة لكل طلب') }
    ]
  };
  function withDefaults(c) {
    c.text = c.text || {}; c.lists = c.lists || {};
    Object.keys(DEFAULT_TEXT).forEach(function (k) { if (!c.text[k]) c.text[k] = JSON.parse(JSON.stringify(DEFAULT_TEXT[k])); });
    Object.keys(DEFAULT_LISTS).forEach(function (k) { if (!c.lists[k]) c.lists[k] = JSON.parse(JSON.stringify(DEFAULT_LISTS[k])); });
    return c;
  }

  function esc(s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;');
  }
  function big(name) {
    return '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICONS[name] || ICONS.citrus) + '</svg>';
  }
  function sm(name, cls) {
    return '<svg' + (cls ? ' class="' + cls + '"' : '') + ' viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (SMALL[name] || SMALL.check) + '</svg>';
  }

  function safeLink(u) {
    u = String(u || '').trim();
    return /^(#|\/|https?:\/\/|mailto:|tel:|[a-z0-9_.\-]+\.html)/i.test(u) ? u : '';
  }
  function mediaOf(p) {
    if (p.media && p.media.length) return p.media;
    return p.image ? [{ type: 'image', src: p.image }] : [];
  }
  function docLink(u) {
    u = String(u || '').trim();
    return /^(https?:\/\/|docs\/[A-Za-z0-9_.\-]+$)/i.test(u) ? u : '';
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
    withDefaults(content);
    var enabled = LANG_ORDER.filter(function (l) { return l === 'en' || (content.languages || ['en', 'ar']).indexOf(l) > -1; });
    var fileOf = function (l) { return LANGS[l].file; };
    var imageSrc = opts.imageSrc || function (p) { return p; };
    var co = content.company;
    var BASE = co.base_url.replace(/\/?$/, '/');
    var EMAIL = co.email.trim();
    var PH1 = co.phone1.trim(), PH2 = (co.phone2 || '').trim();
    var PH1T = '+' + digits(PH1), PH2T = '+' + digits(PH2);
    var WA_EN = digits(co.whatsapp || PH1), WA_AR = digits(co.whatsapp_ar || co.whatsapp || PH1);


    function carousel(items, o) {
      /* o: label, interval (ms), cls, T, captions[] (html per slide), pick */
      if (!items.length) return '';
      var multi = items.length > 1;
      var slides = items.map(function (m, i) {
        var src = esc(imageSrc(m.src));
        var inner = m.type === 'video'
          ? '<video src="' + src + '#t=0.1" muted playsinline preload="metadata"' + (multi ? '' : ' loop') + ' aria-label="' + esc(o.label) + '"></video>'
          : '<img src="' + src + '" alt="' + esc(o.label) + '"' + (i ? ' loading="lazy"' : '') + '>';
        return '<div class="mc-slide' + (i === 0 ? ' is-active' : '') + (m.size === 'original' ? ' fit-orig' : '') + '"' + (i === 0 ? '' : ' aria-hidden="true"') + '>' + inner + ((o.captions && o.captions[i]) || '') + '</div>';
      }).join('');
      var nav = multi
        ? '<button class="mc-prev" type="button" aria-label="' + esc(o.T('ui.prev') || 'Previous') + '">' + sm('arrow') + '</button>' +
          '<button class="mc-next" type="button" aria-label="' + esc(o.T('ui.next') || 'Next') + '">' + sm('arrow') + '</button>' +
          '<div class="mc-dots">' + items.map(function (m, i) {
            return '<button type="button" aria-label="' + esc((o.T('ui.slide') || 'Slide {n}').replace('{n}', i + 1)) + '"' + (i === 0 ? ' aria-current="true"' : '') + '></button>';
          }).join('') + '</div>'
        : '';
      return '<div class="mc ' + (o.cls || '') + '" data-interval="' + (o.interval || 4000) + '" data-count="' + items.length + '" role="region" aria-roledescription="carousel" aria-label="' + esc(o.label) + '">' +
        '<div class="mc-track">' + slides + '</div>' + nav + '</div>';
    }

    var pfile = function (p, l) { return 'product-' + p.id + (l === 'en' ? '' : '-' + l) + '.html'; };
    function page(langKey, prod) {
      var WA = langKey === 'ar' ? WA_AR : WA_EN;
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

      var home = prod ? fileOf(langKey) : '';
      var hasPage = function (p) { return !p.hidden && !p.nopage; };
      var nav = list('nav').map(function (n) { return '<a class="nl" href="' + home + '#' + esc(n.id) + '">' + esc(pick(n.label)) + '</a>'; }).join('');
      var trust = list('trust').map(function (t) { return '<article><div class="ico">' + sm(t.icon) + '</div><div><h3>' + esc(pick(t.title)) + '</h3><p>' + esc(pick(t.text)) + '</p></div></article>'; }).join('');
      var brief = list('brief').map(function (b) { return '<dt>' + esc(pick(b.label)) + '</dt><dd>' + esc(pick(b.value)) + '</dd>'; }).join('');
      var pills = groups.map(function (g) { return '<button class="pill" type="button" data-group="' + esc(g.id) + '" aria-pressed="' + (g.id === 'all' ? 'true' : 'false') + '">' + esc(pick(g.label)) + '</button>'; }).join('');

      var cards = visible.map(function (p) {
        var n = pick(p.name), d = pick(p.desc);
        var tags = (p.tags && p.tags[langKey] && p.tags[langKey].length ? p.tags[langKey] : (p.tags && p.tags.en) || []);
        var gl = glabel[p.group] || '';
        var text = (n + ' ' + d + ' ' + tags.join(' ') + ' ' + gl).toLowerCase();
        var photo = carousel(mediaOf(p), { label: n, interval: 4000, cls: 'card-mc', T: T });
        return '<article class="card" data-group="' + esc(p.group) + '" data-text="' + esc(text) + '">' + photo + '<div class="top"><div class="ic">' + big(p.icon) + '</div><span class="grp">' + esc(gl) + '</span></div>' +
          '<h3>' + (hasPage(p) ? '<a href="' + pfile(p, langKey) + '">' + esc(n) + '</a>' : esc(n)) + '</h3><p>' + esc(d) + '</p><ul class="tags">' + tags.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul>' +
          '<div class="card-acts">' + (hasPage(p) ? '<a class="more" href="' + pfile(p, langKey) + '">' + esc(T('pd_view')) + '</a>' : '') + '<button class="qv" type="button" data-id="' + esc(p.id) + '">' + esc(T('qv')) + '</button><button class="add" type="button" data-id="' + esc(p.id) + '" aria-pressed="false"><span class="off">' + esc(p.discuss ? T('discuss') : T('add')) + '</span><span class="on">' + esc(T('added')) + '</span>' + sm('plus') + '</button></div></article>';
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
      var flinks = list('footerlinks').map(function (l) { return '<li><a href="' + home + '#' + esc(l.id) + '">' + esc(pick(l.label)) + '</a></li>'; }).join('');
      var fcats = list('categories').map(function (c) { return '<li>' + esc(pick(c.text)) + '</li>'; }).join('');
      var checks = list('checks').map(function (c) { return '<li>' + sm('check') + esc(pick(c.text)) + '</li>'; }).join('');



      var certItems = list('certs'), certsHtml = '';
      if (certItems.length) {
        certsHtml = '<section class="sec certs" id="quality">\n  <div class="wrap">\n    <div class="head"><p class="eyebrow">' + esc(T('q_eye')) + '</p><h2>' + esc(T('q_h')) + '</h2><p class="lede">' + esc(T('q_lede')) + '</p></div>\n' +
          '    <ul class="badges">' + certItems.map(function (c) { return '<li class="seal"><span class="seal-ic">' + sm(c.icon || 'shield') + '</span><b>' + esc(pick(c.text)) + '</b></li>'; }).join('') + '</ul>\n' +
          (T('q_note') ? '    <p class="note">' + esc(T('q_note')) + '</p>\n' : '') + '  </div>\n</section>\n\n';
      }


      var packs = list('packs'), packsHtml = '';
      if (packs.length) {
        packsHtml = '<section class="sec packing" id="packing">\n  <div class="wrap">\n    <div class="head"><p class="eyebrow">' + esc(T('pack_eye')) + '</p><h2>' + esc(T('pack_h')) + '</h2><p class="lede">' + esc(T('pack_lede')) + '</p></div>\n' +
          '    <div class="packs">' + packs.map(function (pk) {
            var img = pk.image ? '<img class="pack-img' + (pk.size === 'original' ? ' fit-orig' : '') + '" src="' + esc(imageSrc(pk.image)) + '" alt="' + esc(pick(pk.title)) + '" loading="lazy">' : '<div class="pack-ph">' + big('salt') + '</div>';
            return '<article class="pack">' + img + '<div class="pack-b"><h3>' + esc(pick(pk.title)) + '</h3><p>' + esc(pick(pk.text)) + '</p></div></article>';
          }).join('') + '</div>\n  </div>\n</section>\n\n';
      }
      var pts = list('partnerpoints');
      var partnerHtml = '<section class="sec partner" id="partner">\n  <div class="wrap partner-wrap">\n    <div><p class="eyebrow">' + esc(T('pt_eye')) + '</p><h2>' + esc(T('pt_h')) + '</h2><p class="lede">' + esc(T('pt_lede')) + '</p>' +
        (pts.length ? '<ul class="checks">' + pts.map(function (x) { return '<li>' + sm('check') + esc(pick(x.text)) + '</li>'; }).join('') + '</ul>' : '') + '</div>\n' +
        '    <div class="partner-cta"><button class="btn btn-gold" type="button" data-open="partner-dialog">' + esc(T('pt_btn')) + arrow() + '</button></div>\n  </div>\n</section>\n\n';
      function fld(name, label, o) {
        o = o || {};
        var id = o.pre + '-' + name, req = o.req ? ' required' : '';
        var ctl = o.area ? '<textarea id="' + id + '" name="' + name + '"' + req + '></textarea>'
          : o.html ? o.html
          : '<input id="' + id + '" name="' + name + '"' + (o.type ? ' type="' + o.type + '"' : '') + req + (o.dir ? ' dir="' + o.dir + '"' : '') + (o.ac ? ' autocomplete="' + o.ac + '"' : '') + '>';
        return '<div class="f' + (o.full ? ' full' : '') + '"><label for="' + id + '">' + esc(label) + '</label>' + ctl + '</div>';
      }
      var resultBlock = '<div class="result" hidden><strong>' + esc(T('r_h')) + '</strong><textarea readonly aria-label="' + esc(T('r_h')) + '"></textarea><div class="acts">' +
        '<a class="btn btn-gold btn-sm" data-r="wa" href="https://wa.me/' + WA + '" target="_blank" rel="noopener">' + sm('wa') + esc(T('r_wa')) + '</a>' +
        '<a class="btn btn-navy btn-sm" data-r="mail" href="mailto:' + esc(EMAIL) + '">' + sm('mail') + esc(T('r_mail')) + '</a>' +
        '<button class="btn btn-ghost btn-sm" type="button" data-r="copy">' + esc(T('r_copy')) + '</button><span class="copied" aria-live="polite"></span></div></div>';
      function dlg(id, title, intro, body, cls) {
        return '<dialog class="dlg' + (cls ? ' ' + cls : '') + '" id="' + id + '" aria-labelledby="' + id + '-t"><div class="dlg-in"><button class="dlg-x" type="button" data-close aria-label="' + esc(T('close')) + '">×</button>' +
          '<h3 id="' + id + '-t">' + esc(title) + '</h3>' + (intro ? '<p class="dlg-p">' + esc(intro) + '</p>' : '') + body + '</div></dialog>\n';
      }
      var qSel = '<select id="qd-product" name="product">' + pickOpts + '</select>';
      var dialogsHtml =
        dlg('quote-dialog', T('qm_h'), T('qm_p'),
          '<form class="dform" data-kind="quote">' + fld('name', T('fl.name'), { pre: 'qd', req: 1, ac: 'name' }) + fld('company', T('fl.company'), { pre: 'qd', req: 1, ac: 'organization' }) +
          fld('email', T('fl.email'), { pre: 'qd', req: 1, type: 'email', dir: 'ltr', ac: 'email' }) + fld('country', T('fl.country'), { pre: 'qd', req: 1, ac: 'country-name' }) +
          fld('product', T('fl.pick'), { pre: 'qd', full: 1, html: qSel }) + fld('qty', T('fl.qty'), { pre: 'qd', full: 1 }) + fld('message', T('fl.message'), { pre: 'qd', full: 1, area: 1 }) +
          '<div class="f full"><p class="err" role="alert"></p><button class="btn btn-navy" type="submit">' + esc(T('qm_submit')) + arrow() + '</button></div>' + resultBlock + '</form>') +
        dlg('partner-dialog', T('pt_h'), T('pt_p'),
          '<form class="dform" data-kind="partner">' + fld('name', T('fl.name'), { pre: 'pd', req: 1, ac: 'name' }) + fld('company', T('fl.company'), { pre: 'pd', req: 1, ac: 'organization' }) +
          fld('email', T('fl.email'), { pre: 'pd', req: 1, type: 'email', dir: 'ltr', ac: 'email' }) + fld('phone', T('pf.phone'), { pre: 'pd', req: 1, type: 'tel', dir: 'ltr', ac: 'tel' }) +
          fld('country', T('fl.country'), { pre: 'pd', req: 1, ac: 'country-name' }) + fld('city', T('pf.city'), { pre: 'pd', req: 1, ac: 'address-level2' }) +
          fld('volume', T('pf.volume'), { pre: 'pd', full: 1 }) + fld('products', T('pf.products'), { pre: 'pd', full: 1 }) + fld('details', T('pf.details'), { pre: 'pd', full: 1, area: 1 }) +
          '<div class="f full"><p class="err" role="alert"></p><button class="btn btn-navy" type="submit">' + esc(T('pt_submit')) + arrow() + '</button></div>' + resultBlock + '</form>') +
        dlg('qv-dialog', '', '', '<div class="qv-media"></div><div class="qv-body"></div><div class="qv-acts"><span class="qv-slot"></span><button class="btn btn-gold btn-sm" type="button" data-qq>' + esc(T('qv_quote')) + '</button></div>', 'dlg-wide');

      var bnr = content.banner || {}, bslides = (bnr.slides || []).filter(function (x) { return x && x.src; });
      if (bnr.mode === 'fixed') bslides = bslides.slice(0, 1);
      var bannerHtml = '';
      if ((bnr.mode === 'fixed' || bnr.mode === 'carousel') && bslides.length) {
        var caps = bslides.map(function (x) {
          var hd = pick(x.title), tx = pick(x.text), cta = pick(x.cta), lk = safeLink(x.link);
          if (!hd && !tx && !(cta && lk)) return '';
          return '<div class="mc-cap">' + (hd ? '<h3>' + esc(hd) + '</h3>' : '') + (tx ? '<p>' + esc(tx) + '</p>' : '') + (cta && lk ? '<a class="btn btn-gold btn-sm" href="' + esc(lk) + '">' + esc(cta) + arrow() + '</a>' : '') + '</div>';
        });
        bannerHtml = '<section class="banner" aria-label="ALEXIA EXPORTS"><div class="wrap">' + carousel(bslides, { label: pick(bslides[0].title) || 'ALEXIA EXPORTS', interval: Math.max(2, Math.min(30, Number(bnr.interval) || 5)) * 1000, cls: 'banner-mc', T: T, captions: caps }) + '</div></section>\n\n';
      }

      var uiObj = {}, msgObj = {};
      Object.keys(content.text).forEach(function (k) {
        if (k.indexOf('ui.') === 0) uiObj[k.slice(3)] = T(k);
        if (k.indexOf('msg.') === 0) msgObj[k.slice(4)] = T(k);
      });
      var data = { names: names, months: G.months, sep: T('s_sep'), nothing: T('s_none'), ui: uiObj, msg: msgObj, email: EMAIL, wa: WA };
      var jsonld = {
        '@context': 'https://schema.org', '@type': 'Organization', name: 'ALEXIA EXPORTS', slogan: T('bar.0'), url: BASE, logo: BASE + 'logo.png',
        email: EMAIL, telephone: PH1T, description: T('jsonld_desc'), address: { '@type': 'PostalAddress', addressCountry: 'EG' },
        contactPoint: [{ '@type': 'ContactPoint', contactType: 'sales', email: EMAIL, telephone: PH1T, availableLanguage: enabled.map(function (l) { return LANGS[l].name; }) }]
      };
      var urlOf = function (l) { return prod ? BASE + pfile(prod, l) : (l === 'en' ? BASE : BASE + fileOf(l)); };
      var thisUrl = urlOf(langKey), enUrl = urlOf('en');
      var alt = T('alt'), title = prod ? pick(prod.name) + ' | ALEXIA EXPORTS' : T('title'), desc = prod ? (pick(prod.desc) || T('desc')) : T('desc');
      var pm0 = prod ? mediaOf(prod).filter(function (m) { return m.type === 'image'; })[0] : null;
      var ogimg = pm0 ? BASE + pm0.src : BASE + 'og-image.png';
      if (prod) {
        jsonld = { '@context': 'https://schema.org', '@type': 'Product', name: pick(prod.name), description: pick(prod.desc), category: glabel[prod.group] || undefined, image: mediaOf(prod).filter(function (m) { return m.type === 'image'; }).map(function (m) { return BASE + m.src; }), url: thisUrl, brand: { '@type': 'Organization', name: 'ALEXIA EXPORTS' } };
      }
      var waText = encodeURIComponent(T('wa_text'));
      var h1 = esc(T('h1a')) + ' <em>' + esc(T('h1b')) + '</em>';

      var SEC = {};
      SEC.hero = '<section class="hero">\n  <div class="wrap">\n    <div class="hero-copy">\n' +
'      <p class="eyebrow">' + esc(T('hero_eyebrow')) + '</p>\n      <h1>' + h1 + '</h1>\n      <p class="lede">' + esc(T('lede')) + '</p>\n' +
'      <div class="cta-row">\n        <a class="btn btn-gold" href="#products">' + esc(T('cta1')) + arrow() + '</a>\n        <a class="btn btn-ghost" href="#contact" data-open="quote-dialog">' + esc(T('cta2')) + '</a>\n      </div>\n' +
'      <ul class="checks">' + checks + '</ul>\n    </div>\n    <div class="hero-visual">\n      ' + ROUTES + '\n      <span class="origin-tag">' + esc(T('origin')) + '</span>\n' +
'      <div class="brief">\n        <header><h2>' + esc(T('brief_title')) + '</h2><span class="chip">' + esc(T('brief_chip')) + '</span></header>\n        <dl>' + brief + '</dl>\n' +
'        <footer>' + sm('wa') + '<span>' + esc(T('brief_foot')) + '</span></footer>\n      </div>\n    </div>\n  </div>\n' +
'  <div class="tagline-bar"><div class="wrap"><span>' + esc(T('bar.0')) + '</span><span>' + esc(T('bar.1')) + '</span></div></div>\n</section>\n\n';
      SEC.trust = '<div class="wrap"><div class="trust">' + trust + '</div></div>\n\n';
      SEC.banner = bannerHtml;
      SEC.products = '<section class="sec" id="products">\n  <div class="wrap">\n    <div class="head"><p class="eyebrow">' + esc(T('p_eye')) + '</p><h2>' + esc(T('p_h')) + '</h2><p class="lede">' + esc(T('p_lede')) + '</p></div>\n' +
'    <div class="tools">\n      <div class="filters" role="group" aria-label="' + esc(T('p_eye')) + '">' + pills + '</div>\n' +
'      <div class="search">' + sm('search') + '<input id="search" type="search" placeholder="' + esc(T('search_ph')) + '" aria-label="' + esc(T('search')) + '" autocomplete="off"></div>\n    </div>\n' +
'    <p class="count" id="count" aria-live="polite"></p>\n    <div class="grid">' + cards + '</div>\n    <p class="empty" id="empty" hidden>' + esc(T('none')) + '</p>\n' +
'    <p class="fine">' + esc(T('fine')) + '</p>\n  </div>\n</section>\n\n';
      SEC.seasons = '<section class="sec seasons" id="seasons">\n  <div class="wrap">\n    <div class="head"><p class="eyebrow">' + esc(T('s_eye')) + '</p><h2>' + esc(T('s_h')) + '</h2><p class="lede">' + esc(T('s_lede')) + '</p></div>\n' +
'    <p class="nowline" id="nowline"><span class="tag">' + esc(T('s_now')) + '</span><span class="list"></span></p>\n' +
'    <div class="scroll"><div class="cal">' + cal + '</div></div>\n' +
'    <div class="legend"><span><i></i>' + esc(T('s_key.0')) + '</span><span><i class="cur"></i>' + esc(T('s_key.1')) + '</span></div>\n' +
'    <p class="note">' + esc(T('s_note')) + '</p>\n  </div>\n</section>\n\n';
      SEC.certs = certsHtml;
      SEC.about = '<section class="sec" id="about">\n  <div class="wrap about">\n    <div class="about-copy">\n      <p class="eyebrow">' + esc(T('a_eye')) + '</p>\n      <h2>' + esc(T('a_h')) + '</h2>\n      ' + ap + '\n' +
'      <a class="btn btn-navy" href="#contact">' + esc(T('a_btn')) + arrow() + '</a>\n    </div>\n' +
'    <div class="plaque"><img src="logo.png" alt="' + esc(alt) + '" width="352" height="186" loading="lazy"><p>' + esc(T('plaque')) + '</p><div class="values">' + values + '</div></div>\n  </div>\n</section>\n\n';
      SEC.process = '<section class="sec process" id="process">\n  <div class="wrap">\n    <div class="head"><p class="eyebrow">' + esc(T('pr_eye')) + '</p><h2>' + esc(T('pr_h')) + '</h2><p class="lede">' + esc(T('pr_lede')) + '</p></div>\n' +
'    <ol class="steps">' + steps + '</ol>\n  </div>\n</section>\n\n';
      SEC.packing = packsHtml;
      SEC.terms = '<section class="sec" id="terms">\n  <div class="wrap">\n    <div class="head"><p class="eyebrow">' + esc(T('t_eye')) + '</p><h2>' + esc(T('t_h')) + '</h2><p class="lede">' + esc(T('t_lede')) + '</p></div>\n' +
'    <div class="tabs" role="tablist" aria-label="' + esc(T('t_eye')) + '">' + tabs + '</div>\n    ' + panels + '\n    <p class="note">' + esc(T('tnote')) + '</p>\n' +
'    <div class="pack"><h3>' + esc(T('pk_h')) + '</h3><ul>' + pk + '</ul></div>\n  </div>\n</section>\n\n';
      SEC.faq = '<section class="sec faq" id="faq">\n  <div class="wrap">\n    <div class="head"><p class="eyebrow">' + esc(T('f_eye')) + '</p><h2>' + esc(T('f_h')) + '</h2></div>\n    <div class="list">' + faq + '</div>\n  </div>\n</section>\n\n';
      SEC.partner = partnerHtml;
      SEC.contact = '<section class="sec" id="contact">\n  <div class="wrap contact">\n    <div>\n      <div class="head"><p class="eyebrow">' + esc(T('c_eye')) + '</p><h2>' + esc(T('c_h')) + '</h2><p class="lede">' + esc(T('c_lede')) + '</p></div>\n      <div class="cinfo">\n' +
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
'            <button class="btn btn-ghost btn-sm" type="button" id="copy">' + esc(T('r_copy')) + '</button>\n            <span class="copied" id="copied" aria-live="polite"></span>\n          </div>\n        </div>\n      </form>\n    </div>\n  </div>\n</section>\n\n';
      function productMain(p) {
        var d = p.detail || {};
        var n = pick(p.name), gl = glabel[p.group] || '';
        var media = mediaOf(p);
        var visual = media.length ? carousel(media, { label: n, interval: 5000, cls: 'pd-mc', T: T }) : '<div class="pd-ph">' + big(p.icon) + '</div>';
        var av = ['yes', 'seasonal', 'no'].indexOf(d.availability) > -1 ? d.availability : 'yes';
        var origin = pick(d.origin) || (({ en: 'Egypt', ar: 'مصر', fr: 'Égypte', es: 'Egipto' })[langKey]);
        var availNote = pick(d.avail_note);
        var facts = '<dl class="pd-facts">' +
          (gl ? '<div><dt>' + esc(T('pd_cat')) + '</dt><dd>' + esc(gl) + '</dd></div>' : '') +
          '<div><dt>' + esc(T('pd_origin')) + '</dt><dd>' + esc(origin) + '</dd></div>' +
          '<div><dt>' + esc(T('pd_avail')) + '</dt><dd><span class="av av-' + av + '">' + esc(T('pd_a_' + av)) + '</span>' + (availNote ? ' <span class="av-note">' + esc(availNote) + '</span>' : '') + '</dd></div></dl>';
        var apps = (d.apps || []).map(function (a) { return pick(a.text); }).filter(Boolean);
        var appsHtml = apps.length ? '<div class="pd-apps"><h2>' + esc(T('pd_apps')) + '</h2><ul>' + apps.map(function (a) { return '<li>' + sm('check') + esc(a) + '</li>'; }).join('') + '</ul></div>' : '';
        var wmsg = encodeURIComponent(T('pd_wa_msg').replace('{p}', n));
        var acts = '<div class="pd-acts"><button class="btn btn-gold" type="button" data-open="quote-dialog" data-product="' + esc(p.id) + '">' + esc(T('pd_quote')) + arrow() + '</button>' +
          '<button class="add pd-add" type="button" data-id="' + esc(p.id) + '" aria-pressed="false"><span class="off">' + esc(p.discuss ? T('discuss') : T('add')) + '</span><span class="on">' + esc(T('added')) + '</span>' + sm('plus') + '</button>' +
          '<a class="btn btn-ghost" href="https://wa.me/' + WA + '?text=' + wmsg + '" target="_blank" rel="noopener">' + sm('wa') + esc(T('pd_wa')) + '</a></div>';
        function kv(rows) {
          rows = (rows || []).filter(function (r) { return pick(r.label) && pick(r.value); });
          if (!rows.length) return '';
          return '<table class="pd-kv"><tbody>' + rows.map(function (r) { return '<tr><th scope="row">' + esc(pick(r.label)) + '</th><td>' + esc(pick(r.value)) + '</td></tr>'; }).join('') + '</tbody></table>';
        }
        var specs = kv(d.specs), pkg = kv(d.packaging);
        var docs = (d.docs || []).filter(function (x) { return docLink(x.src); });
        var docsHtml = docs.length ? '<section class="pd-sec"><h2>' + esc(T('pd_docs')) + '</h2><div class="pd-docs">' + docs.map(function (x) {
          return '<a class="doc" href="' + esc(imageSrc(docLink(x.src))) + '" target="_blank" rel="noopener"><span class="doc-ic">' + sm('doc') + '</span><span class="doc-t"><b>' + esc(pick(x.label) || 'PDF') + '</b><small>' + esc(T('pd_download')) + '</small></span></a>';
        }).join('') + '</div></section>' : '';
        var extra = (d.extra || []).filter(function (x) { return pick(x.title) || pick(x.text); }).map(function (x) {
          return '<section class="pd-sec"><h2>' + esc(pick(x.title)) + '</h2><p>' + esc(pick(x.text)).replace(/\n/g, '<br>') + '</p></section>';
        }).join('');
        var longd = pick(d.long);
        var rel = visible.filter(function (o) { return o.id !== p.id && hasPage(o); });
        rel.sort(function (a, b) { return (b.group === p.group) - (a.group === p.group); });
        var relHtml = rel.slice(0, 4).length ? '<section class="pd-sec pd-rel"><h2>' + esc(T('pd_related')) + '</h2><div class="rel-grid">' + rel.slice(0, 4).map(function (o) {
          var m0 = mediaOf(o).filter(function (m) { return m.type === 'image'; })[0];
          var th = m0 ? '<img src="' + esc(imageSrc(m0.src)) + '" alt="" loading="lazy">' : '<span class="rel-ic">' + big(o.icon) + '</span>';
          return '<a class="rel" href="' + pfile(o, langKey) + '">' + th + '<b>' + esc(pick(o.name)) + '</b></a>';
        }).join('') + '</div></section>' : '';
        return '<nav class="crumbs" aria-label="breadcrumb"><div class="wrap"><a href="' + home + '">' + esc(T('pd_home')) + '</a><span>›</span><a href="' + home + '#products">' + esc(T('p_eye')) + '</a><span>›</span><b>' + esc(n) + '</b></div></nav>\n' +
          '<article class="pd"><div class="wrap pd-top"><div class="pd-vis">' + visual + '</div><div class="pd-info"><p class="grp">' + esc(gl) + '</p><h1>' + esc(n) + '</h1><p class="pd-short">' + esc(pick(p.desc)) + '</p>' + facts + acts + '</div></div>\n' +
          '<div class="wrap pd-body">' + (longd ? '<section class="pd-sec"><p>' + esc(longd).replace(/\n/g, '<br>') + '</p></section>' : '') + appsHtml +
          (specs ? '<section class="pd-sec"><h2>' + esc(T('pd_specs')) + '</h2>' + specs + '<p class="pd-note">' + esc(T('pd_note')) + '</p></section>' : '') +
          (pkg ? '<section class="pd-sec"><h2>' + esc(T('pd_pack')) + '</h2>' + pkg + '</section>' : '') + docsHtml + extra + relHtml +
          '<p class="pd-back"><a href="' + home + '#products">' + esc(T('pd_back')) + '</a></p></div></article>\n';
      }
      var mainBody = prod ? productMain(prod) : layoutOf(content).filter(function (x) { return !x.hidden; }).map(function (x) { return SEC[x.id] || ''; }).join('');

      return '<!doctype html>\n' +
'<html lang="' + G.lang + '" dir="' + G.dir + '">\n<head>\n<meta charset="utf-8">\n' +
'<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n' +
'<title>' + esc(title) + '</title>\n' +
'<meta name="description" content="' + esc(desc) + '">\n<meta name="theme-color" content="#0A2A66">\n' +
'<link rel="canonical" href="' + thisUrl + '">\n' +
enabled.map(function (l) { return '<link rel="alternate" hreflang="' + l + '" href="' + urlOf(l) + '">\n'; }).join('') + '<link rel="alternate" hreflang="x-default" href="' + enUrl + '">\n<meta property="og:locale" content="' + G.locale + '">\n' +
'<meta property="og:type" content="website">\n<meta property="og:site_name" content="ALEXIA EXPORTS">\n<meta property="og:title" content="' + esc(title) + '">\n<meta property="og:description" content="' + esc(desc) + '">\n' +
'<meta property="og:url" content="' + thisUrl + '">\n<meta property="og:image" content="' + ogimg + '">\n<meta name="twitter:card" content="summary_large_image">\n' +
'<link rel="icon" type="image/png" href="favicon.png">\n<link rel="apple-touch-icon" href="apple-touch-icon.png">\n<link rel="manifest" href="manifest.webmanifest">\n' +
'<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n' +
'<link rel="stylesheet" href="' + G.fonts + '">\n<link rel="stylesheet" href="style.css">\n' +
'<script type="application/ld+json">' + jsonForScript(jsonld) + '</script>\n</head>\n<body>\n' +
'<a class="skip" href="#top">' + esc(T('skip')) + '</a>\n\n' +
'<div class="strip"><div class="wrap">\n  <span><b>✦</b> ' + esc(T('strip_l')) + '</span>\n' +
'  <span class="links"><span>' + esc(T('strip_r')) + '</span> <a href="mailto:' + esc(EMAIL) + '">' + esc(EMAIL) + '</a> <a href="tel:' + PH1T + '">' + ltr(esc(PH1)) + '</a></span>\n</div></div>\n\n' +
'<header class="top"><div class="wrap">\n' +
'  <a class="brand" href="' + (prod ? home : '#top') + '" aria-label="' + esc(T('brand')) + '"><img src="logo.png" width="106" height="56" alt="' + esc(alt) + '"></a>\n' +
(prod ? '' : '  <button class="search-btn" type="button" aria-label="' + esc(T('search')) + '" aria-expanded="false" aria-controls="gsearch-bar">' + sm('search') + '</button>\n') +
'  <button class="menu-btn" type="button" aria-label="' + esc(T('menu')) + '" aria-expanded="false" aria-controls="nav"><span></span></button>\n' +
'  <nav class="main" id="nav" aria-label="' + esc(T('menu')) + '">' + nav + '\n' +
(enabled.length > 1 ? '    <details class="lang-menu"><summary aria-label="Language">' + sm('globe') + '<span>' + esc(langKey.toUpperCase()) + '</span></summary><ul>' + enabled.filter(function (l) { return l !== langKey; }).map(function (l) { return '<li><a class="lang-link" href="' + (prod ? pfile(prod, l) : fileOf(l)) + '" hreflang="' + l + '" lang="' + l + '">' + esc(LANGS[l].label) + '</a></li>'; }).join('') + '</ul></details>\n' : '') +
'    <a class="btn btn-gold btn-sm" href="#contact" data-open="quote-dialog">' + esc(T('quote')) + '</a>\n  </nav>\n</div>\n  ' + (prod ? '' : '<div class="gsearch" id="gsearch-bar" hidden><div class="wrap"><div class="search">' + sm('search') + '<input id="gsearch" type="search" placeholder="' + esc(T('search_ph')) + '" aria-label="' + esc(T('search')) + '" autocomplete="off"></div></div></div>') + '\n</header>\n\n' +
'<main id="top">\n' + mainBody + '</main>\n\n' +
'<footer class="site"><div class="wrap">\n  <div class="fgrid">\n    <div class="fbrand"><img src="logo.png" alt="' + esc(alt) + '" width="130" height="70" loading="lazy"><p>' + esc(T('foot_p')) + '</p></div>\n' +
'    <div><h4>' + esc(T('f_explore')) + '</h4><ul>' + flinks + '</ul></div>\n    <div><h4>' + esc(T('f_cats')) + '</h4><ul>' + fcats + '</ul></div>\n' +
'    <div><h4>' + esc(T('f_contact')) + '</h4><ul><li><a href="mailto:' + esc(EMAIL) + '">' + esc(EMAIL) + '</a></li><li><a href="tel:' + PH1T + '">' + ltr(esc(PH1)) + '</a></li>' +
(PH2 ? '<li><a href="tel:' + PH2T + '">' + ltr(esc(PH2)) + '</a></li>' : '') + '<li>' + esc(T('egypt_line')) + '</li></ul></div>\n  </div>\n' +
'  <div class="fbottom"><span>' + esc(T('copy_l')) + '</span><span>' + esc(T('copy_r')) + '</span></div>\n</div></footer>\n\n' +
dialogsHtml +
'<button class="float pillb" id="pillb" type="button" hidden>' + esc(T('pill')) + ' <b>0</b></button>\n' +
'<a class="float wa" href="https://wa.me/' + WA + '?text=' + waText + '" target="_blank" rel="noopener" aria-label="' + esc(T('float_wa')) + '">' + sm('wa') + '<span class="lbl2">' + esc(T('float_wa')) + '</span></a>\n\n' +
'<script>window.ALEXIA=' + jsonForScript(data) + ';</script>\n<script src="app.js" defer></script>\n</body>\n</html>\n';
    }

    var out = {};
    enabled.forEach(function (l) { out[fileOf(l)] = page(l); });
    var pagesOf = content.products.filter(function (p) { return !p.hidden && !p.nopage; });
    pagesOf.forEach(function (p) { enabled.forEach(function (l) { out[pfile(p, l)] = page(l, p); }); });
    out['sitemap.xml'] = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' +
      enabled.map(function (l) {
        var u = l === 'en' ? BASE : BASE + fileOf(l);
        return '  <url><loc>' + u + '</loc>\n' + enabled.map(function (m) { return '    <xhtml:link rel="alternate" hreflang="' + m + '" href="' + (m === 'en' ? BASE : BASE + fileOf(m)) + '"/>\n'; }).join('') + '  </url>\n';
      }).join('') + pagesOf.map(function (p) {
        return enabled.map(function (l) { return '  <url><loc>' + BASE + pfile(p, l) + '</loc>\n' + enabled.map(function (m) { return '    <xhtml:link rel="alternate" hreflang="' + m + '" href="' + BASE + pfile(p, m) + '"/>\n'; }).join('') + '  </url>\n'; }).join('');
      }).join('') + '</urlset>\n';
    out['robots.txt'] = 'User-agent: *\nAllow: /\nSitemap: ' + BASE + 'sitemap.xml\n';
    return out;
  }

  return { build: build, layoutOf: layoutOf, DEFAULT_ORDER: DEFAULT_ORDER, LANG_ORDER: LANG_ORDER, withDefaults: withDefaults, DEFAULT_TEXT: DEFAULT_TEXT, DEFAULT_LISTS: DEFAULT_LISTS, ICONS: ICONS, SMALL: SMALL, ICON_NAMES: Object.keys(ICONS), TRUST_ICONS: TRUST_ICONS, LANGS: LANGS, esc: esc };
});
