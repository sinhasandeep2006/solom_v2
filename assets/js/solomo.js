/* ==========================================================================
   SOLOMO ESSENTIALS — one shared script for every page
   ==========================================================================
   Loaded by all 21 pages. Everything is guarded, so the same file runs on a
   page with a catalog, a page with only a header, or the checkout.

   Pages in a subfolder set window.SOLOMO_BASE = '../' before loading this,
   so every link and image path resolves from wherever the page lives.
   ========================================================================== */
'use strict';

var BASE = window.SOLOMO_BASE || '';

/* --------------------------------------------------------------------------
   1. PRODUCTS — the single source of truth.
      Nothing reads a price out of the DOM, and no button carries one.

      TODO(images): every `img` is a temporary AI-tool URL that will stop
      resolving without warning. Download, convert to WebP, then change
      IMG_BASE to 'assets/img/' and each img to its filename.

      TODO(legal): `packer` is mandatory on the product page and the invoice.
      Confirm the HSN code and GST rate with your CA — do not guess a rate.
   -------------------------------------------------------------------------- */
var IMG_BASE = 'https://lh3.googleusercontent.com/aida-public/';

var PRODUCTS = {
  'CUBE-06': {
    slug: 'bedside-comfort-cube',
    name: 'Bedside Comfort Cube',
    sub: 'Pack of 6 • 100% Bamboo • 3-Ply',
    tagline: 'Pack of 6 Cubes • 100% Bamboo • 3-Ply Pure Softness',
    price: 449, mrp: 599, cat: 'table', badge: 'Bestseller', badgeClass: 'bg-orange-brand text-white',
    rating: 4.9, reviews: 1840,
    netQty: '6 cubes × 100 pulls (200 sheets each)',
    origin: 'India', hsn: '4818', packer: 'TODO — legal name and full address',
    room: 'Bedside table, bedroom',
    blurb: 'The cube that started it all. Unbleached bamboo pulp with fibres long enough to stay soft through a whole winter cold, and a box small enough to live on a nightstand without shouting about it.',
    inside: ['6 cube boxes', '100 pulls per cube', '3-ply, lint-free', 'Recyclable carton, no plastic window'],
    img: 'AB6AXuAksj6r-3DEkPXitNt7ymcbOrO2T7LTHTL9iaZBadocjolL1WWQbWeePMt2Z5R88fgXSKHMgNxD1Sk2J7N1vtWp9JTcD58EjrSpnU8JrwU9WlvJ2ow7BjqbJLBltkIc0Ic5iYoj9ot1AsuAQV9ePTJc48GXLqSIGWQb_9Vy0vhQ6SfsWCg-pomO2j2Anssqig4rtZn7yZUWCGgnDPx7oBHqmBqUCMvF0ZepvI-uCsIdz6ivDD_cNoEPODonByS5WnFxgQ',
    alt: 'SOLOMO ESSENTIALS Bedside Comfort Cube, a bamboo tissue cube box',
    gallery: [
      'AB6AXuCnRfzOmt_ZGuyi9Z2Pr40DfYzS3T_ZWu5sVKF8X7wI3WhWvlkGC4dxeb1pSBhz9Ll7KEJzJijwDDDPCCanr_pg6UdqB-qwgS46rIVE_KSQYEpsgnoIMz-KpHfwRr7kQXQeY3NZym8QtYiZL5Wxl9i-7hE6EMi7UriRflwI1ewJCah-lcdHwFbnspT2xh60cCbB6qchv__gy45lZMkBHf2E6a-CXaWnEA8Ksy7FQldUiwpViHrNlPYDMtY2IN5E3Uu1yA',
      'AB6AXuCNI8atyKNH70n-wlMNnA5aGVsBdZTdVzVYe_l1GPcAjX3cBlxj-7UzK-bwQw3MoEcsR9sTLBFIWWlIWphqvFd_yRHBKh4sXZaEloOIDcm0NmuBfWSdt_83AUccywj00a0n9OJFq2u6Xxrb078rwEApnI-6hcJN3UXAFCZDG_-rDSchkGAE6uVHwCBusOMZ277NaD22jXC0XqFnML6wSuu3IKzR1hz9jxkeG7G7ggTH2Ivpt_ovYTrpeZsWzpp11HjLsw'
    ]
  },
  'DESK-04': {
    slug: 'desk-essentials-flat-box',
    name: 'Desk Essentials Flat Box',
    sub: 'Pack of 4 • 160 sheets each',
    tagline: 'Pack of 4 Flat Rectangles • 160 Sheets each • Zero Dust',
    price: 599, mrp: 749, cat: 'table', badge: 'Study & Office', badgeClass: 'bg-navy-brand text-white',
    rating: 5.0, reviews: 920,
    netQty: '4 boxes × 160 sheets',
    origin: 'India', hsn: '4818', packer: 'TODO — legal name and full address',
    room: 'Study desk, home office',
    blurb: 'A flat box that slides under a monitor stand instead of competing with it. Zero dust matters more at a desk than anywhere else — these do not shed on a keyboard or a pair of glasses.',
    inside: ['4 flat boxes', '160 sheets per box', '2-ply, lint-free', 'Fits a standard drawer'],
    img: 'AB6AXuDGvT3ApiYhXu5Pxwil5jndZ6QJum8WllTouUTy2420d5sQBeZUG4rm-TkzsQIsCEBEMKMtOUK-VM-6BdI39SaDiKR5bYOGWhClp7PbEa5z8veDUS_r1mqLIbIALY3QO9sAuHMZH_c3YI6qc8F2VwWsn4YXI6KWn6jOEAexxhdTeq78p7jzqHDaB0Oxl8hr8YlCLFtea1WQtnU0FdvRzzEVoxbSp2nnRC6J99BKt_Lni_WjPLrIUkj-aMbsqn0PgIBvcg',
    alt: 'SOLOMO ESSENTIALS Desk Essentials Flat Box of bamboo tissues',
    gallery: [
      'AB6AXuBp3rIXjrYWGw2LZjZPEfptcE7i2LBRlsf0xtrV1JMHem2dfGB3i9xxjL0zbMEY0fEnXkLLVUPTfjN47D8QypY75-e8lLo86cRcDfppMbyKyo9V-L5I-E87P2mNAcbE-I9lFD3hbumIwLxSxjkQzKUjVBA62czWLPRUZ2QZOVM7gtD9lnV1t1sZY4oW-2c9tKFYLthAqzoGHVfKgqB_yqm4Gof2PCBlcnhs3ShtOwMWCjrYh6Wk7mI6urHIjg_MQrFz5w',
      'AB6AXuAVGDNczDgz5D1qgQbUt5Iix7HHesYUxcWRCUe_cQkJlY8auwuOLv-i8Na4bGDEOVQHNgZ4w8XoI3NZKwrY4Wt9K0hGJGwqJXtg3oG_WCLtVvFkZ6jP6uScrEsyBvJTDkOZqSsfMe2lJTX0EOLezUA9wFzzdF201EKeo2CgtOML36b8UqFHGVJDHW39kQL1efYPCM91kgHx38lLxwCSisvMGf5oMNy5XrjQVsWeT6Kae_bJnGIJYp51cX4VI1ueEZCmyg'
    ]
  },
  'WIPE-06': {
    slug: 'pure-bamboo-water-wipes',
    name: 'Pure Bamboo Water Wipes',
    sub: 'Pack of 6 • 480 wipes • Fragrance free',
    tagline: 'Pack of 6 (480 Wipes) • Flip Top • Fragrance Free',
    price: 699, mrp: 899, cat: 'wipes', badge: '99.9% Pure Water', badgeClass: 'bg-blue-brand text-white',
    rating: 4.8, reviews: 640,
    netQty: '6 packs × 80 wipes (480 wipes)',
    origin: 'India', hsn: '4818', packer: 'TODO — legal name and full address',
    room: 'Nursery, changing table',
    blurb: 'Water and bamboo, and very little else. No fragrance, no alcohol, nothing added to make it smell like it is working. Flip-top lid so one hand is enough while the other holds a baby.',
    inside: ['6 flip-top packs', '80 wipes per pack', '99.9% purified water', 'Fragrance and alcohol free'],
    img: 'AB6AXuCEWCpskVheGhdvZdsNxbZQfalo_0tq2wj4JWPpQglGi4ZActXj1e7oYPn0g4kKKb312ftUJdfpOzX276qtYZ-2KkVOsvWiYqmv6yUmePEDvYJv_pl0v4vW5aUClSqhDgadITnaZMM9qr4UPYfi1L7K3zMMrln-CZNfaysCcUu4w4k7IAMIiqI7keJuoKbGNQ-WihkiBncfQLyfJNBF8Cg5KhqWi-08Wdm_P1pwpMCAJA-30DTv5bOC',
    alt: 'SOLOMO ESSENTIALS Pure Bamboo Water Wipes flip-top pack',
    gallery: [
      'AB6AXuBp1V6ChSgc7XLc9oLSds2wcl5Z4kDvbmRih51Ypx_Cf2pTtW-IiTt6iprbUyFYoZuYO3R0UsIPI3v3VWEQb-oxwA31zPA4z3QnXmS2dH-EFOOJFt5JlaUSeSQbdRfX3N0zBZ_ZBW2B-sbz0nAnoKJZCcFOxb5wjE2iMMk1ZzwWvuP8Ccrzlz8_tp3bPQSo2ji2AW-e77jXjoU42-dMn3bF3Jys9EtbCZLC5DdVyQ3b5QCHUeXVC0QKtVRQisbWholt_g'
    ]
  },
  'POCK-18': {
    slug: 'everyday-pocket-packets',
    name: 'Everyday Pocket Packets',
    sub: 'Pack of 18 • 4-Ply reinforced',
    tagline: 'Pack of 18 • Compact handbag & car packs • 4-Ply reinforced',
    price: 349, mrp: 420, cat: 'pocket', badge: 'On-the-go', badgeClass: 'bg-cream-surface text-navy-brand border border-sand-border',
    rating: 4.9, reviews: 410,
    netQty: '18 packets × 10 sheets',
    origin: 'India', hsn: '4818', packer: 'TODO — legal name and full address',
    room: 'Handbag, car console, school bag',
    blurb: 'Eighteen packets, so there is one in every bag and one in the car door. 4-ply because a pocket pack has to survive being sat on, and still work when it is finally needed.',
    inside: ['18 sealed packets', '10 sheets per packet', '4-ply reinforced', 'Resealable flap'],
    img: 'AB6AXuC_4O5bSZ5-N2f4R621vc7PL5wCFbjVPL7A58tnST4VWG8bj2mCbdwRJD0NMAV-nZDE0NeE-td-LpxGvllOXUXotG1wv9I5Ysf1UaavXM9chXzdCSoj57Hdg2vN5dPdtlg_GMudjOIi0Av5BZPTGF4SZKpE6eXM9-KIZ4kCujnQFGtYrjSYCs4i6GIE0L_3gusUxxs_9Rj2A_xpOf5uX7OfTBRdSWu0YsiWklyPepYaF86QPAOpQMmK',
    alt: 'SOLOMO ESSENTIALS Everyday Pocket Packets for bag and car',
    gallery: [
      'AB6AXuChMD8v3i5IXrFOdoqOOtjkfas37PA8yOi0dIgnZ5IxlaggAa5BH_8NJWlg_zyIbcyBDEoGm6VrQ96ASN0qPzM7oU_UYGkhHEV-AK6vfPLwLSmin-MspEq62cHfkVaM8GnLqtK9p2NWZ05LH1R7xeVUswyKqMljq6Rhn6cD2Sd2jwQhX54Sh-oZBRqppHv3jevY8ak0ZmZOp5hfLE7wAtvbFAqEDn6GsLurpjnC-wfAN3eGcudQmUCzVFtSUEfuYNEAJg'
    ]
  },
  'NURS-06': {
    slug: 'starter-nursery-pack',
    name: 'Starter Nursery Pack',
    sub: '6 boxes • Unbleached nursery bundle',
    tagline: '6 Boxes • Unbleached • Built for diaper tables & bottle leaks',
    price: 599, mrp: 749, cat: 'bundle', badge: 'Nursery Bundle', badgeClass: 'bg-emerald-600 text-white',
    rating: 4.9, reviews: 305,
    netQty: '6 boxes × 100 pulls',
    origin: 'India', hsn: '4818', packer: 'TODO — legal name and full address',
    room: 'Nursery, changing station',
    blurb: 'Six boxes, enough to put one wherever a baby is likely to leak. Unbleached throughout, because the skin under a newborn nose is the least forgiving surface in the house.',
    inside: ['6 nursery boxes', '100 pulls per box', 'Unbleached, TCF', 'Sized for a changing table shelf'],
    img: 'AB6AXuBp1V6ChSgc7XLc9oLSds2wcl5Z4kDvbmRih51Ypx_Cf2pTtW-IiTt6iprbUyFYoZuYO3R0UsIPI3v3VWEQb-oxwA31zPA4z3QnXmS2dH-EFOOJFt5JlaUSeSQbdRfX3N0zBZ_ZBW2B-sbz0nAnoKJZCcFOxb5wjE2iMMk1ZzwWvuP8Ccrzlz8_tp3bPQSo2ji2AW-e77jXjoU42-dMn3bF3Jys9EtbCZLC5DdVyQ3b5QCHUeXVC0QKtVRQisbWholt_g',
    alt: 'SOLOMO ESSENTIALS Starter Nursery Pack beside a plush bunny and baby bottle',
    gallery: [
      'AB6AXuCEWCpskVheGhdvZdsNxbZQfalo_0tq2wj4JWPpQglGi4ZActXj1e7oYPn0g4kKKb312ftUJdfpOzX276qtYZ-2KkVOsvWiYqmv6yUmePEDvYJv_pl0v4vW5aUClSqhDgadITnaZMM9qr4UPYfi1L7K3zMMrln-CZNfaysCcUu4w4k7IAMIiqI7keJuoKbGNQ-WihkiBncfQLyfJNBF8Cg5KhqWi-08Wdm_P1pwpMCAJA-30DTv5bOC'
    ]
  },
  'TRIO-BX': {
    slug: 'curated-starter-box',
    name: 'Curated Starter Box',
    sub: 'Trio Edition • 3 formats, 8 units',
    tagline: 'Trio Edition • One cube, one flat box, one pocket set',
    price: 899, mrp: 1099, cat: 'bundle', badge: 'Trio Edition', badgeClass: 'bg-amber-500 text-white',
    rating: 5.0, reviews: 188,
    netQty: '3 formats, 8 units total',
    origin: 'India', hsn: '4818', packer: 'TODO — legal name and full address',
    room: 'Gifting, first order',
    blurb: 'One of each format, so a first order does not have to be a guess. Orange Pebble, Blue Cube and Golden Star on the sleeve — the reason people keep the box after it is empty.',
    inside: ['1 Bedside cube (6 pulls-pack)', '1 Desk flat box', '1 Pocket set of 6', 'Mascot gift sleeve'],
    img: 'AB6AXuC64BRG-KrSFDkV4nRBV-v5lwuWYS7f7iAJ63vx6rF2OONtExMgZMBI-HChmOAC4mnScEp2rcYOoHBdToo_i3nAKI3N2GCQPIrmmK-n-xRL-XHJHwBv3KUzZF2ms-N-p6T44q5voPBsUa4HwKJ_kCTtGI3AsmFAIq6m6HCWOjmsl1XaJ42RGsc0BT5yyB0qdsJEsJSnxMtNwh6cXtXL0D4kRd_gYBTuAmQkXanJHkAWoH5RKri3qZ__2yjOjJBwSqAxDA',
    alt: 'The SOLOMO ESSENTIALS mascot trio — Orange Pebble, Blue Cube and Golden Star',
    gallery: [
      'AB6AXuBBOZ6sSRDlCEDLHPFK6dsMXdNdenm-K6tQhlR2D-NH1v49pt7j-vWQxvtalRtckEM7U9kWWMSuVJ10UavE8M0UWJQQyIga_G0TE9uw2uvM2GkJGoXogPaA8YbC08f7TVzXQCb_8AGoXUcwhirxc0wXwflUnAvc7kH1uN7y0x2O25CjOtOSpsKc7LQzrtvICQV1qnNL02CEErllRxX8Y-sx76Oh_0X7mX23UK311SH4G3nnlUP1JbWTJ63bguN6bewWGg'
    ]
  }
};

var CATEGORIES = {
  all: 'All Essentials', table: 'Table Boxes', wipes: 'Pure Wipes',
  pocket: 'Pocket Travel', bundle: 'Bundles'
};

/* --------------------------------------------------------------------------
   2. Pricing. One place, so the drawer, the cart page and the checkout can
      never disagree.

      TODO(pricing): the ₹499 threshold matches the announcement bar. The fee
      below it was never stated anywhere — confirm ₹49. The threshold is tested
      AFTER the discount, and that wording is shown to the customer so it
      cannot be a surprise at the till.
   -------------------------------------------------------------------------- */
var FREE_SHIPPING_OVER = 499;
var SHIPPING_FEE = 49;

/* One code per order. Stacking a 10% code with a 20% first-box offer on a
   ₹349 pocket pack is how you ship at a loss. */
var PROMOS = {
  COZY10: { type: 'percent', value: 10, label: 'COZY10 — 10% off' }
};

function rupees(n) { return '₹' + Math.round(n).toLocaleString('en-IN'); }

function shippingFor(payable) {
  return payable >= FREE_SHIPPING_OVER ? 0 : SHIPPING_FEE;
}

/** The only place money is calculated. Whole rupees. */
function totals(items, code) {
  var subtotal = 0;
  for (var i = 0; i < items.length; i++) {
    var p = PRODUCTS[items[i].sku];
    if (!p) continue;                       // an unknown sku is worth nothing
    subtotal += p.price * items[i].qty;
  }
  var promo = code ? PROMOS[code] : null;
  var discount = 0;
  if (promo && subtotal > 0) {
    discount = promo.type === 'percent'
      ? Math.round(subtotal * promo.value / 100)
      : Math.min(promo.value, subtotal);
  }
  var payable = subtotal - discount;
  var shipping = subtotal > 0 ? shippingFor(payable) : 0;
  return {
    subtotal: subtotal, discount: discount, shipping: shipping,
    total: payable + shipping, promoLabel: promo ? promo.label : null
  };
}

/* --------------------------------------------------------------------------
   3. Persistence. localStorage throws in private windows and with blocked
      site data, so every read and write is guarded and the page renders fine
      without it.
   -------------------------------------------------------------------------- */
var CART_KEY = 'solomo.cart.v1';
var PROMO_KEY = 'solomo.promo.v1';
var WISH_KEY = 'solomo.wish.v1';

function load(key, fallback) {
  try {
    var raw = localStorage.getItem(key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch (e) { return fallback; }
}
function save(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* page still works */ }
}

/* Drop anything that is not a live SKU, so a retired product cannot linger in
   someone's basket for months. */
var cart = load(CART_KEY, []).filter(function (l) {
  return l && PRODUCTS[l.sku] && l.qty > 0;
}).map(function (l) {
  return { sku: l.sku, qty: Math.min(Math.max(1, l.qty | 0), 99) };
});
var promoCode = load(PROMO_KEY, null);
if (promoCode && !PROMOS[promoCode]) promoCode = null;
var wishlist = load(WISH_KEY, []).filter(function (s) { return PRODUCTS[s]; });

function persist() { save(CART_KEY, cart); save(PROMO_KEY, promoCode); }

function productUrl(sku) { return BASE + 'products/' + PRODUCTS[sku].slug + '.html'; }
function imageUrl(id) { return IMG_BASE + id; }

/* --------------------------------------------------------------------------
   4. Cart operations
   -------------------------------------------------------------------------- */
function addToCart(sku, silent) {
  var p = PRODUCTS[sku];
  if (!p) return;                             // never trust a stray call
  var line = null;
  for (var i = 0; i < cart.length; i++) if (cart[i].sku === sku) line = cart[i];
  if (line) {
    line.qty = Math.min(line.qty + 1, 99);    // merge, never a second row
  } else {
    cart.push({ sku: sku, qty: 1 });
  }
  persist();
  renderAll();
  if (!silent) toast(p.name + ' added to your basket');
}

function setQty(sku, qty) {
  var i = -1, k;
  for (k = 0; k < cart.length; k++) if (cart[k].sku === sku) i = k;
  if (i === -1) return;
  var n = Math.min(Math.max(0, qty | 0), 99);
  if (n === 0) { cart.splice(i, 1); } else { cart[i].qty = n; }
  persist();
  renderAll();
}

function removeFromCart(sku) {
  var p = PRODUCTS[sku];
  setQty(sku, 0);
  if (p) toast(p.name + ' removed');
}

function clearCart() { cart = []; promoCode = null; persist(); renderAll(); }

function directBuy(sku) { addToCart(sku, true); openCart(); }

function applyPromoCode(code) {
  code = (code || '').trim().toUpperCase();
  if (!code) return { ok: false, message: '' };
  if (!PROMOS[code]) {
    promoCode = null; persist(); renderAll();
    return { ok: false, message: code + ' is not a valid code.' };
  }
  if (!cart.length) {
    return { ok: false, message: 'Add something to your basket first.' };
  }
  promoCode = code; persist(); renderAll();
  return { ok: true, message: PROMOS[code].label + ' applied.' };
}

function applyPromo(event) {
  event.preventDefault();
  var form = event.currentTarget;
  var input = form.querySelector('input');
  var msg = document.getElementById(form.dataset.msg || 'promo-msg');
  var res = applyPromoCode(input.value);
  if (res.ok) input.value = '';
  if (msg) {
    msg.textContent = res.message;
    msg.className = 'text-[11px] min-h-[1rem] ' +
      (res.ok ? 'text-emerald-700 font-semibold' : 'text-red-700');
  }
}

/* --------------------------------------------------------------------------
   5. Rendering. createElement + textContent throughout — writing a product
      name into innerHTML is an XSS hole the moment names come from a backend.
   -------------------------------------------------------------------------- */
function el(tag, className, text) {
  var n = document.createElement(tag);
  if (className) n.className = className;
  if (text !== undefined) n.textContent = text;
  return n;
}

function qtyButton(label, ariaLabel, onClick, icon) {
  var b = el('button', 'w-8 h-8 rounded-full text-navy-brand flex items-center justify-center hover:bg-white active:scale-90 transition');
  b.type = 'button';
  b.setAttribute('aria-label', ariaLabel);
  b.appendChild(el('span', 'material-symbols-outlined text-lg', icon || label));
  b.addEventListener('click', onClick);
  return b;
}

/** One row builder, used by the drawer and by cart.html. */
function cartRow(line, big) {
  var p = PRODUCTS[line.sku];
  var row = el('div', 'flex gap-4 ' + (big ? 'p-4 sm:p-5' : 'p-3') + ' rounded-2xl bg-white border border-sand-border shadow-sm hover:shadow-md transition-shadow');

  var link = document.createElement('a');
  link.href = productUrl(line.sku);
  link.className = 'shrink-0';
  var img = document.createElement('img');
  img.src = imageUrl(p.img);
  img.alt = '';
  img.setAttribute('aria-hidden', 'true');
  img.loading = 'lazy';
  img.className = (big ? 'w-24 h-24 sm:w-28 sm:h-28' : 'w-20 h-20') + ' rounded-xl object-cover bg-cream-surface';
  link.appendChild(img);
  row.appendChild(link);

  var mid = el('div', 'flex-1 min-w-0 flex flex-col');

  // Name + line total on one line, so the eye reads "what" then "how much".
  var top = el('div', 'flex items-start justify-between gap-3');
  var h = el('h3', (big ? 'text-base' : 'text-sm') + ' font-bold text-navy-brand leading-snug');
  var hLink = document.createElement('a');
  hLink.href = productUrl(line.sku);
  hLink.className = 'hover:text-orange-brand transition-colors';
  hLink.textContent = p.name;
  h.appendChild(hLink);
  top.appendChild(h);
  var price = el('div', 'flex items-baseline gap-1.5 shrink-0');
  if (p.mrp > p.price) price.appendChild(el('span', 'text-xs text-slate-body line-through tabular-nums', rupees(p.mrp * line.qty)));
  price.appendChild(el('span', (big ? 'text-lg' : 'text-base') + ' font-extrabold text-navy-brand tabular-nums leading-snug', rupees(p.price * line.qty)));
  top.appendChild(price);
  mid.appendChild(top);

  mid.appendChild(el('p', 'text-xs text-slate-body mt-0.5', p.sub));
  var meta = el('div', 'flex flex-wrap items-center gap-2 mt-1.5');
  if (line.qty > 1) meta.appendChild(el('span', 'text-[11px] text-slate-body tabular-nums', rupees(p.price) + ' each'));
  if (p.mrp > p.price) meta.appendChild(el('span', 'text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full tabular-nums', 'You save ' + rupees((p.mrp - p.price) * line.qty)));
  mid.appendChild(meta);

  var controls = el('div', 'flex items-center justify-between gap-2 mt-auto pt-3');
  var stepper = el('div', 'inline-flex items-center gap-1 rounded-full bg-cream-surface border border-sand-border p-0.5');
  // At qty 1 the minus becomes a bin, so "reduce" never silently deletes.
  stepper.appendChild(line.qty === 1
    ? qtyButton('', 'Remove ' + p.name + ' from your basket', function () { removeFromCart(line.sku); }, 'delete')
    : qtyButton('', 'Reduce quantity of ' + p.name, function () { setQty(line.sku, line.qty - 1); }, 'remove'));
  var qty = el('span', 'text-sm font-bold text-navy-brand w-6 text-center tabular-nums', String(line.qty));
  qty.setAttribute('aria-live', 'polite');
  stepper.appendChild(qty);
  stepper.appendChild(qtyButton('', 'Increase quantity of ' + p.name, function () { setQty(line.sku, line.qty + 1); }, 'add'));
  controls.appendChild(stepper);

  var del = el('button', 'inline-flex items-center gap-1 text-xs font-semibold text-slate-body hover:text-red-700 px-2 py-1.5 rounded-full hover:bg-red-50 transition-colors');
  del.type = 'button';
  del.setAttribute('aria-label', 'Remove ' + p.name + ' from your basket');
  del.appendChild(el('span', 'material-symbols-outlined text-base', 'delete'));
  del.appendChild(el('span', '', 'Remove'));
  del.addEventListener('click', function () { removeFromCart(line.sku); });
  controls.appendChild(del);

  mid.appendChild(controls);
  row.appendChild(mid);
  return row;
}

function setText(id, value) {
  var n = document.getElementById(id);
  if (n) n.textContent = value;
}

function fillItems(containerId, big, emptyHtmlId) {
  var box = document.getElementById(containerId);
  if (!box) return;
  box.textContent = '';
  if (!cart.length) {
    var empty = document.getElementById(emptyHtmlId);
    if (empty) { empty.hidden = false; return; }
    box.appendChild(el('p', 'text-sm text-slate-body text-center py-10', 'Your basket is empty.'));
    return;
  }
  var hide = document.getElementById(emptyHtmlId);
  if (hide) hide.hidden = true;
  for (var i = 0; i < cart.length; i++) box.appendChild(cartRow(cart[i], big));
}

/** Updates every cart surface that happens to be on this page. */
function renderAll() {
  var t = totals(cart, promoCode);
  var count = cart.reduce(function (n, l) { return n + l.qty; }, 0);

  setText('nav-cart-count', String(count));
  setText('drawer-pill-count', count === 1 ? '1 item' : count + ' items');
  setText('cart-page-count', count === 1 ? '1 item' : count + ' items');

  fillItems('cart-items-container', false, null);
  fillItems('cart-page-items', true, 'cart-empty');

  ['drawer', 'page'].forEach(function (scope) {
    setText(scope + '-subtotal', rupees(t.subtotal));
    setText(scope + '-total', rupees(t.total));

    var dRow = document.getElementById(scope + '-discount-row');
    if (dRow) {
      if (t.discount > 0) {
        dRow.classList.remove('hidden'); dRow.classList.add('flex');
        setText(scope + '-discount-label', t.promoLabel);
        setText(scope + '-discount', '−' + rupees(t.discount));
      } else {
        dRow.classList.add('hidden'); dRow.classList.remove('flex');
      }
    }

    var ship = document.getElementById(scope + '-shipping');
    var note = document.getElementById(scope + '-shipping-note');
    if (ship) {
      if (!cart.length) {
        ship.textContent = '—';
        ship.className = 'tabular-nums text-slate-body';
      } else if (t.shipping === 0) {
        ship.textContent = 'FREE';
        ship.className = 'tabular-nums text-emerald-700';
      } else {
        ship.textContent = rupees(t.shipping);
        ship.className = 'tabular-nums text-navy-brand';
      }
    }
    if (note) {
      note.textContent = (cart.length && t.shipping > 0)
        ? 'Add ' + rupees(FREE_SHIPPING_OVER - (t.subtotal - t.discount)) + ' more (after discount) for free express delivery.'
        : '';
    }

    var bar = document.getElementById(scope + '-ship-bar');
    if (bar) {
      var pct = Math.min(100, Math.round((t.subtotal - t.discount) / FREE_SHIPPING_OVER * 100));
      bar.style.width = (cart.length ? pct : 0) + '%';
    }
  });

  var btn = document.getElementById('checkout-btn');
  if (btn) btn.disabled = cart.length === 0;
  var btn2 = document.getElementById('checkout-btn-page');
  if (btn2) btn2.disabled = cart.length === 0;

  renderCheckoutSummary(t);
}

/* --------------------------------------------------------------------------
   6. Checkout handoff.

      TODO(price-authority): this is the seam. The browser sends ONLY
      {sku, qty} and the code. A server resolves prices from its own table,
      creates the gateway order, and returns an amount the browser never had a
      chance to choose. Replace startCheckout() with:

        const res = await fetch('/api/order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(checkoutPayload())
        });
        const { razorpayOrderId, amount, keyId } = await res.json();
        new Razorpay({ key: keyId, order_id: razorpayOrderId, ... }).open();

      On the server: never mark an order paid from the browser's return trip.
      Only a signature-verified webhook may set status = 'paid'.
   -------------------------------------------------------------------------- */
function checkoutPayload() {
  return {
    items: cart.map(function (l) { return { sku: l.sku, qty: l.qty }; }),  // no prices, by design
    promoCode: promoCode
  };
}

function renderCheckoutSummary(t) {
  var box = document.getElementById('checkout-lines');
  if (!box) return;
  box.textContent = '';
  for (var i = 0; i < cart.length; i++) {
    var p = PRODUCTS[cart[i].sku];
    var row = el('div', 'flex items-center justify-between gap-3 text-xs');
    row.appendChild(el('span', 'text-slate-body', cart[i].qty + ' × ' + p.name));
    row.appendChild(el('span', 'font-semibold text-navy-brand tabular-nums', rupees(p.price * cart[i].qty)));
    box.appendChild(row);
  }
  setText('pay-amount', rupees(t.total));
}

function startCheckout() {
  if (!cart.length) return;
  window.location.href = BASE + 'checkout.html';
}

/* --------------------------------------------------------------------------
   7. Drawer: focus trap, Esc, scroll lock.
   -------------------------------------------------------------------------- */
var lastFocused = null;
var FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])';

function cartIsOpen() {
  var d = document.getElementById('cart-drawer');
  return d && !d.classList.contains('opacity-0');
}

function openCart() {
  var drawer = document.getElementById('cart-drawer');
  var panel = document.getElementById('cart-drawer-panel');
  if (!drawer || !panel) { window.location.href = BASE + 'cart.html'; return; }
  if (cartIsOpen()) return;
  lastFocused = document.activeElement;
  drawer.classList.remove('opacity-0', 'pointer-events-none');
  drawer.classList.add('opacity-100');
  panel.classList.remove('translate-x-full');
  panel.classList.add('translate-x-0');
  document.body.classList.add('drawer-open');
  closeMobileNav();
  var close = document.getElementById('cart-close');
  if (close) close.focus();
}

function closeCart() {
  var drawer = document.getElementById('cart-drawer');
  var panel = document.getElementById('cart-drawer-panel');
  if (!drawer || !panel || !cartIsOpen()) return;
  drawer.classList.add('opacity-0', 'pointer-events-none');
  drawer.classList.remove('opacity-100');
  panel.classList.add('translate-x-full');
  panel.classList.remove('translate-x-0');
  document.body.classList.remove('drawer-open');
  if (lastFocused && lastFocused.focus) lastFocused.focus();
}

/* --------------------------------------------------------------------------
   8. Mobile navigation
   -------------------------------------------------------------------------- */
function toggleMobileNav() {
  var nav = document.getElementById('mobile-nav');
  if (!nav) return;
  if (nav.hidden) { openMobileNav(); } else { closeMobileNav(); }
}
function openMobileNav() {
  var nav = document.getElementById('mobile-nav');
  var t = document.getElementById('mobile-nav-toggle');
  var i = document.getElementById('mobile-nav-icon');
  if (!nav) return;
  nav.hidden = false;
  if (t) { t.setAttribute('aria-expanded', 'true'); t.setAttribute('aria-label', 'Close menu'); }
  if (i) i.textContent = 'close';
}
function closeMobileNav() {
  var nav = document.getElementById('mobile-nav');
  var t = document.getElementById('mobile-nav-toggle');
  var i = document.getElementById('mobile-nav-icon');
  if (!nav || nav.hidden) return;
  nav.hidden = true;
  if (t) { t.setAttribute('aria-expanded', 'false'); t.setAttribute('aria-label', 'Open menu'); }
  if (i) i.textContent = 'menu';
}

/* --------------------------------------------------------------------------
   9. Toast
   -------------------------------------------------------------------------- */
var toastTimer = null;
function toast(message, sub) {
  var t = document.getElementById('quick-toast');
  if (!t) return;
  setText('toast-text', message);
  var subEl = document.getElementById('toast-sub');
  if (subEl) {
    subEl.textContent = sub === undefined
      ? 'Free delivery on orders over ' + rupees(FREE_SHIPPING_OVER) + '.'
      : sub;
    subEl.hidden = !subEl.textContent;
  }
  t.classList.remove('translate-y-28', 'opacity-0', 'pointer-events-none');
  t.classList.add('translate-y-0', 'opacity-100');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () {
    t.classList.add('translate-y-28', 'opacity-0', 'pointer-events-none');
    t.classList.remove('translate-y-0', 'opacity-100');
  }, 2600);
}

/* --------------------------------------------------------------------------
   10. Catalog filtering — only on pages that have a grid.
   -------------------------------------------------------------------------- */
var cards = [];
var activeCat = 'all';
var query = '';

function paintTabs() {
  var tabs = document.querySelectorAll('#category-tabs button');
  for (var i = 0; i < tabs.length; i++) {
    var on = tabs[i].dataset.cat === activeCat;
    tabs[i].setAttribute('aria-selected', on ? 'true' : 'false');
    tabs[i].className = 'shrink-0 whitespace-nowrap px-4 py-2 rounded-full transition-colors ' +
      (on ? 'bg-navy-brand text-white shadow-sm' : 'text-navy-muted hover:text-navy-brand');
  }
}

function applyFilters() {
  if (!cards.length) return;
  var shown = 0;
  for (var i = 0; i < cards.length; i++) {
    var card = cards[i];
    var catOk = activeCat === 'all' || card.dataset.cat === activeCat;
    var hay = (card.dataset.name + ' ' + card.dataset.sku).toLowerCase();
    var textOk = !query || hay.indexOf(query) !== -1;
    var visible = catOk && textOk;
    card.hidden = !visible;
    if (visible) shown++;
  }
  var none = document.getElementById('no-results');
  if (none) {
    none.hidden = shown !== 0;
    none.textContent = query
      ? 'Nothing matches “' + query + '”. Try “cube”, “wipes” or “pocket”.'
      : 'Nothing in this category yet.';
  }
  setText('result-count', shown === 1 ? '1 product' : shown + ' products');
}

function wireSearch(id) {
  var box = document.getElementById(id);
  if (!box) return;
  box.addEventListener('input', function () {
    query = box.value.trim().toLowerCase();
    var twinId = id === 'site-search' ? 'site-search-mobile' : 'site-search';
    var twin = document.getElementById(twinId);
    if (twin && twin.value !== box.value) twin.value = box.value;
    if (query && activeCat !== 'all') { activeCat = 'all'; paintTabs(); }
    applyFilters();
    var cat = document.getElementById('catalog');
    if (query && cat) cat.scrollIntoView({ block: 'start' });
  });
}

/* --------------------------------------------------------------------------
   11. Wishlist
   -------------------------------------------------------------------------- */
function paintWishlist() {
  var btns = document.querySelectorAll('.wishlist');
  for (var i = 0; i < btns.length; i++) {
    var on = wishlist.indexOf(btns[i].dataset.sku) !== -1;
    btns[i].setAttribute('aria-pressed', on ? 'true' : 'false');
    var icon = btns[i].querySelector('.material-symbols-outlined');
    if (icon) icon.style.fontVariationSettings = on ? "'FILL' 1" : "'FILL' 0";
    btns[i].classList.toggle('text-orange-brand', on);
    btns[i].classList.toggle('text-slate-body', !on);
  }
  var badge = document.getElementById('nav-wish-count');
  if (badge) { badge.textContent = wishlist.length; badge.hidden = !wishlist.length; badge.classList.toggle('hidden', !wishlist.length); }
}

/* --------------------------------------------------------------------------
   12. Self-check. Money maths, and the HTML/PRODUCTS agreement.
       Runs on localhost, file:// and ?selfcheck — never in a customer's
       browser. Open the console: silence means it passed.
   -------------------------------------------------------------------------- */
function selfCheck() {
  var failed = 0;
  function ok(cond, what) { if (!cond) { console.error('SELF-CHECK FAILED:', what); failed++; } }

  ok(totals([{ sku: 'CUBE-06', qty: 2 }], null).subtotal === 898, 'subtotal 2×449');
  ok(totals([{ sku: 'BOGUS', qty: 9 }], null).subtotal === 0, 'unknown sku is worth nothing');
  ok(shippingFor(FREE_SHIPPING_OVER) === 0, 'free exactly at the threshold');
  ok(shippingFor(FREE_SHIPPING_OVER - 1) === SHIPPING_FEE, 'fee one rupee below');

  var d = totals([{ sku: 'POCK-18', qty: 1 }], 'COZY10');
  ok(d.discount === 35, 'COZY10 on 349 rounds to 35');
  ok(d.total === 349 - 35 + SHIPPING_FEE, 'total = subtotal − discount + shipping');
  ok(totals([{ sku: 'DESK-04', qty: 1 }], 'COZY10').shipping === 0, '539 after discount still ships free');
  ok(totals([{ sku: 'CUBE-06', qty: 1 }], 'COZY10').shipping === SHIPPING_FEE, '404 after discount pays shipping');
  ok(totals([], 'COZY10').discount === 0, 'empty basket cannot earn a discount');

  /* The payload must never leak a price. */
  var before = cart;
  cart = [{ sku: 'CUBE-06', qty: 3 }];
  var body = JSON.stringify(checkoutPayload());
  ok(!/449|price|mrp/i.test(body), 'payload carries no price: ' + body);
  cart = before;

  /* Every SKU needs a slug and a category that a tab can reach. */
  for (var sku in PRODUCTS) {
    ok(!!PRODUCTS[sku].slug, sku + ' has no slug, so it has no product page');
    ok(!!CATEGORIES[PRODUCTS[sku].cat], sku + ' category "' + PRODUCTS[sku].cat + '" is not a known tab');
  }

  /* Every price printed in this page's HTML must match PRODUCTS. */
  for (var i = 0; i < cards.length; i++) {
    var card = cards[i], s = card.dataset.sku;
    ok(!!PRODUCTS[s], 'card ' + s + ' exists in PRODUCTS');
    if (!PRODUCTS[s]) continue;
    var priceNode = card.querySelector('[data-price]');
    if (priceNode) {
      var printed = Number(priceNode.textContent.replace(/[^0-9]/g, ''));
      ok(printed === PRODUCTS[s].price, s + ' card shows ' + printed + ' but PRODUCTS says ' + PRODUCTS[s].price);
    }
    var a = card.querySelector('h3 a');
    ok(!!a, s + ' card title does not link to a product page');
    if (a) {
      ok(a.getAttribute('href').indexOf('products/' + PRODUCTS[s].slug + '.html') !== -1,
         s + ' links to ' + a.getAttribute('href') + ' but its slug is ' + PRODUCTS[s].slug);
    }
  }

  console.log(failed === 0 ? 'self-check passed' : 'self-check: ' + failed + ' failed');
}

/* --------------------------------------------------------------------------
   13. Boot
   -------------------------------------------------------------------------- */
function boot() {
  cards = Array.prototype.slice.call(document.querySelectorAll('#product-grid article'));

  var tabs = document.querySelectorAll('#category-tabs button');
  for (var i = 0; i < tabs.length; i++) {
    (function (tab) {
      tab.addEventListener('click', function () {
        activeCat = tab.dataset.cat; paintTabs(); applyFilters();
      });
    })(tabs[i]);
  }

  var navLinks = document.querySelectorAll('[data-nav-cat]');
  for (var j = 0; j < navLinks.length; j++) {
    (function (link) {
      link.addEventListener('click', function () {
        if (!cards.length) return;            // on another page, just follow the href
        activeCat = link.dataset.navCat;
        query = '';
        ['site-search', 'site-search-mobile'].forEach(function (id) {
          var e = document.getElementById(id); if (e) e.value = '';
        });
        paintTabs(); applyFilters(); closeMobileNav();
      });
    })(navLinks[j]);
  }

  wireSearch('site-search');
  wireSearch('site-search-mobile');

  var wishBtns = document.querySelectorAll('.wishlist');
  for (var k = 0; k < wishBtns.length; k++) {
    (function (btn) {
      btn.addEventListener('click', function () {
        var sku = btn.dataset.sku;
        var idx = wishlist.indexOf(sku);
        if (idx === -1) { wishlist.push(sku); } else { wishlist.splice(idx, 1); }
        save(WISH_KEY, wishlist);
        paintWishlist();
        toast(PRODUCTS[sku].name + (idx === -1 ? ' saved to your wishlist' : ' removed from your wishlist'), '');
      });
    })(wishBtns[k]);
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (cartIsOpen()) { closeCart(); return; }
      closeMobileNav();
      return;
    }
    if (e.key !== 'Tab' || !cartIsOpen()) return;
    var panel = document.getElementById('cart-drawer-panel');
    var items = Array.prototype.slice.call(panel.querySelectorAll(FOCUSABLE))
      .filter(function (n) { return n.offsetParent !== null; });
    if (!items.length) return;
    var first = items[0], last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  /* The search boxes are real form elements pointing at search.html. On a page
     that has its own grid the live filter already answers the query, so the
     submit is intercepted; everywhere else it navigates normally. */
  var forms = document.querySelectorAll('form[data-search]');
  for (var m = 0; m < forms.length; m++) {
    forms[m].addEventListener('submit', function (e) {
      if (!cards.length) return;              // let it go to search.html
      e.preventDefault();
      var cat = document.getElementById('catalog');
      if (cat) cat.scrollIntoView({ block: 'start' });
    });
  }

  paintTabs();
  applyFilters();
  paintWishlist();
  renderAll();

  if (location.hostname === 'localhost' || location.hostname === '127.0.0.1' ||
      location.protocol === 'file:' || location.search.indexOf('selfcheck') !== -1) {
    selfCheck();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
