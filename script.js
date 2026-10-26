const FRIEND_NAME = "Khudija Teeju";

const MUSIC_MODE = "synth";
const MUSIC_URL = "";
const MUSIC_LOCAL = "assets/audio/birthday-music.mp3";

const galleryImages = [
  { src: "", alt: "Sunflowers glowing in warm golden-hour sunlight", caption: "A Little Sunshine" },
  { src: "", alt: "A bouquet of sunflowers tied with a ribbon", caption: "Beautiful Blooms" },
  { src: "", alt: "A colorful field of flowers under a warm sky", caption: "A World of Beauty" },
  { src: "", alt: "A birthday cake with candles and sunflowers", caption: "A Sweet Celebration" },
  { src: "", alt: "A birthday gift with a golden ribbon and a sunflower", caption: "A Little Surprise" },
  { src: "", alt: "A peaceful garden filled with sunflowers", caption: "Moments of Sunshine" }
];

const LETTER = [
  "Dear [FRIEND_NAME],",
  "Happy Birthday to a truly wonderful person!",
  "On your special day, I just want to appreciate the kind of person you are. Your supportive nature, kindness, and the way you encourage others are qualities worth celebrating.",
  "Sometimes, a person doesn't even realize how much positivity they bring into other people's lives. I hope you always remember that your presence, your efforts, and your good heart matter.",
  "May this new chapter of your life bring you happiness, peace, success, good health, beautiful memories, and countless reasons to smile.",
  "Keep being the amazing person you are, keep chasing your dreams, and never forget how much potential you have.",
  "May you always have a reason to smile, a dream to follow, and a little sunshine wherever life takes you. Just like sunflowers brighten a garden, may happiness and beautiful opportunities brighten every chapter of your life. 🌻",
  "You deserve a birthday filled with happiness and a year filled with beautiful opportunities.",
  "Once again, a very Happy Birthday to you! 🎂💛",
  "With lots of good wishes,",
  "Your Friend"
];

const WISHES = [
  "May this year surprise you with beautiful opportunities.",
  "You deserve more happiness than you can imagine.",
  "May your dreams become plans and your plans become achievements.",
  "Never forget how much your kindness matters.",
  "May you find peace in the little things and joy in the big ones.",
  "Keep smiling, keep growing, and keep being yourself.",
  "May your life always have a little sunshine in every season.",
  "May your efforts bloom into something wonderful.",
  "May you find courage for every challenge and happiness in every achievement.",
  "May every new beginning bring hope and beautiful possibilities.",
  "May your days be filled with laughter, meaningful friendships, and peaceful moments.",
  "Keep shining in your own beautiful way, just like a sunflower."
];

const FINAL_WISHES = [
  "You make the world a little brighter. Never stop shining. 🌻",
  "Here's to a year of sunshine, laughter, and gentle new beginnings. 💛",
  "May every day of this year feel like a golden afternoon in a sunflower field. 🌻",
  "You are appreciated more than you know. Happy Birthday! 🎉"
];

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const isSmall = () => innerWidth < 600;
document.documentElement.classList.add("js");
document.title = `Happy Birthday, ${FRIEND_NAME}! 🌻`;
$$(".fname").forEach(n => (n.textContent = FRIEND_NAME));
$("#year").textContent = new Date().getFullYear();

const petalSvg = (() => {
  let s = "";
  for (let i = 0; i < 16; i++) s += `<ellipse cx="0" cy="-33" rx="9" ry="17" fill="${i % 2 ? "#FFD95A" : "#E8B83F"}" transform="rotate(${i * 22.5})"/>`;
  return s + `<circle r="19" fill="#5b3a29"/><circle r="12" fill="#402743" opacity=".55"/>`;
})();
$("#sf").innerHTML = petalSvg;

const toastEl = $("#toast");
let toastTimer;
function toast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove("show"), 2600);
}

const fx = $("#fx");
const COLORS = ["#FFD95A", "#E8B83F", "#FF8FB1", "#B79BFF", "#7FC8A9", "#FFFFFF"];
function spawn(kind, x, y, travelX, travelY, duration) {
  const el = document.createElement("i");
  el.className = "p " + kind;
  el.style.left = x + "px";
  el.style.top = y + "px";
  if (kind === "confetti") el.style.background = COLORS[(Math.random() * COLORS.length) | 0];
  if (kind === "heart") el.textContent = "💛";
  if (kind === "star") el.textContent = "✦";
  fx.appendChild(el);
  const spin = Math.random() * 720 - 360;
  el.animate(
    [{ transform: "translate(0,0) rotate(0)", opacity: 1 }, { transform: `translate(${travelX}px,${travelY}px) rotate(${spin}deg)`, opacity: 0 }],
    { duration, easing: "cubic-bezier(.2,.7,.4,1)" }
  ).onfinish = () => el.remove();
}
function burst(x, y, count = 40) {
  if (reduceMotion) return;
  const n = isSmall() ? Math.round(count / 2) : count;
  const kinds = ["confetti", "confetti", "petal", "star", "heart"];
  for (let i = 0; i < n; i++) {
    const a = Math.random() * Math.PI * 2, d = 70 + Math.random() * 170;
    spawn(kinds[i % kinds.length], x, y, Math.cos(a) * d, Math.sin(a) * d + 140, 1200 + Math.random() * 900);
  }
}
function rain(count = 30) {
  if (reduceMotion) return;
  const n = isSmall() ? Math.round(count / 2) : count;
  const kinds = ["petal", "confetti", "heart", "star"];
  for (let i = 0; i < n; i++)
    setTimeout(() => spawn(kinds[i % 4], Math.random() * innerWidth, -20, Math.random() * 120 - 60, innerHeight + 40, 2800 + Math.random() * 2200), Math.random() * 1200);
}
function centerOf(el) {
  const r = el.getBoundingClientRect();
  return [r.left + r.width / 2, r.top + r.height / 2];
}
function celebrate(el, count) {
  const [x, y] = centerOf(el);
  burst(x, y, count);
}

$$(".drift").forEach(layer => {
  const n = isSmall() ? Math.ceil(layer.dataset.n / 2) : +layer.dataset.n;
  for (let i = 0; i < n; i++) {
    const p = document.createElement("i");
    p.style.left = Math.random() * 100 + "%";
    p.style.animationDuration = 12 + Math.random() * 14 + "s";
    p.style.animationDelay = -Math.random() * 20 + "s";
    p.style.transform = `scale(${0.6 + Math.random() * 0.8})`;
    layer.appendChild(p);
  }
});

const burger = $("#burger"), menu = $("#menu");
function setMenu(open) {
  menu.classList.toggle("open", open);
  burger.setAttribute("aria-expanded", open);
  burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}
burger.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
menu.addEventListener("click", e => { if (e.target.tagName === "A") setMenu(false); });
const sectionIds = $$("#menu a").map(a => a.getAttribute("href"));
const navObserver = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) $$("#menu a").forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id));
  });
}, { rootMargin: "-45% 0px -50% 0px" });
sectionIds.forEach(id => { const s = $(id); if (s) navObserver.observe(s); });

$("#openSurprise").addEventListener("click", () => $("#gift").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" }));
$("#magicBtn").addEventListener("click", e => { celebrate(e.currentTarget, 50); rain(14); });


const giftBtn = $("#giftBtn"), giftCard = $("#giftCard");
function setGift(open) {
  giftBtn.setAttribute("aria-expanded", open);
  giftBtn.setAttribute("aria-label", open ? "Gift is open" : "Tap to open your gift");
  giftCard.classList.toggle("open", open);
  $("#giftHint").textContent = open ? "A little sunshine for you 🌻" : "Tap the gift to open it";
  if (open) { celebrate(giftBtn, 60); rain(10); }
}
giftBtn.addEventListener("click", () => setGift(giftBtn.getAttribute("aria-expanded") !== "true"));
$("#giftClose").addEventListener("click", () => { setGift(false); giftBtn.focus(); });

$("#letterBody").innerHTML = LETTER.map(t => `<p>${t.replace(/\[FRIEND_NAME\]/g, FRIEND_NAME).replace(/</g, "&lt;")}</p>`).join("");
const letterBtn = $("#letterBtn");
letterBtn.addEventListener("click", () => {
  const open = letterBtn.getAttribute("aria-expanded") !== "true";
  letterBtn.setAttribute("aria-expanded", open);
  letterBtn.textContent = open ? "Close Letter 💌" : "Open Your Birthday Letter 💌";
  $("#env").classList.toggle("gone", open);
  $("#letterWrap").classList.toggle("open", open);
  if (open) setTimeout(() => $("#letterWrap").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" }), 350);
});

$$(".wish").forEach(card => card.addEventListener("click", e => {
  card.classList.add("tap");
  setTimeout(() => card.classList.remove("tap"), 400);
  burst(e.clientX, e.clientY, 10);
}));
$$(".ap").forEach(ap => {
  const b = $("button", ap);
  b.addEventListener("click", () => {
    const open = !ap.classList.contains("open");
    ap.classList.toggle("open", open);
    b.setAttribute("aria-expanded", open);
  });
});

const garden = $("#garden"), plot = $("#plot");
(function buildGarden() {
  const n = isSmall() ? 5 : 9;
  for (let i = 0; i < n; i++) {
    const f = document.createElement("div");
    const s = 52 + Math.random() * 46, h = 70 + Math.random() * 130;
    f.className = "gf";
    f.style.cssText = `left:${(i + 0.5) * (100 / n) - 3}%;--s:${s}px;--h:${h}px;--d:${-Math.random() * 4}s`;
    f.innerHTML = `<div class="stem"></div><svg viewBox="-50 -50 100 100"><use href="#sf"/></svg>`;
    plot.appendChild(f);
  }
  const flies = isSmall() ? 2 : 4;
  for (let i = 0; i < flies; i++) {
    const b = document.createElement("span");
    b.className = "fly";
    b.textContent = "🦋";
    b.style.cssText = `left:${10 + i * 22}%;top:${15 + (i % 2) * 25}%;animation-delay:${-i * 2}s`;
    plot.appendChild(b);
  }
})();
$("#bloomBtn").addEventListener("click", e => {
  garden.classList.add("bloom");
  $("#gardenMsg").classList.add("open");
  celebrate(e.currentTarget, 50);
  rain(20);
});

const art = (() => {
  const fl = (x, y, r) => {
    let s = `<g transform="translate(${x} ${y})">`;
    for (let i = 0; i < 12; i++) s += `<ellipse cy="${-r * 0.75}" rx="${r * 0.22}" ry="${r * 0.45}" fill="#FFD95A" transform="rotate(${i * 30})"/>`;
    return s + `<circle r="${r * 0.38}" fill="#5b3a29"/></g>`;
  };
  const stem = (x, y, h) => `<rect x="${x - 3}" y="${y}" width="6" height="${h}" fill="#66865B"/>`;
  const scenes = [
    ["#FFE9A8", "#FFB85C", () => [0, 1, 2, 3].map(i => stem(90 + i * 140, 250, 200) + fl(90 + i * 140, 230 - (i % 2) * 40, 62)).join("") + `<rect y="400" width="600" height="50" fill="#66865B"/>`],
    ["#FFF0F5", "#EDE4FF", () => `<path d="M300 420 L230 220 M300 420 L300 200 M300 420 L370 220" stroke="#66865B" stroke-width="7"/>` + fl(230, 200, 70) + fl(300, 170, 80) + fl(370, 200, 70) + `<path d="M270 390h60l-8 40h-44z" fill="#E8B83F"/>`],
    ["#FFD9E8", "#D8C8FF", () => Array.from({ length: 14 }, (_, i) => `<circle cx="${40 + (i % 7) * 85}" cy="${300 + Math.floor(i / 7) * 80 - (i % 3) * 20}" r="22" fill="${["#FF8FB1", "#B79BFF", "#FFD95A"][i % 3]}"/><circle cx="${40 + (i % 7) * 85}" cy="${300 + Math.floor(i / 7) * 80 - (i % 3) * 20}" r="7" fill="#FFF8E7"/>`).join("") + `<rect y="410" width="600" height="40" fill="#66865B"/>`],
    ["#FFF3C4", "#FFD9E8", () => `<rect x="150" y="300" width="300" height="100" rx="14" fill="#F8C8DC"/><rect x="200" y="220" width="200" height="85" rx="14" fill="#EDE4FF"/>` + [255, 300, 345].map(x => `<rect x="${x}" y="170" width="10" height="50" fill="#fff"/><ellipse cx="${x + 5}" cy="158" rx="8" ry="13" fill="#FFB300"/>`).join("") + fl(300, 350, 28) + fl(210, 350, 22) + fl(390, 350, 22) + `<ellipse cx="300" cy="405" rx="190" ry="14" fill="#E8B83F"/>`],
    ["#EDE4FF", "#FFF0F5", () => `<rect x="170" y="240" width="260" height="170" rx="10" fill="#FFD95A"/><rect x="150" y="205" width="300" height="50" rx="10" fill="#E8B83F"/><rect x="282" y="205" width="36" height="205" fill="#fff"/>` + fl(300, 170, 44)],
    ["#FFE0A0", "#9FC58A", () => `<path d="M0 450 Q300 300 600 450z" fill="#66865B" opacity=".6"/>` + [[120, 280, 56], [260, 230, 70], [420, 270, 60], [520, 330, 40], [60, 360, 36]].map(([x, y, r]) => stem(x, y, 450 - y) + fl(x, y, r)).join("")]
  ];
  return i => {
    const [a, b, draw] = scenes[i % scenes.length];
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="600" height="450" fill="url(#g)"/>${draw()}</svg>`;
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  };
})();

const photosEl = $("#photos");
galleryImages.forEach((g, i) => {
  const b = document.createElement("button");
  b.className = "ph rv";
  b.style.setProperty("--d", i * 0.08 + "s");
  b.setAttribute("aria-label", `View larger: ${g.caption}`);
  const wrap = document.createElement("div");
  wrap.className = "im";
  const img = new Image();
  img.width = 600; img.height = 450;
  img.alt = g.alt;
  if (i >= 3) img.loading = "lazy";
  img.addEventListener("error", () => { if (!img.dataset.fb) { img.dataset.fb = 1; img.src = art(i); } });
  img.src = g.src || art(i);
  wrap.appendChild(img);
  const cap = document.createElement("span");
  cap.textContent = g.caption;
  b.append(wrap, cap);
  b.addEventListener("click", () => openLightbox(i, b));
  photosEl.appendChild(b);
});

const lb = $("#lb"), lbImg = $("#lbImg"), lbCap = $("#lbCap");
let lbIndex = 0, lbOpener = null;
function showPhoto(i) {
  lbIndex = (i + galleryImages.length) % galleryImages.length;
  const g = galleryImages[lbIndex];
  lbImg.dataset.fb = "";
  lbImg.src = g.src || art(lbIndex);
  lbImg.alt = g.alt;
  lbCap.textContent = g.caption;
}
lbImg.addEventListener("error", () => { if (!lbImg.dataset.fb) { lbImg.dataset.fb = 1; lbImg.src = art(lbIndex); } });
function openLightbox(i, opener) {
  lbOpener = opener;
  showPhoto(i);
  lb.hidden = false;
  document.body.classList.add("lock");
  $("#lbClose").focus();
}
function closeLightbox() {
  if (lb.hidden) return;
  lb.hidden = true;
  document.body.classList.remove("lock");
  if (lbOpener) lbOpener.focus();
}
$("#lbClose").addEventListener("click", closeLightbox);
$("#lbPrev").addEventListener("click", () => showPhoto(lbIndex - 1));
$("#lbNext").addEventListener("click", () => showPhoto(lbIndex + 1));
lb.addEventListener("click", e => { if (e.target === lb) closeLightbox(); });
let touchX = null;
lb.addEventListener("touchstart", e => { touchX = e.touches[0].clientX; }, { passive: true });
lb.addEventListener("touchend", e => {
  if (touchX === null) return;
  const dx = e.changedTouches[0].clientX - touchX;
  if (Math.abs(dx) > 50) showPhoto(lbIndex + (dx < 0 ? 1 : -1));
  touchX = null;
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape") { closeLightbox(); setMenu(false); }
  if (lb.hidden) return;
  if (e.key === "ArrowLeft") showPhoto(lbIndex - 1);
  if (e.key === "ArrowRight") showPhoto(lbIndex + 1);
  if (e.key === "Tab") {
    const f = $$("button", lb), first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
});

const cake = $("#cake");
$("#blowBtn").addEventListener("click", e => {
  if (cake.classList.contains("out")) return;
  cake.classList.add("out");
  $("#cakeMsg").classList.add("open");
  celebrate(cake, 45);
});
$("#relightBtn").addEventListener("click", () => {
  cake.classList.remove("out");
  $("#cakeMsg").classList.remove("open");
});

let lastWish = -1;
const wishText = $("#wishText");
$("#wishBtn").addEventListener("click", e => {
  let i;
  do { i = (Math.random() * WISHES.length) | 0; } while (i === lastWish);
  lastWish = i;
  wishText.classList.remove("swap");
  void wishText.offsetWidth;
  wishText.textContent = WISHES[i];
  wishText.classList.add("swap");
  celebrate(e.currentTarget, 20);
});
async function copyText(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) { await navigator.clipboard.writeText(text); return true; }
  } catch (err) {}
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.setAttribute("readonly", "");
  ta.style.cssText = "position:fixed;left:-9999px";
  document.body.appendChild(ta);
  ta.select();
  let ok = false;
  try { ok = document.execCommand("copy"); } catch (err) {}
  ta.remove();
  return ok;
}
$("#copyBtn").addEventListener("click", async () => {
  if (lastWish < 0) return toast("Reveal a wish first ✨");
  toast((await copyText(WISHES[lastWish])) ? "Wish copied 💛" : "Couldn't copy. Please select the text and copy it.");
});

let finalCount = 0;
$("#finalBtn").addEventListener("click", e => {
  const section = $("#final");
  section.classList.remove("bloom");
  void section.offsetWidth;
  section.classList.add("bloom");
  $("#finalWish").textContent = FINAL_WISHES[finalCount++ % FINAL_WISHES.length];
  $("#finalMsg").classList.add("open");
  celebrate(e.currentTarget, 70);
  rain(30);
});

$$(".wish,.ap,.tl-list li").forEach((el, i) => { el.classList.add("rv"); el.style.setProperty("--d", (i % 3) * 0.12 + "s"); });
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) {
      en.target.classList.add("in", "in-view");
      revealObserver.unobserve(en.target);
    }
  });
}, { threshold: 0.15 });
$$(".rv,#garden").forEach(el => revealObserver.observe(el));

const musicBtn = $("#musicBtn");
let audio = null, ctx = null, synthTimer = null, playing = false;
const MELODY = [523, 659, 784, 659, 587, 698, 880, 698, 523, 659, 784, 1047, 880, 784, 659, 587];
function playNote(freq, t) {
  const o = ctx.createOscillator(), g = ctx.createGain();
  o.type = "sine";
  o.frequency.value = freq;
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(0.09, t + 0.05);
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.9);
  o.connect(g).connect(ctx.destination);
  o.start(t);
  o.stop(t + 1);
}
function startSynth() {
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) throw new Error("no audio");
  ctx = ctx || new AC();
  ctx.resume();
  let step = 0;
  const tick = () => {
    const t = ctx.currentTime + 0.05;
    playNote(MELODY[step % MELODY.length], t);
    if (step % 4 === 0) playNote(MELODY[step % MELODY.length] / 2, t);
    step++;
  };
  tick();
  synthTimer = setInterval(tick, 550);
}
function setMusicUI(on) {
  playing = on;
  musicBtn.classList.toggle("on", on);
  musicBtn.setAttribute("aria-pressed", on);
  musicBtn.setAttribute("aria-label", on ? "Pause music" : "Play music");
  $("#musicIcon").textContent = on ? "⏸" : "🎵";
}
async function toggleMusic() {
  if (playing) {
    clearInterval(synthTimer);
    if (audio) audio.pause();
    if (ctx) ctx.suspend();
    return setMusicUI(false);
  }
  try {
    if (MUSIC_MODE === "synth") startSynth();
    else {
      if (!audio) {
        audio = new Audio(MUSIC_MODE === "local" ? MUSIC_LOCAL : MUSIC_URL);
        audio.loop = true;
        audio.addEventListener("error", () => { setMusicUI(false); toast("Music isn't available right now, but everything else still works 🌻"); });
      }
      await audio.play();
    }
    setMusicUI(true);
  } catch (err) {
    setMusicUI(false);
    toast("Music isn't available right now, but everything else still works 🌻");
  }
}
musicBtn.addEventListener("click", toggleMusic);