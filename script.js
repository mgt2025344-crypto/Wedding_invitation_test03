/* =====================================================================
   WEDDING INVITATION – EDIT ONLY THE "CONFIG" BLOCK BELOW
   Everything on the page is filled from these values.
   ===================================================================== */
const CONFIG = {
  // ---- Names -------------------------------------------------------
  brideName: "Sanduni",
  groomName: "Kasun",

  // ---- Date & time ---------------------------------------------------
  // Format: YYYY-MM-DDTHH:MM:SS+05:30  (+05:30 = Sri Lanka time). Drives card AND countdown.
  weddingDate: "2027-02-14T10:00:00+05:30",
  weddingTimeText: "10:00 AM",          // text shown beside the venue
  locale: "en-GB",

  // ---- Media (paths relative to index.html) ---------------------------
  openingVideo: "./opening-video.mp4",   // REPLACE VIDEO HERE
  videoPoster:  "./poster.jpg",          // frame shown before video loads
  bridePhoto:   "./bride.jpg",           // REPLACE BRIDE PHOTO HERE
  groomPhoto:   "./groom.jpg",           // REPLACE GROOM PHOTO HERE

  // ---- Venue ---------------------------------------------------------
  venueImage:   "./venue.jpg",           // REPLACE HOTEL IMAGE HERE
  venueName:    "Galle Face Hotel",
  venueAddress: "2 Galle Rd, Colombo 00300, Sri Lanka",
  // Google Maps > Share > Embed a map > copy ONLY the src="..." URL
  googleMapsEmbedUrl:      "https://www.google.com/maps?q=Galle+Face+Hotel+Colombo&output=embed",
  // Google Maps > Share > Send a link > copy link
  googleMapsDirectionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Galle+Face+Hotel+Colombo",

  // ---- Text ----------------------------------------------------------
  heroMessage: "request the pleasure of your company as they begin their forever.",
  brideIntro: "Gentle, curious and endlessly kind, she lights up every room with her laughter and her love of small, beautiful things.",
  groomIntro: "Thoughtful, steady and quietly funny, he found his home the day he met her and has never looked back.",
  loveMessage: "Of all the paths that led us here, every one was worth walking, because each of them brought us to you.",
  loveSignature: "With all our love",
  thanksMessage: "Your presence is the greatest gift. Thank you for sharing this day and filling it with joy.",

  // ---- Schedule (add, remove or reorder freely) ----------------------
  // icon options: "rings", "lotus", "glass", "dinner"
  schedule: [
    { time: "10:00 AM", title: "Ceremony",         desc: "Exchange of vows and rings.",        icon: "rings"  },
    { time: "11:30 AM", title: "Poruwa Ceremony",  desc: "The traditional Sri Lankan blessing.", icon: "lotus"  },
    { time: "01:00 PM", title: "Reception",        desc: "Welcome toasts and celebration.",    icon: "glass"  },
    { time: "03:00 PM", title: "Wedding Lunch",    desc: "Share a festive meal with us.",      icon: "dinner" }
  ],

  // ---- Theme colours (change hex values) ------------------------------
  theme: { lavender: "#b9a6d6", lavenderSoft: "#efe8f7", ivory: "#fbf8f3", gold: "#b8975a", ink: "#4a3f5c" }
};

/* ===================== ENGINE – no edits needed ===================== */
const $ = (id) => document.getElementById(id);
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const date = new Date(CONFIG.weddingDate);

const ICONS = {
  rings:  '<circle cx="9" cy="14" r="5"/><circle cx="16" cy="14" r="5"/><path d="M7 5l2-2 2 2-2 2z"/>',
  lotus:  '<path d="M12 20c-4 0-7-3-8-8 3 0 5 1 8 4 3-3 5-4 8-4-1 5-4 8-8 8zM12 4c2 3 2 7 0 12-2-5-2-9 0-12z"/>',
  glass:  '<path d="M8 3h8l-1 7a3 3 0 0 1-6 0zM12 13v7M8 21h8"/>',
  dinner: '<path d="M5 3v8M8 3v8M5 7h3M6.5 11v10M17 3c-2 2-2 8 0 9v9"/>'
};

function applyTheme() {
  const t = CONFIG.theme, r = document.documentElement.style;
  r.setProperty("--lav", t.lavender); r.setProperty("--lav-soft", t.lavenderSoft);
  r.setProperty("--ivory", t.ivory); r.setProperty("--gold", t.gold); r.setProperty("--ink", t.ink);
}

function splitLetters(el, text) {
  el.setAttribute("aria-label", text);
  el.innerHTML = [...text].map((c, i) => `<span class="ch" style="--i:${i}" aria-hidden="true">${c}</span>`).join("");
}

function fillContent() {
  const fmt = (o) => new Intl.DateTimeFormat(CONFIG.locale, o).format(date);
  document.title = `${CONFIG.brideName} & ${CONFIG.groomName} – Wedding Invitation`;
  splitLetters($("heroBride"), CONFIG.brideName); splitLetters($("heroGroom"), CONFIG.groomName);
  document.querySelectorAll("[data-bind]").forEach((n) => (n.textContent = CONFIG[n.dataset.bind]));
  $("heroMessage").textContent = CONFIG.heroMessage;
  $("heroDate").textContent = fmt({ day: "numeric", month: "long", year: "numeric" });
  $("brideImg").src = CONFIG.bridePhoto; $("groomImg").src = CONFIG.groomPhoto;
  $("brideIntro").textContent = CONFIG.brideIntro; $("groomIntro").textContent = CONFIG.groomIntro;
  $("cardWeekday").textContent = fmt({ weekday: "long" });
  $("cardDay").textContent = fmt({ day: "numeric" });
  $("cardMonth").textContent = fmt({ month: "long" });
  $("cardYear").textContent = fmt({ year: "numeric" });
  $("cardTime").textContent = CONFIG.weddingTimeText;
  $("venueImg").src = CONFIG.venueImage;
  $("venueName").textContent = CONFIG.venueName; $("venueAddress").textContent = CONFIG.venueAddress;
  $("venueWhen").textContent = `${fmt({ weekday: "long", day: "numeric", month: "long", year: "numeric" })} at ${CONFIG.weddingTimeText}`;
  $("mapFrame").src = CONFIG.googleMapsEmbedUrl; $("directions").href = CONFIG.googleMapsDirectionsUrl;
  $("loveMessage").innerHTML = CONFIG.loveMessage.split(" ").map((w, i) => `<span class="w" style="--i:${i}">${w}</span>`).join(" ");
  $("loveSig").textContent = CONFIG.loveSignature;
  $("thanksMessage").textContent = CONFIG.thanksMessage;
  $("thanksNames").textContent = `${CONFIG.brideName} & ${CONFIG.groomName}`;
  $("timeline").insertAdjacentHTML("beforeend", CONFIG.schedule.map((s, i) => `
    <li class="tl reveal ${i % 2 ? "slide-r" : "slide-l"}"><span class="dot"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">${ICONS[s.icon] || ICONS.rings}</svg></span>
    <div class="tl-card"><time>${s.time}</time><h3>${s.title}</h3><p>${s.desc}</p></div></li>`).join(""));
}

/* ---------- Opening video ---------- */
function setupIntro() {
  const v = $("introVideo"), hint = $("introHint");
  $("introBg").style.backgroundImage = `url(${CONFIG.videoPoster})`;
  v.poster = CONFIG.videoPoster; v.src = CONFIG.openingVideo;
  let done = false;
  const finish = () => {
    if (done) return; done = true;
    $("intro").classList.add("out");                       // smooth fade-out
    document.body.classList.remove("is-intro");
    $("main").removeAttribute("aria-hidden");
    scrollTo(0, 0); $("main").classList.add("show");
    setTimeout(() => $("intro").remove(), 1600);          // cleanup only; transition is triggered by 'ended'
  };
  v.addEventListener("ended", finish);                    // the ONLY normal trigger
  v.addEventListener("error", finish);                    // broken file: never trap the visitor
  // Try with sound first; browsers usually block it, so fall back to muted autoplay.
  v.muted = false;
  v.play().catch(() => { v.muted = true; return v.play(); }).then(() => {
    if (v.muted) {                                        // restore sound on first touch
      const unmute = () => { v.muted = false; };
      addEventListener("pointerdown", unmute, { once: true });
    }
  }).catch(() => {                                        // autoplay fully blocked: tap anywhere
    hint.hidden = false;
    addEventListener("pointerdown", () => { hint.hidden = true; v.muted = true; v.play().catch(finish); }, { once: true });
  });
}

/* ---------- Scroll reveal ---------- */
function setupReveal() {
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  }), { threshold: 0.18, rootMargin: "0px 0px -6% 0px" });
  document.querySelectorAll(".reveal, .quote, .person").forEach((el) => io.observe(el));
}

/* ---------- Flip card ---------- */
function setupFlip() {
  const c = $("flipCard");
  c.addEventListener("click", () => {
    const on = c.classList.toggle("flipped");
    c.setAttribute("aria-pressed", on);
    c.setAttribute("aria-label", on ? "Tap to flip back" : "Tap to reveal the wedding date");
  });
}

/* ---------- Countdown ---------- */
function setupCountdown() {
  const els = { D: $("cdD"), H: $("cdH"), M: $("cdM"), S: $("cdS") };
  const set = (el, val) => {
    const s = String(val).padStart(2, "0");
    if (el.textContent === s) return;
    el.textContent = s; el.classList.remove("tick"); void el.offsetWidth; el.classList.add("tick");
  };
  const tick = () => {
    let ms = date - Date.now();
    if (ms <= 0) {
      $("countdown").hidden = true; const d = $("countDone"); d.hidden = false;
      d.textContent = "Today is the day! Join us in celebrating the wedding of " + CONFIG.brideName + " & " + CONFIG.groomName + ".";
      return clearInterval(timer);
    }
    const s = Math.floor(ms / 1000);
    set(els.D, Math.floor(s / 86400)); set(els.H, Math.floor(s / 3600) % 24);
    set(els.M, Math.floor(s / 60) % 60); set(els.S, s % 60);
  };
  const timer = setInterval(tick, 1000); tick();
}

/* ---------- Parallax, timeline progress, petals ---------- */
function setupScroll() {
  const par = [...document.querySelectorAll("[data-parallax]")], fill = $("lineFill"), tl = $("timeline");
  let ticking = false;
  const update = () => {
    ticking = false;
    if (!reduce) par.forEach((p) => { const r = p.getBoundingClientRect(); p.style.transform = `translate3d(0,${(r.top - innerHeight / 2) * p.dataset.parallax}px,0)`; });
    const r = tl.getBoundingClientRect();
    fill.style.transform = `scaleY(${Math.min(1, Math.max(0, (innerHeight * 0.6 - r.top) / r.height))})`;
  };
  addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  update();
}
function setupPetals() {
  if (reduce) return;
  const n = innerWidth < 600 ? 8 : 14, box = $("petals");
  for (let i = 0; i < n; i++) {
    const p = document.createElement("i");
    p.style.cssText = `left:${Math.random() * 100}%;--s:${8 + Math.random() * 10}px;--d:${14 + Math.random() * 12}s;--dl:${-Math.random() * 20}s;--x:${-40 + Math.random() * 80}px`;
    box.appendChild(p);
  }
}

applyTheme(); fillContent(); setupFlip(); setupCountdown(); setupReveal(); setupScroll(); setupPetals(); setupIntro();
