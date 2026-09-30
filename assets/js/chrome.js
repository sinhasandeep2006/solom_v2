/* ==========================================================================
   SOLOMO v2 — shared page chrome
   ==========================================================================
   Loaded in <head> right after solomo.js. Every page calls:
     <script>siteHeader()</script>   first thing in <body>
     <script>siteFooter()</script>   last thing before the page's own scripts
   siteFooter() also renders anything marked with data-cards / data-img /
   data-pdp, so product names, prices and images come only from PRODUCTS.
   solomo.js boots on DOMContentLoaded, i.e. after all of this has run.
   ========================================================================== */
'use strict';

function esc(s) {
  return String(s).replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
}
function here(html) { document.currentScript.insertAdjacentHTML('beforebegin', html); }
function pic(sku, i) {
  var p = PRODUCTS[sku], id = i ? (p.gallery[i - 1] || p.img) : p.img;
  return imageUrl(id);
}
function icon(name, cls) {
  return '<span aria-hidden="true" class="material-symbols-outlined ' + (cls || '') + '">' + name + '</span>';
}
function offPct(p) { return Math.round((1 - p.price / p.mrp) * 100); }

/* --------------------------------------------------------------------------
   Navigation data. One list drives desktop, mobile and footer.
   -------------------------------------------------------------------------- */
var NAV = [
  { label: 'New In', href: 'shop.html' },
  { label: 'Shop', href: 'shop.html', mega: true },
  { label: 'Table Boxes', href: 'shop.html?cat=table', cat: 'table' },
  { label: 'Pure Wipes', href: 'shop.html?cat=wipes', cat: 'wipes' },
  { label: 'Pocket Travel', href: 'shop.html?cat=pocket', cat: 'pocket' },
  { label: 'Gifting', href: 'shop.html?cat=bundle', cat: 'bundle' },
  { label: 'Our Story', href: 'story.html' },
  { label: 'Journal', href: 'journal.html' }
];

var MEGA_COLS = [
  { title: 'Shop', links: [['All essentials', 'shop.html'], ['Bestsellers', 'shop.html'], ['Bundles & gifting', 'shop.html?cat=bundle'], ['Pack size guide', 'pack-guide.html']] },
  { title: 'Shop by room', links: [['Bedside', 'products/bedside-comfort-cube.html'], ['Study & office', 'products/desk-essentials-flat-box.html'], ['Nursery', 'products/starter-nursery-pack.html'], ['Handbag & car', 'products/everyday-pocket-packets.html']] },
  { title: 'Shop by format', links: [['Table boxes', 'shop.html?cat=table'], ['Water wipes', 'shop.html?cat=wipes'], ['Pocket packets', 'shop.html?cat=pocket'], ['Starter boxes', 'shop.html?cat=bundle']] }
];

var ANNOUNCEMENTS = [
  'Free express delivery across India on orders over ₹499',
  'First box? Use code COZY10 for 10% off',
  '100% bamboo pulp • Zero chlorine bleach • Plastic-free cartons'
];

/* --------------------------------------------------------------------------
   Header
   -------------------------------------------------------------------------- */
function siteHeader() {
  var B = BASE;
  var ann = ANNOUNCEMENTS.map(function (m, i) {
    return '<p class="ann-msg" ' + (i ? 'hidden' : '') + '>' + esc(m) + '</p>';
  }).join('');

  var mega = '<div class="mega absolute left-0 right-0 top-full bg-white border-t border-b border-sand-border shadow-xl z-40">' +
    '<div class="max-w-7xl mx-auto px-10 py-10 grid grid-cols-5 gap-10">' +
    MEGA_COLS.map(function (c) {
      return '<div><p class="font-serif text-sm font-semibold text-orange-brand uppercase tracking-wider mb-4">' + c.title + '</p><ul class="space-y-2.5">' +
        c.links.map(function (l) { return '<li><a class="u-grow text-sm font-semibold text-navy-brand" href="' + B + l[1] + '">' + l[0] + '</a></li>'; }).join('') +
        '</ul></div>';
    }).join('') +
    ['TRIO-BX', 'NURS-06'].map(function (s) {
      var p = PRODUCTS[s];
      return '<a class="group block" href="' + productUrl(s) + '"><div class="aspect-[4/5] rounded-2xl overflow-hidden bg-cream-surface">' +
        '<img alt="" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" src="' + pic(s) + '"/></div>' +
        '<p class="mt-3 font-serif font-semibold text-navy-brand">' + esc(p.name) + '</p><p class="text-xs text-slate-body">Shop now →</p></a>';
    }).join('') +
    '</div></div>';

  var links = NAV.map(function (n) {
    var base = 'font-serif text-[15px] font-medium text-navy-brand hover:text-orange-brand transition-colors py-4 inline-flex items-center gap-1';
    if (n.mega) {
      return '<li class="has-mega static"><a class="' + base + '" href="' + B + n.href + '">' + n.label + icon('expand_more', 'text-base') + '</a>' + mega + '</li>';
    }
    return '<li><a class="' + base + '" href="' + B + n.href + '"' + (n.cat ? ' data-nav-cat="' + n.cat + '"' : '') + '>' + n.label + '</a></li>';
  }).join('');

  var mobileLinks = NAV.filter(function (n) { return !n.mega; }).map(function (n) {
    return '<li><a class="flex items-center justify-between py-3.5 border-b border-sand-border font-serif text-lg font-medium text-navy-brand" href="' + B + n.href + '"' +
      (n.cat ? ' data-nav-cat="' + n.cat + '"' : '') + ' onclick="closeMobileNav()">' + n.label + icon('chevron_right', 'text-slate-body') + '</a></li>';
  }).join('');

  var iconBtn = 'relative w-10 h-10 rounded-full flex items-center justify-center text-navy-brand hover:bg-cream-surface transition-colors';

  here(
    '<a class="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[90] bg-white px-4 py-2 rounded-full" href="#main">Skip to content</a>' +
    /* Announcement bar */
    '<div class="bg-navy-brand text-white text-[12px] sm:text-[13px] font-semibold">' +
      '<div class="max-w-7xl mx-auto px-4 h-9 flex items-center justify-between gap-3">' +
        '<button aria-label="Previous message" class="opacity-70 hover:opacity-100" data-ann="-1" type="button">' + icon('chevron_left', 'text-lg') + '</button>' +
        '<div aria-live="polite" class="relative flex-1 text-center overflow-hidden" id="ann">' + ann + '</div>' +
        '<button aria-label="Next message" class="opacity-70 hover:opacity-100" data-ann="1" type="button">' + icon('chevron_right', 'text-lg') + '</button>' +
      '</div>' +
    '</div>' +
    /* Header */
    '<header class="sticky top-0 z-40 bg-cream-bg/95 backdrop-blur border-b border-sand-border" id="site-top">' +
      '<div class="relative max-w-7xl mx-auto px-4 lg:px-10 h-16 lg:h-20 grid grid-cols-3 items-center">' +
        '<div class="flex items-center gap-1">' +
          '<button aria-controls="mobile-nav" aria-expanded="false" aria-label="Open menu" class="lg:hidden ' + iconBtn + '" id="mobile-nav-toggle" onclick="toggleMobileNav()" type="button">' + icon('menu', '') .replace('<span', '<span id="mobile-nav-icon"') + '</button>' +
          '<button aria-controls="search-panel" aria-label="Search" class="' + iconBtn + '" onclick="toggleSearch()" type="button">' + icon('search') + '</button>' +
          '<a class="hidden lg:inline text-xs font-bold text-slate-body hover:text-navy-brand ml-2" href="' + B + 'order/track.html">Track order</a>' +
        '</div>' +
        '<a aria-label="SOLOMO ESSENTIALS home" class="justify-self-center" href="' + B + 'index.html"><img alt="SOLOMO ESSENTIALS" class="h-11 lg:h-14 w-auto" height="56" src="' + B + 'assets/img/logo.png" width="78"/></a>' +
        '<div class="flex items-center justify-end gap-0.5">' +
          '<a aria-label="Your account" class="hidden sm:flex ' + iconBtn + '" href="' + B + 'account.html">' + icon('person') + '</a>' +
          '<a aria-label="Your wishlist" class="' + iconBtn + '" href="' + B + 'wishlist.html">' + icon('favorite') +
            '<span class="absolute top-0 right-0 min-w-[18px] h-[18px] px-1 rounded-full bg-orange-brand text-white text-[10px] font-extrabold flex items-center justify-center" hidden id="nav-wish-count">0</span></a>' +
          '<button aria-controls="cart-drawer" aria-label="Open your basket" class="' + iconBtn + '" onclick="openCart()" type="button">' + icon('shopping_bag') +
            '<span class="absolute top-0 right-0 min-w-[18px] h-[18px] px-1 rounded-full bg-navy-brand text-white text-[10px] font-extrabold flex items-center justify-center" id="nav-cart-count">0</span></button>' +
        '</div>' +
      '</div>' +
      /* Desktop nav row */
      '<nav aria-label="Main" class="hidden lg:block border-t border-sand-border"><ul class="max-w-7xl mx-auto px-10 flex items-center justify-center gap-9">' + links + '</ul></nav>' +
      /* Search panel */
      '<div class="absolute left-0 right-0 top-full bg-white border-b border-sand-border shadow-lg" hidden id="search-panel">' +
        '<form action="' + B + 'search.html" class="max-w-3xl mx-auto px-4 py-6 flex items-center gap-3" data-search role="search">' +
          icon('search', 'text-2xl text-slate-body') +
          '<label class="sr-only" for="site-search">Search products</label>' +
          '<input autocomplete="off" class="flex-1 bg-transparent border-0 border-b-2 border-sand-border focus:border-navy-brand focus:ring-0 text-lg font-serif text-navy-brand placeholder:text-slate-body/70 px-0 py-2" id="site-search" name="q" placeholder="Search tissues, wipes, bundles…" type="search"/>' +
          '<button class="px-5 py-2.5 rounded-full bg-navy-brand text-white text-sm font-bold" type="submit">Search</button>' +
          '<button aria-label="Close search" class="w-9 h-9 rounded-full hover:bg-cream-surface flex items-center justify-center" onclick="toggleSearch()" type="button">' + icon('close') + '</button>' +
        '</form>' +
      '</div>' +
    '</header>' +
    /* Mobile drawer menu. solomo.js toggles its [hidden]. */
    '<div class="lg:hidden fixed inset-0 z-50" hidden id="mobile-nav">' +
      '<div class="absolute inset-0 bg-navy-brand/40" onclick="closeMobileNav()"></div>' +
      '<nav aria-label="Mobile" class="absolute inset-y-0 left-0 w-[86%] max-w-sm bg-cream-bg shadow-2xl flex flex-col overflow-y-auto">' +
        '<div class="flex items-center justify-between px-5 h-16 border-b border-sand-border">' +
          '<img alt="SOLOMO ESSENTIALS" class="h-10 w-auto" src="' + B + 'assets/img/logo.png"/>' +
          '<button aria-label="Close menu" class="w-10 h-10 rounded-full hover:bg-cream-surface flex items-center justify-center" onclick="closeMobileNav()" type="button">' + icon('close') + '</button>' +
        '</div>' +
        '<form action="' + B + 'search.html" class="mx-5 mt-5 flex items-center gap-2 bg-white border border-sand-border rounded-full px-4 py-2.5" data-search role="search">' +
          icon('search', 'text-slate-body text-xl') +
          '<label class="sr-only" for="site-search-mobile">Search products</label>' +
          '<input autocomplete="off" class="flex-1 min-w-0 border-0 p-0 bg-transparent focus:ring-0 text-sm" id="site-search-mobile" name="q" placeholder="Search products" type="search"/>' +
        '</form>' +
        '<ul class="px-5 mt-3">' + mobileLinks + '</ul>' +
        '<div class="mt-auto p-5 grid grid-cols-2 gap-3 text-sm font-bold">' +
          '<a class="flex items-center gap-2 p-3 rounded-2xl bg-cream-surface" href="' + B + 'account.html">' + icon('person') + 'Account</a>' +
          '<a class="flex items-center gap-2 p-3 rounded-2xl bg-cream-surface" href="' + B + 'order/track.html">' + icon('local_shipping') + 'Track</a>' +
          '<a class="flex items-center gap-2 p-3 rounded-2xl bg-cream-surface" href="' + B + 'faq.html">' + icon('help') + 'Help</a>' +
          '<a class="flex items-center gap-2 p-3 rounded-2xl bg-cream-surface" href="' + B + 'contact.html">' + icon('chat') + 'Contact</a>' +
        '</div>' +
      '</nav>' +
    '</div>' +
    '<span id="main" tabindex="-1"></span>'
  );
}

function toggleSearch() {
  var p = document.getElementById('search-panel');
  p.hidden = !p.hidden;
  if (!p.hidden) document.getElementById('site-search').focus();
}

/* --------------------------------------------------------------------------
   Footer + drawer + toast + popup
   -------------------------------------------------------------------------- */
function footCol(title, links) {
  return '<div><h3 class="font-serif text-base font-semibold mb-4">' + title + '</h3><ul class="space-y-2.5 text-sm text-white/75">' +
    links.map(function (l) { return '<li><a class="u-grow hover:text-white" href="' + BASE + l[1] + '">' + l[0] + '</a></li>'; }).join('') + '</ul></div>';
}

var SOCIAL = {
  Instagram: '<path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4ZM17.3 5.5a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4ZM12 3.8c2.7 0 3 0 4 .1 2.7.1 4 1.4 4.1 4.1.1 1 .1 1.3.1 4s0 3-.1 4c-.1 2.7-1.4 4-4.1 4.1-1 .1-1.3.1-4 .1s-3 0-4-.1c-2.7-.1-4-1.4-4.1-4.1-.1-1-.1-1.3-.1-4s0-3 .1-4C4 5.3 5.3 4 8 3.9c1-.1 1.3-.1 4-.1ZM12 2c-2.7 0-3.1 0-4.1.1C4.3 2.2 2.3 4.2 2.1 7.9 2 8.9 2 9.3 2 12s0 3.1.1 4.1c.2 3.6 2.2 5.6 5.8 5.8 1 .1 1.4.1 4.1.1s3.1 0 4.1-.1c3.6-.2 5.6-2.2 5.8-5.8.1-1 .1-1.4.1-4.1s0-3.1-.1-4.1c-.2-3.6-2.2-5.6-5.8-5.8C15.1 2 14.7 2 12 2Z"/>',
  Facebook: '<path d="M13.5 22v-8.2h2.8l.4-3.2h-3.2v-2c0-.9.3-1.6 1.6-1.6h1.7V4.1c-.3 0-1.3-.1-2.5-.1-2.5 0-4.1 1.5-4.1 4.2v2.4H7.4v3.2h2.8V22h3.3Z"/>',
  YouTube: '<path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4a2.5 2.5 0 0 0-1.8 1.8C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8ZM10 15V9l5.2 3L10 15Z"/>'
};

function newsletterForm(id, dark) {
  return '<form class="flex items-stretch gap-2 w-full max-w-md" data-newsletter novalidate>' +
    '<label class="sr-only" for="' + id + '">Email address</label>' +
    '<input autocomplete="email" class="flex-1 min-w-0 rounded-full px-5 py-3 text-sm border ' +
      (dark ? 'bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white' : 'bg-white border-sand-border text-navy-brand placeholder:text-slate-body focus:border-navy-brand') +
      ' focus:ring-0" id="' + id + '" placeholder="Your email address" required type="email"/>' +
    '<button class="shrink-0 px-6 rounded-full bg-orange-brand hover:bg-orange-deep text-white text-sm font-bold transition-colors" type="submit">Sign up</button>' +
    '</form><p aria-live="polite" class="text-xs mt-2 min-h-[1rem] ' + (dark ? 'text-white/70' : 'text-slate-body') + '" data-newsletter-msg></p>';
}

function siteFooter() {
  var B = BASE;
  var social = Object.keys(SOCIAL).map(function (k) {
    /* TODO(social): real profile URLs. */
    return '<a aria-label="SOLOMO ESSENTIALS on ' + k + '" class="w-10 h-10 rounded-full bg-white/10 hover:bg-orange-brand flex items-center justify-center transition-colors" href="#" rel="noopener">' +
      '<svg aria-hidden="true" class="w-5 h-5 fill-current" viewBox="0 0 24 24">' + SOCIAL[k] + '</svg></a>';
  }).join('');

  here(
    /* Trust strip, shown on every page above the footer */
    '<section aria-label="Why shop with us" class="border-t border-sand-border bg-cream-warm">' +
      '<div class="max-w-7xl mx-auto px-4 lg:px-10 py-10 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">' +
      [['local_shipping', 'Free express delivery', 'On every order over ₹499'],
       ['eco', '100% bamboo pulp', 'Unbleached, zero chlorine'],
       ['recycling', 'Plastic-free cartons', 'Recyclable, no windows'],
       ['assignment_return', 'Easy returns', 'See our returns policy']].map(function (t) {
        return '<div class="flex flex-col items-center gap-2">' + icon(t[0], 'text-3xl text-orange-brand') +
          '<p class="font-serif font-semibold text-navy-brand">' + t[1] + '</p><p class="text-xs text-slate-body">' + t[2] + '</p></div>';
      }).join('') +
      '</div>' +
    '</section>' +
    '<footer class="bg-navy-brand text-white">' +
      /* Newsletter band */
      '<div class="border-b border-white/10">' +
        '<div class="max-w-7xl mx-auto px-4 lg:px-10 py-12 grid lg:grid-cols-2 gap-6 items-center">' +
          '<div><h2 class="font-serif text-2xl lg:text-3xl font-semibold">Join the SOLOMO circle</h2>' +
          '<p class="text-sm text-white/75 mt-2 max-w-md">New formats first, restock alerts, and 10% off your first box.</p></div>' +
          '<div class="lg:justify-self-end w-full max-w-md">' + newsletterForm('foot-email', true) + '</div>' +
        '</div>' +
      '</div>' +
      '<div class="max-w-7xl mx-auto px-4 lg:px-10 pt-12 pb-8">' +
        '<div class="grid grid-cols-2 md:grid-cols-4 gap-10 pb-10 border-b border-white/10">' +
          '<div class="col-span-2 md:col-span-1 space-y-4">' +
            '<a aria-label="SOLOMO ESSENTIALS home" class="inline-block bg-white rounded-2xl px-3 py-2" href="' + B + 'index.html"><img alt="SOLOMO ESSENTIALS" class="h-14 w-auto" loading="lazy" src="' + B + 'assets/img/logo.png"/></a>' +
            '<p class="text-sm text-white/75 leading-relaxed">Everyday essentials from 100% bamboo pulp. Soft, unbleached, and made in India.</p>' +
            '<div class="flex gap-2">' + social + '</div>' +
          '</div>' +
          footCol('Shop', [['All essentials', 'shop.html'], ['Table boxes', 'shop.html?cat=table'], ['Water wipes', 'shop.html?cat=wipes'], ['Pocket packets', 'shop.html?cat=pocket'], ['Bundles & gifting', 'shop.html?cat=bundle'], ['Pack size guide', 'pack-guide.html']]) +
          footCol('Help', [['Track your order', 'order/track.html'], ['Shipping & delivery', 'policies/shipping.html'], ['Returns & refunds', 'policies/returns.html'], ['FAQs', 'faq.html'], ['Contact us', 'contact.html'], ['Your account', 'account.html']]) +
          footCol('About', [['Our story', 'story.html'], ['Journal', 'journal.html'], ['Wholesale enquiries', 'wholesale.html'], ['Seller details', 'about.html'], ['Privacy policy', 'policies/privacy.html'], ['Terms of sale', 'policies/terms.html']]) +
        '</div>' +
        /* LEGAL(ecommerce-rules-2020): seller identity and grievance officer are mandatory. */
        '<p class="text-[11px] text-white/60 leading-relaxed pt-6">Sold by: TODO — registered legal name • TODO — full registered address • GSTIN: TODO • Grievance Officer: TODO (name, email, phone) • <a class="underline" href="' + B + 'about.html">Full seller details</a></p>' +
        '<div class="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/60">' +
          '<p>© 2026 SOLOMO ESSENTIALS. All rights reserved.</p>' +
          '<p class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/20">' + icon('language', 'text-sm') + 'India (INR ₹)</p>' +
        '</div>' +
      '</div>' +
    '</footer>' +
    cartDrawer() +
    '<div aria-live="polite" class="fixed bottom-6 right-6 left-6 sm:left-auto bg-navy-brand text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 transform translate-y-28 opacity-0 pointer-events-none transition-all duration-300 z-[60]" id="quick-toast" role="status">' +
      '<div aria-hidden="true" class="w-8 h-8 rounded-full bg-orange-brand flex items-center justify-center shrink-0">' + icon('check', 'text-sm') + '</div>' +
      '<div><div class="text-xs font-extrabold" id="toast-text">Item added to your basket</div><div class="text-[11px] text-gray-200" id="toast-sub"></div></div>' +
    '</div>' +
    popup()
  );

  renderCards();
  renderImages();
  renderPdp();
  wireChrome();
}

function cartDrawer() {
  return '<div class="fixed inset-0 z-50 overflow-hidden pointer-events-none transition-opacity duration-300 opacity-0" id="cart-drawer">' +
    '<div class="absolute inset-0 bg-navy-brand/40 backdrop-blur-xs" onclick="closeCart()"></div>' +
    '<div aria-labelledby="cart-title" aria-modal="true" class="absolute inset-y-0 right-0 max-w-md w-full bg-white shadow-2xl flex flex-col pointer-events-auto transform translate-x-full transition-transform duration-300" id="cart-drawer-panel" role="dialog">' +
      '<div class="px-6 py-5 border-b border-sand-border flex items-center justify-between">' +
        '<div class="flex items-center gap-2"><h2 class="font-serif font-semibold text-navy-brand text-xl" id="cart-title">Your bag</h2>' +
        '<span class="text-xs bg-orange-light text-orange-brand font-bold px-2 py-0.5 rounded-full" id="drawer-pill-count">0 items</span></div>' +
        '<button aria-label="Close your basket" class="w-9 h-9 rounded-full bg-cream-surface flex items-center justify-center text-slate-body hover:text-navy-brand" id="cart-close" onclick="closeCart()" type="button">' + icon('close', 'text-lg') + '</button>' +
      '</div>' +
      '<div class="px-6 pt-4"><div class="h-2 rounded-full bg-cream-surface overflow-hidden"><div class="h-full bg-orange-brand transition-all duration-300" id="drawer-ship-bar" style="width:0%"></div></div></div>' +
      '<div class="flex-1 overflow-y-auto p-6 space-y-4" id="cart-items-container"></div>' +
      '<div class="p-6 border-t border-sand-border bg-cream-surface/40 space-y-3">' +
        '<form autocomplete="off" class="flex items-center gap-2" data-msg="promo-msg" id="promo-form" onsubmit="applyPromo(event)">' +
          '<label class="sr-only" for="promo-input">Discount code</label>' +
          '<input class="flex-1 min-w-0 bg-white border border-sand-border rounded-full px-4 py-2 text-xs text-navy-brand placeholder:text-slate-body focus:ring-0 focus:border-navy-brand uppercase" id="promo-input" maxlength="20" placeholder="Discount code" type="text"/>' +
          '<button class="px-4 py-2 rounded-full bg-white hover:bg-sand-border border border-sand-border text-navy-brand text-xs font-bold shrink-0" type="submit">Apply</button>' +
        '</form>' +
        '<p aria-live="polite" class="text-[11px] min-h-[1rem]" id="promo-msg"></p>' +
        '<div class="flex items-center justify-between text-xs text-slate-body"><span>Subtotal</span><span class="font-bold text-navy-brand tabular-nums" id="drawer-subtotal">₹0</span></div>' +
        '<div class="hidden items-center justify-between text-xs text-emerald-700 font-semibold" id="drawer-discount-row"><span id="drawer-discount-label">Discount</span><span class="tabular-nums" id="drawer-discount">−₹0</span></div>' +
        '<div class="flex items-center justify-between text-xs font-semibold"><span>Express delivery</span><span class="tabular-nums" id="drawer-shipping">—</span></div>' +
        '<p class="text-[11px] text-slate-body" id="drawer-shipping-note"></p>' +
        '<div class="flex items-center justify-between text-sm font-extrabold text-navy-brand pt-2 border-t border-sand-border"><span>Total</span><span class="tabular-nums" id="drawer-total">₹0</span></div>' +
        '<button class="w-full py-3.5 bg-orange-brand hover:bg-orange-deep disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-sm rounded-full transition-all flex items-center justify-center gap-2" id="checkout-btn" onclick="startCheckout()" type="button"><span>Checkout</span>' + icon('arrow_forward', 'text-base') + '</button>' +
        '<a class="block py-2 text-center text-xs font-bold text-navy-brand hover:text-orange-brand underline decoration-orange-brand decoration-2 underline-offset-2" href="' + BASE + 'cart.html">View full bag</a>' +
      '</div>' +
    '</div>' +
  '</div>';
}

function popup() {
  return '<div aria-labelledby="pop-title" aria-modal="true" class="fixed inset-0 z-[70] flex items-center justify-center p-4" hidden id="signup-pop" role="dialog">' +
    '<div class="absolute inset-0 bg-navy-brand/50" data-pop-close></div>' +
    '<div class="relative w-full max-w-3xl bg-cream-bg rounded-3xl overflow-hidden shadow-2xl grid sm:grid-cols-2">' +
      '<img alt="" class="hidden sm:block w-full h-full object-cover" src="' + pic('TRIO-BX') + '"/>' +
      '<div class="p-8 sm:p-10">' +
        '<button aria-label="Close" class="absolute top-4 right-4 w-9 h-9 rounded-full bg-white flex items-center justify-center" data-pop-close type="button">' + icon('close') + '</button>' +
        '<p class="text-xs font-extrabold uppercase tracking-widest text-orange-brand">Welcome</p>' +
        '<h2 class="font-serif text-3xl font-semibold text-navy-brand mt-2" id="pop-title">10% off your first box</h2>' +
        '<p class="text-sm text-slate-body mt-3">Join the SOLOMO circle for restock alerts and new formats. Your welcome code arrives the moment you sign up.</p>' +
        '<div class="mt-6">' + newsletterForm('pop-email', false) + '</div>' +
        '<button class="mt-2 text-xs font-bold text-slate-body underline" data-pop-close type="button">No thanks</button>' +
      '</div>' +
    '</div>' +
  '</div>';
}

/* --------------------------------------------------------------------------
   Product card — the only card markup on the site.
   Structure matches what solomo.js expects: article[data-sku][data-cat]
   [data-name], h3 a → product page, [data-price], .wishlist[data-sku].
   -------------------------------------------------------------------------- */
function card(sku) {
  var p = PRODUCTS[sku], url = productUrl(sku);
  var hay = (p.name + ' ' + p.tagline + ' ' + p.room).toLowerCase();   // what search matches against
  return '<article class="group reveal" data-cat="' + p.cat + '" data-name="' + esc(hay) + '" data-sku="' + sku + '">' +
    '<div class="relative aspect-[4/5] rounded-2xl overflow-hidden bg-cream-surface">' +
      '<a aria-hidden="true" href="' + url + '" tabindex="-1">' +
        '<img alt="' + esc(p.alt) + '" class="absolute inset-0 w-full h-full object-cover transition-opacity duration-500" loading="lazy" src="' + pic(sku) + '"/>' +
        '<img alt="" class="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500" loading="lazy" src="' + pic(sku, 1) + '"/>' +
      '</a>' +
      '<span class="absolute top-3 left-3 text-[11px] font-extrabold px-2.5 py-1 rounded-full bg-white/95 text-navy-brand">' + esc(p.badge) + '</span>' +
      '<button aria-label="Save ' + esc(p.name) + ' to your wishlist" aria-pressed="false" class="wishlist absolute top-3 right-3 w-9 h-9 rounded-full bg-white/95 flex items-center justify-center text-slate-body hover:text-orange-brand transition-colors" data-sku="' + sku + '" type="button">' + icon('favorite', 'text-xl') + '</button>' +
      '<button class="absolute left-3 right-3 bottom-3 py-3 rounded-full bg-white/95 hover:bg-navy-brand hover:text-white text-navy-brand text-xs font-extrabold flex items-center justify-center gap-1 transition-all lg:translate-y-16 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 focus:translate-y-0 focus:opacity-100" onclick="addToCart(\'' + sku + '\')" type="button">' + icon('add', 'text-base') + 'Quick add</button>' +
    '</div>' +
    '<div class="pt-3.5">' +
      '<h3 class="font-serif text-[17px] font-medium text-navy-brand leading-snug"><a class="hover:text-orange-brand transition-colors" href="' + url + '">' + esc(p.name) + '</a></h3>' +
      '<p class="text-xs text-slate-body mt-0.5">' + esc(p.sub) + '</p>' +
      '<p class="mt-1.5 flex items-baseline gap-2 text-sm"><span class="font-extrabold text-navy-brand tabular-nums" data-price>' + rupees(p.price) + '</span>' +
        '<s class="text-xs text-slate-body tabular-nums">' + rupees(p.mrp) + '</s><span class="text-xs font-bold text-orange-brand">' + offPct(p) + '% off</span></p>' +
    '</div>' +
  '</article>';
}

/* <div data-cards="all|table|…|SKU,SKU" [data-exclude="SKU"]> */
function renderCards() {
  var boxes = document.querySelectorAll('[data-cards]');
  for (var i = 0; i < boxes.length; i++) {
    var want = boxes[i].dataset.cards, skip = boxes[i].dataset.exclude;
    var skus = Object.keys(PRODUCTS).filter(function (s) {
      if (s === skip) return false;
      if (want === 'all') return true;
      if (CATEGORIES[want]) return PRODUCTS[s].cat === want;
      return want.split(',').indexOf(s) !== -1;
    });
    if (!CATEGORIES[want] && want !== 'all') skus.sort(function (a, b) { return want.indexOf(a) - want.indexOf(b); });
    boxes[i].innerHTML = skus.map(card).join('');
  }
}

/* <img data-img="SKU" [data-img-i="1"]> — images come from PRODUCTS too. */
function renderImages() {
  var imgs = document.querySelectorAll('img[data-img]');
  for (var i = 0; i < imgs.length; i++) {
    imgs[i].src = pic(imgs[i].dataset.img, Number(imgs[i].dataset.imgI || 0));
  }
}

/* --------------------------------------------------------------------------
   Product page: <main data-pdp="SKU"></main>
   -------------------------------------------------------------------------- */
function renderPdp() {
  var main = document.querySelector('[data-pdp]');
  if (!main) return;
  var sku = main.dataset.pdp, p = PRODUCTS[sku], B = BASE;
  var shots = [p.img].concat(p.gallery);
  var thumbs = shots.map(function (id, i) {
    return '<button aria-label="Show image ' + (i + 1) + '" class="gal-thumb shrink-0 w-16 h-20 lg:w-20 lg:h-24 rounded-xl overflow-hidden border-2 ' + (i ? 'border-sand-border' : 'border-orange-brand') + '" data-src="' + imageUrl(id) + '" type="button">' +
      '<img alt="" class="w-full h-full object-cover" src="' + imageUrl(id) + '"/></button>';
  }).join('');
  var acc = function (title, body, open) {
    return '<details class="border-b border-sand-border py-4"' + (open ? ' open' : '') + '><summary class="flex items-center justify-between font-serif text-lg font-medium text-navy-brand">' + title + icon('add', 'acc-icon transition-transform') + '</summary>' +
      '<div class="pt-3 text-sm text-slate-body leading-relaxed">' + body + '</div></details>';
  };
  var stars = '';
  for (var s = 0; s < 5; s++) stars += icon('star', 'text-base text-orange-brand').replace('class="', 'style="font-variation-settings:\'FILL\' 1" class="');

  main.innerHTML =
    '<nav aria-label="Breadcrumb" class="max-w-7xl mx-auto px-4 lg:px-10 pt-6 text-xs text-slate-body">' +
      '<a class="hover:text-navy-brand" href="' + B + 'index.html">Home</a> / <a class="hover:text-navy-brand" href="' + B + 'shop.html?cat=' + p.cat + '">' + CATEGORIES[p.cat] + '</a> / <span class="text-navy-brand font-semibold">' + esc(p.name) + '</span></nav>' +
    '<section class="max-w-7xl mx-auto px-4 lg:px-10 pt-6 pb-16 grid lg:grid-cols-12 gap-8 lg:gap-14">' +
      '<div class="lg:col-span-7 flex flex-col-reverse lg:flex-row gap-3">' +
        '<div class="flex lg:flex-col gap-3 overflow-x-auto">' + thumbs + '</div>' +
        '<div class="flex-1 aspect-[4/5] rounded-3xl overflow-hidden bg-cream-surface"><img alt="' + esc(p.alt) + '" class="w-full h-full object-cover" id="gal-main" src="' + pic(sku) + '"/></div>' +
      '</div>' +
      '<div class="lg:col-span-5 lg:sticky lg:top-40 self-start">' +
        '<span class="inline-block text-[11px] font-extrabold px-2.5 py-1 rounded-full bg-orange-light text-orange-brand">' + esc(p.badge) + '</span>' +
        '<h1 class="font-serif text-3xl lg:text-4xl font-semibold text-navy-brand mt-3 leading-tight">' + esc(p.name) + '</h1>' +
        '<a class="mt-2 inline-flex items-center gap-1.5 text-xs text-slate-body" href="#details">' + stars + '<span class="font-bold text-navy-brand">' + p.rating.toFixed(1) + '</span> (' + p.reviews.toLocaleString('en-IN') + ' ratings)</a>' +
        '<p class="mt-4 flex items-baseline gap-3"><span class="text-2xl font-extrabold text-navy-brand tabular-nums">' + rupees(p.price) + '</span>' +
          '<s class="text-slate-body tabular-nums">MRP ' + rupees(p.mrp) + '</s><span class="text-sm font-bold text-orange-brand">' + offPct(p) + '% off</span></p>' +
        '<p class="text-[11px] text-slate-body">Inclusive of all taxes</p>' +
        '<p class="mt-5 text-sm text-slate-body leading-relaxed">' + esc(p.tagline) + '</p>' +
        '<div class="mt-5 p-4 rounded-2xl bg-cream-surface text-sm"><span class="font-bold text-navy-brand">Net quantity:</span> <span class="text-slate-body">' + esc(p.netQty) + '</span></div>' +
        '<div class="mt-6 grid grid-cols-[auto_1fr] gap-3">' +
          '<button aria-label="Save ' + esc(p.name) + ' to your wishlist" aria-pressed="false" class="wishlist w-14 h-14 rounded-full border border-sand-border bg-white flex items-center justify-center text-slate-body" data-sku="' + sku + '" type="button">' + icon('favorite') + '</button>' +
          '<button class="h-14 rounded-full bg-navy-brand hover:bg-navy-muted text-white font-bold transition-colors flex items-center justify-center gap-2" onclick="addToCart(\'' + sku + '\')" type="button">' + icon('shopping_bag', 'text-lg') + 'Add to bag</button>' +
        '</div>' +
        '<button class="mt-3 w-full h-14 rounded-full bg-orange-brand hover:bg-orange-deep text-white font-bold transition-colors" onclick="directBuy(\'' + sku + '\')" type="button">Buy it now</button>' +
        '<ul class="mt-6 grid grid-cols-3 gap-2 text-center text-[11px] font-semibold text-slate-body">' +
          '<li class="p-3 rounded-2xl border border-sand-border">' + icon('local_shipping', 'block text-orange-brand mb-1') + 'Free over ₹499</li>' +
          '<li class="p-3 rounded-2xl border border-sand-border">' + icon('eco', 'block text-orange-brand mb-1') + 'Unbleached bamboo</li>' +
          '<li class="p-3 rounded-2xl border border-sand-border">' + icon('flag', 'block text-orange-brand mb-1') + 'Made in India</li>' +
        '</ul>' +
        '<div class="mt-6" id="details">' +
          acc('Description', '<p>' + esc(p.blurb) + '</p><p class="mt-2"><b class="text-navy-brand">Best for:</b> ' + esc(p.room) + '</p>', true) +
          acc('What’s inside', '<ul class="list-disc pl-5 space-y-1">' + p.inside.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>') +
          /* LEGAL(legal-metrology): net quantity, origin and packer are mandatory on the listing. */
          acc('Product details', '<dl class="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5"><dt class="font-bold text-navy-brand">Net quantity</dt><dd>' + esc(p.netQty) + '</dd><dt class="font-bold text-navy-brand">Country of origin</dt><dd>' + esc(p.origin) + '</dd><dt class="font-bold text-navy-brand">HSN</dt><dd>' + esc(p.hsn) + '</dd><dt class="font-bold text-navy-brand">Packed by</dt><dd>' + esc(p.packer) + '</dd><dt class="font-bold text-navy-brand">MRP</dt><dd>' + rupees(p.mrp) + ' (incl. of all taxes)</dd></dl>') +
          acc('Delivery & returns', '<p>Free express delivery on orders over ₹499 (after discount), otherwise ' + rupees(SHIPPING_FEE) + '. See <a class="underline" href="' + B + 'policies/shipping.html">shipping</a> and <a class="underline" href="' + B + 'policies/returns.html">returns</a>.</p>') +
        '</div>' +
      '</div>' +
    '</section>' +
    '<section class="bg-cream-warm py-16">' +
      '<div class="max-w-7xl mx-auto px-4 lg:px-10">' +
        '<div class="flex items-end justify-between mb-8"><h2 class="font-serif text-3xl font-semibold text-navy-brand">You may also like</h2>' + railArrows('pdp-rail') + '</div>' +
        '<div class="rail rail-4" data-cards="all" data-exclude="' + sku + '" id="pdp-rail"></div>' +
      '</div>' +
    '</section>';

  document.title = p.name + ' — SOLOMO ESSENTIALS';
  renderCards();   // the rail above was just created
}

function railArrows(id) {
  var b = 'w-11 h-11 rounded-full border border-sand-border bg-white hover:bg-navy-brand hover:text-white hover:border-navy-brand flex items-center justify-center transition-colors';
  return '<div class="hidden sm:flex gap-2">' +
    '<button aria-label="Scroll left" class="' + b + '" data-rail="' + id + '" data-dir="-1" type="button">' + icon('arrow_back') + '</button>' +
    '<button aria-label="Scroll right" class="' + b + '" data-rail="' + id + '" data-dir="1" type="button">' + icon('arrow_forward') + '</button></div>';
}

/* --------------------------------------------------------------------------
   Behaviour: announcement ticker, rails, slideshow, reveal, newsletter, popup
   -------------------------------------------------------------------------- */
function wireChrome() {
  /* Announcement ticker */
  var msgs = document.querySelectorAll('#ann .ann-msg'), a = 0;
  function showAnn(d) {
    msgs[a].hidden = true; a = (a + d + msgs.length) % msgs.length; msgs[a].hidden = false;
  }
  var annTimer = setInterval(function () { showAnn(1); }, 4500);
  document.querySelectorAll('[data-ann]').forEach(function (b) {
    b.addEventListener('click', function () { clearInterval(annTimer); showAnn(Number(b.dataset.ann)); });
  });

  /* Rail arrows (also ones written into the page by hand) */
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-rail]');
    if (!b) return;
    var r = document.getElementById(b.dataset.rail);
    r.scrollBy({ left: Number(b.dataset.dir) * r.clientWidth * 0.8 });
  });

  /* Hero slideshow */
  document.querySelectorAll('[data-slideshow]').forEach(function (show) {
    var slides = show.querySelectorAll('.slide'), dots = show.querySelectorAll('[data-dot]'), n = 0, timer;
    function go(i) {
      slides[n].classList.remove('is-on'); dots[n] && dots[n].setAttribute('aria-current', 'false');
      n = (i + slides.length) % slides.length;
      slides[n].classList.add('is-on'); dots[n] && dots[n].setAttribute('aria-current', 'true');
      dots.forEach(function (d, k) { d.classList.toggle('w-8', k === n); d.classList.toggle('bg-white', k === n); d.classList.toggle('w-2.5', k !== n); d.classList.toggle('bg-white/50', k !== n); });
    }
    function auto() { clearInterval(timer); timer = setInterval(function () { go(n + 1); }, 6000); }
    dots.forEach(function (d) { d.addEventListener('click', function () { go(Number(d.dataset.dot)); auto(); }); });
    show.querySelectorAll('[data-step]').forEach(function (b) { b.addEventListener('click', function () { go(n + Number(b.dataset.step)); auto(); }); });
    show.addEventListener('mouseenter', function () { clearInterval(timer); });
    show.addEventListener('mouseleave', auto);
    go(0); auto();
  });

  /* Reveal on scroll */
  var rv = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -40px 0px' });
    rv.forEach(function (el) { io.observe(el); });
  } else { rv.forEach(function (el) { el.classList.add('is-in'); }); }

  /* Newsletter forms.
     TODO(newsletter): POST the email to your list provider. Until then the
     form only validates and shows the code, it stores nothing. */
  document.querySelectorAll('form[data-newsletter]').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = f.querySelector('input'), msg = f.nextElementSibling;
      if (!input.checkValidity()) { msg.textContent = 'Please enter a valid email address.'; return; }
      msg.textContent = 'You’re in. Use code COZY10 at checkout for 10% off.';
      input.value = '';
      remember('solomo.pop', '1');
    });
  });

  /* Sign-up popup: once per browser, after 8 seconds, never over the checkout. */
  var pop = document.getElementById('signup-pop');
  if (recall('solomo.pop') !== '1' && !/checkout|order\//.test(location.pathname)) {
    setTimeout(function () { if (!cartIsOpen()) pop.hidden = false; }, 8000);
  }
  pop.addEventListener('click', function (e) {
    if (e.target.closest('[data-pop-close]')) { pop.hidden = true; remember('solomo.pop', '1'); }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !pop.hidden) { pop.hidden = true; remember('solomo.pop', '1'); }
  });

  /* Header shadow once scrolled */
  var top = document.getElementById('site-top');
  addEventListener('scroll', function () { top.classList.toggle('shadow-md', scrollY > 10); }, { passive: true });
}

function remember(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
function recall(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
