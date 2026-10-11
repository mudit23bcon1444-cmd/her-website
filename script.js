/* ============================================================
   HEARTBREAK REEL – script.js
   Pure CSS/HTML 35mm film strip experience.
   Single-file vanilla JS. No external dependencies. No build step.
   ============================================================ */

'use strict';

/* ──────────────────────────────────────────────────────────
   CONFIG  ← Edit these values to personalise the experience
   ────────────────────────────────────────────────────────── */
const CONFIG = {
  /** Array of image paths shown in the film reel (relative to index.html).
   *  Drop photos into assets/images/ and list them here in order. */
  images: [
    'assets/images/WhatsApp Image 2026-10-11 at 22.00.57.jpeg',
    'assets/images/WhatsApp Image 2026-10-11 at 22.01.00.jpeg',
    'assets/images/WhatsApp Image 2026-10-11 at 22.01.03.jpeg',
    'assets/images/WhatsApp Image 2026-10-11 at 22.01.04.jpeg',
    'assets/images/WhatsApp Image 2026-10-11 at 22.01.05 (1).jpeg',
    'assets/images/WhatsApp Image 2026-10-11 at 22.01.05 (2).jpeg',
    'assets/images/WhatsApp Image 2026-10-11 at 22.01.05.jpeg',
    'assets/images/WhatsApp Image 2026-10-11 at 22.01.06 (1).jpeg',
    'assets/images/WhatsApp Image 2026-10-11 at 22.01.06 (2).jpeg',
    'assets/images/WhatsApp Image 2026-10-11 at 22.01.06.jpeg',
    'assets/images/WhatsApp Image 2026-10-11 at 22.01.07 (1).jpeg',
    'assets/images/WhatsApp Image 2026-10-11 at 22.01.07 (2).jpeg',
    'assets/images/WhatsApp Image 2026-10-11 at 22.01.07.jpeg',
    'assets/images/WhatsApp Image 2026-10-11 at 22.01.08 (1).jpeg',
    'assets/images/WhatsApp Image 2026-10-11 at 22.01.08 (2).jpeg',
    'assets/images/WhatsApp Image 2026-10-11 at 22.01.08.jpeg',
    'assets/images/WhatsApp Image 2026-10-11 at 22.01.09 (1).jpeg',
    'assets/images/WhatsApp Image 2026-10-11 at 22.01.09 (2).jpeg',
    'assets/images/WhatsApp Image 2026-10-11 at 22.01.09.jpeg',
    'assets/images/WhatsApp Image 2026-10-11 at 22.01.10 (1).jpeg',
    'assets/images/WhatsApp Image 2026-10-11 at 22.01.10 (2).jpeg',
    'assets/images/WhatsApp Image 2026-10-11 at 22.01.10.jpeg',
    'assets/images/WhatsApp Image 2026-10-11 at 22.01.11.jpeg',
    'assets/images/WhatsApp Image 2026-10-11 at 23.08.28.jpeg',
    'assets/images/WhatsApp Image 2026-10-11 at 23.08.29 (1).jpeg',
    'assets/images/WhatsApp Image 2026-10-11 at 23.08.29 (2).jpeg',
    'assets/images/WhatsApp Image 2026-10-11 at 23.08.29.jpeg',
    'assets/images/WhatsApp Image 2026-10-11 at 23.08.30 (1).jpeg',
    'assets/images/WhatsApp Image 2026-10-11 at 23.08.30 (2).jpeg',
    'assets/images/WhatsApp Image 2026-10-11 at 23.08.30.jpeg',
    'assets/images/WhatsApp Image 2026-10-11 at 23.08.31 (1).jpeg',
    'assets/images/WhatsApp Image 2026-10-11 at 23.08.31 (2).jpeg',
    'assets/images/WhatsApp Image 2026-10-11 at 23.08.31.jpeg',
    'assets/images/WhatsApp Image 2026-10-11 at 23.08.32 (1).jpeg',
    'assets/images/WhatsApp Image 2026-10-11 at 23.08.32 (2).jpeg',
    'assets/images/WhatsApp Image 2026-10-11 at 23.08.32.jpeg',
    'assets/images/WhatsApp Image 2026-10-11 at 23.08.33 (1).jpeg',
    'assets/images/WhatsApp Image 2026-10-11 at 23.08.33 (2).jpeg',
    'assets/images/WhatsApp Image 2026-10-11 at 23.08.33.jpeg',
    'assets/images/WhatsApp Image 2026-10-11 at 23.08.34 (1).jpeg',
    'assets/images/WhatsApp Image 2026-10-11 at 23.08.34 (2).jpeg',
    'assets/images/WhatsApp Image 2026-10-11 at 23.08.34.jpeg',
    'assets/images/WhatsApp Image 2026-10-11 at 23.08.35 (1).jpeg',
    'assets/images/WhatsApp Image 2026-10-11 at 23.08.35 (2).jpeg',
    'assets/images/WhatsApp Image 2026-10-11 at 23.08.35.jpeg',
    'assets/images/WhatsApp Image 2026-10-11 at 23.08.36 (1).jpeg',
    'assets/images/WhatsApp Image 2026-10-11 at 23.08.36 (2).jpeg',
    'assets/images/WhatsApp Image 2026-10-11 at 23.08.36 (3).jpeg',
    'assets/images/WhatsApp Image 2026-10-11 at 23.08.36.jpeg',
    'assets/images/WhatsApp Image 2026-10-11 at 23.08.37 (1).jpeg',
    'assets/images/WhatsApp Image 2026-10-11 at 23.08.37 (2).jpeg',
    'assets/images/WhatsApp Image 2026-10-11 at 23.08.37.jpeg',
    'assets/images/WhatsApp Image 2026-10-11 at 23.08.38 (1).jpeg',
    'assets/images/WhatsApp Image 2026-10-11 at 23.08.38 (2).jpeg',
    'assets/images/WhatsApp Image 2026-10-11 at 23.08.38.jpeg',
    'assets/images/WhatsApp Image 2026-10-11 at 23.08.39 (1).jpeg',
    'assets/images/WhatsApp Image 2026-10-11 at 23.08.39 (2).jpeg',
    'assets/images/WhatsApp Image 2026-10-11 at 23.08.39.jpeg',
  ],

  /** Two audio tracks that crossfade in a loop.
   *  Drop your .mp3 files into assets/audio/. */
  audio: [
    'assets/audio/Navjot Ahuja - Khat (Official Audio).mp3',
    'assets/audio/Ishq Official Lyrical Video I @TheAmer311 I@theimaginarypoet I@rauhanmalik I Love Song 2024.mp3',
  ],

  /** Message shown after the heart breaks (typewriter effect).
   *  Use \n for line breaks. */
  message: 'Every frame of us — a film I never stop replaying.\nYou were the story worth telling.',

  /** Film strip vertical scroll speed in px/sec. */
  scrollSpeed: 60,

  /** Seconds for audio crossfade between tracks. */
  crossfadeSeconds: 3,

  /** Playback volume 0–1. */
  volume: 0.7,

  /** Object position for photos to keep faces nicely framed. */
  objectPosition: 'center 30%',
};

/* ──────────────────────────────────────────────────────────
   DOM REFS
   ────────────────────────────────────────────────────────── */
const $ = id => document.getElementById(id);
const loader       = $('loader');
const loaderFill   = $('loaderFill');
const scene1       = $('scene1');
const scene3       = $('scene3');
const dustCanvas   = $('dustCanvas');
const archer       = $('archer');
const heartSvg     = $('heartSvg');
const crackGroup   = $('crackGroup');
const clickMeBtn   = $('clickMeBtn');
const arrowEl      = $('arrow');
const flashOverlay = $('flashOverlay');
const muteBtn      = $('muteBtn');
const reelWrap     = $('reelWrap');
const reelRotate   = $('reelRotate');
const reelTrack    = $('reelTrack');
const messageWrap  = $('messageWrap');
const typedMessage = $('typedMessage');
const cursorBlink  = document.querySelector('.cursor-blink');
const replayBtn    = $('replayBtn');

/* ──────────────────────────────────────────────────────────
   STATE
   ────────────────────────────────────────────────────────── */
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let clickHandled   = false;
let reelScrollY    = 0;      // current translateY offset (px)
let reelUnitH      = 0;      // height of ONE segment (px)
let reelPaused     = false;  // hover / touch-hold pauses scroll
let reelRAF        = null;
let lastTimestamp  = null;
let imageCursor    = 0;      // pointer into CONFIG.images for endless reel

/* ──────────────────────────────────────────────────────────
   1. PRELOADER
   ────────────────────────────────────────────────────────── */
function preloadAssets() {
  const imgPaths   = CONFIG.images;
  const audioPaths = CONFIG.audio;
  const total      = imgPaths.length + audioPaths.length;
  let   loaded     = 0;

  function tick() {
    loaded++;
    if (loaderFill) {
      loaderFill.style.width = Math.min(100, Math.round((loaded / total) * 100)) + '%';
    }
  }

  const imgPromises = imgPaths.map(src => new Promise(res => {
    const img = new Image();
    img.onload = () => {
      if (typeof img.decode === 'function') {
        img.decode().catch(() => {}).then(() => { tick(); res(); });
      } else {
        tick(); res();
      }
    };
    img.onerror = () => { tick(); res(); };
    img.src = src;
  }));

  const audioPromises = audioPaths.map(src => new Promise(res => {
    const a = new Audio();
    a.oncanplaythrough = a.onerror = () => { tick(); res(); };
    a.src = src;
    a.load();
  }));

  return Promise.all([...imgPromises, ...audioPromises]);
}

/* ──────────────────────────────────────────────────────────
   2. DUST PARTICLES (Scene 1 background)
   ────────────────────────────────────────────────────────── */
function initDust() {
  const ctx = dustCanvas.getContext('2d');

  function resize() {
    dustCanvas.width  = window.innerWidth;
    dustCanvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const COUNT = 55;
  const particles = [];
  for (let i = 0; i < COUNT; i++) {
    particles.push({
      x:     Math.random() * window.innerWidth,
      y:     Math.random() * window.innerHeight,
      r:     Math.random() * 1.8 + 0.4,
      vx:    (Math.random() - 0.5) * 0.25,
      vy:    -(Math.random() * 0.5 + 0.1),
      alpha: Math.random() * 0.5 + 0.1,
    });
  }

  function drawDust() {
    if (!scene1.classList.contains('active')) {
      requestAnimationFrame(drawDust);
      return;
    }
    ctx.clearRect(0, 0, dustCanvas.width, dustCanvas.height);
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.y < -5)                   p.y = dustCanvas.height + 5;
      if (p.x < -5)                   p.x = dustCanvas.width  + 5;
      if (p.x > dustCanvas.width + 5) p.x = -5;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,200,180,${p.alpha})`;
      ctx.fill();
    }
    requestAnimationFrame(drawDust);
  }
  requestAnimationFrame(drawDust);
}

/* ──────────────────────────────────────────────────────────
   3. AUDIO ENGINE
   ────────────────────────────────────────────────────────── */
const audioTracks = CONFIG.audio.map(src => {
  const a = new Audio(src);
  a.volume = 0;
  a.loop   = false;
  return a;
});
let currentTrack   = 0;
let isMuted        = false;
let crossfadeTimer = null;
let audioStarted   = false;

function fadeVolume(track, from, to, durationMs, onDone) {
  const steps    = 30;
  const interval = durationMs / steps;
  const delta    = (to - from) / steps;
  let   step     = 0;
  track.volume   = Math.max(0, Math.min(1, from));
  const id = setInterval(() => {
    step++;
    track.volume = Math.max(0, Math.min(1, from + delta * step));
    if (step >= steps) {
      clearInterval(id);
      track.volume = Math.max(0, Math.min(1, to));
      if (onDone) onDone();
    }
  }, interval);
  return id;
}

function scheduleCrossfade() {
  clearTimeout(crossfadeTimer);
  const track = audioTracks[currentTrack];
  if (!track.duration || isNaN(track.duration)) {
    track.addEventListener('loadedmetadata', scheduleCrossfade, { once: true });
    return;
  }
  const remaining = (track.duration - track.currentTime - CONFIG.crossfadeSeconds) * 1000;
  crossfadeTimer  = setTimeout(crossfadeToNext, Math.max(100, remaining));
}

function crossfadeToNext() {
  const dur  = CONFIG.crossfadeSeconds * 1000;
  const next = (currentTrack + 1) % audioTracks.length;
  const cur  = audioTracks[currentTrack];
  const nxt  = audioTracks[next];
  const vol  = isMuted ? 0 : CONFIG.volume;

  nxt.currentTime = 0;
  nxt.play().catch(() => {});
  fadeVolume(nxt, 0, vol, dur);
  fadeVolume(cur, vol, 0, dur, () => {
    cur.pause();
    cur.currentTime = 0;
    currentTrack = next;
    scheduleCrossfade();
  });
}

function startAudio() {
  if (audioStarted) return;
  audioStarted = true;
  const track = audioTracks[currentTrack];
  track.currentTime = 0;
  track.volume = isMuted ? 0 : CONFIG.volume;
  track.play().then(() => scheduleCrossfade()).catch(() => {});
}

function toggleMute() {
  isMuted = !isMuted;
  const vol = isMuted ? 0 : CONFIG.volume;
  for (const t of audioTracks) t.volume = vol;
  updateMuteIcon();
}

function updateMuteIcon() {
  const w1 = $('soundWave1');
  const w2 = $('soundWave2');
  if (!w1 || !w2) return;
  if (isMuted) {
    w1.setAttribute('d', 'M23 9 L17 15 M17 9 L23 15');
    w2.setAttribute('d', '');
    w1.setAttribute('stroke-width', '2.5');
  } else {
    w1.setAttribute('d', 'M19.07 4.93a10 10 0 0 1 0 14.14');
    w2.setAttribute('d', 'M15.54 8.46a5 5 0 0 1 0 7.07');
    w1.setAttribute('stroke-width', '2');
  }
}

muteBtn.addEventListener('click', toggleMute);

document.addEventListener('visibilitychange', () => {
  if (!audioStarted) return;
  if (document.hidden) {
    audioTracks.forEach(t => t.pause());
    clearTimeout(crossfadeTimer);
  } else {
    audioTracks[currentTrack].play().catch(() => {});
    scheduleCrossfade();
  }
});

/* ──────────────────────────────────────────────────────────
   4. CLICK SEQUENCE (Scene 1 → 2 → 3)
   ────────────────────────────────────────────────────────── */
clickMeBtn.addEventListener('click', () => {
  if (clickHandled) return;
  clickHandled = true;

  startAudio();

  // Heartbeat punch
  heartSvg.style.animation  = 'none';
  void heartSvg.offsetWidth;
  heartSvg.style.transition = 'transform 0.15s ease-out';
  heartSvg.style.transform  = 'scale(1.18)';
  setTimeout(() => { heartSvg.style.transform = 'scale(1)'; }, 160);

  setTimeout(fireArrow, 400);
});

function fireArrow() {
  const na = $('nockArrow');
  const nh = $('nockArrowHead');
  if (na) na.style.display = 'none';
  if (nh) nh.style.display = 'none';

  const archerRect = archer.getBoundingClientRect();
  const heartRect  = heartSvg.getBoundingClientRect();

  const startX = archerRect.right;
  const startY = archerRect.top + archerRect.height * 0.38;
  const endX   = heartRect.left + heartRect.width  * 0.5;
  const endY   = heartRect.top  + heartRect.height * 0.42;

  const dx    = endX - startX;
  const dy    = endY - startY;
  const angle = Math.atan2(dy, dx) * 180 / Math.PI;

  arrowEl.style.display    = 'block';
  arrowEl.style.left       = startX + 'px';
  arrowEl.style.top        = (startY - 6) + 'px';
  arrowEl.style.transform  = `rotate(${angle}deg)`;
  arrowEl.style.transition = 'none';

  const FLIGHT_MS = 380;
  requestAnimationFrame(() => {
    arrowEl.style.transition = `left ${FLIGHT_MS}ms ease-in, top ${FLIGHT_MS}ms ease-in`;
    arrowEl.style.left = endX + 'px';
    arrowEl.style.top  = (endY - 6) + 'px';
  });

  setTimeout(impact, FLIGHT_MS + 30);
}

function impact() {
  if ('vibrate' in navigator) navigator.vibrate([40, 30, 20]);

  if (!prefersReduced) {
    document.body.classList.add('screen-shake');
    setTimeout(() => document.body.classList.remove('screen-shake'), 500);
  }

  if (!prefersReduced) {
    flashOverlay.classList.add('flash-in');
    setTimeout(() => {
      flashOverlay.classList.remove('flash-in');
      flashOverlay.classList.add('flash-out');
      setTimeout(() => flashOverlay.classList.remove('flash-out'), 400);
    }, 80);
  }

  crackGroup.style.transition = 'opacity 0.2s ease';
  crackGroup.style.opacity    = '1';

  setTimeout(breakHeart, 200);
}

/* ──────────────────────────────────────────────────────────
   5. HEART SHARDS & TRANSITION
   ────────────────────────────────────────────────────────── */
function breakHeart() {
  if (prefersReduced) {
    heartSvg.style.transition = 'opacity 0.6s ease';
    heartSvg.style.opacity    = '0';
    arrowEl.style.display     = 'none';
    setTimeout(startScene3, 700);
    return;
  }

  const rect = heartSvg.getBoundingClientRect();
  const cx   = rect.left + rect.width  / 2;
  const cy   = rect.top  + rect.height / 2;

  const SHARD_COUNT = 7;
  const shards = [];

  for (let i = 0; i < SHARD_COUNT; i++) {
    const angle1 = (i / SHARD_COUNT) * Math.PI * 2;
    const angle2 = ((i + 1) / SHARD_COUNT) * Math.PI * 2;
    const r1     = 30 + Math.random() * 30;
    const r2     = 30 + Math.random() * 30;
    const mid    = (angle1 + angle2) / 2;

    const el = document.createElement('div');
    el.className = 'shard';

    const size   = 90;
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext('2d');
    const ox  = size / 2;
    const oy  = size / 2;

    ctx.beginPath();
    ctx.moveTo(ox, oy);
    ctx.lineTo(ox + Math.cos(angle1) * r1, oy + Math.sin(angle1) * r1);
    const jr = (r1 + r2) / 2 * (0.7 + Math.random() * 0.4);
    ctx.lineTo(ox + Math.cos(mid) * jr, oy + Math.sin(mid) * jr);
    ctx.lineTo(ox + Math.cos(angle2) * r2, oy + Math.sin(angle2) * r2);
    ctx.closePath();

    const grad = ctx.createRadialGradient(ox, oy, 0, ox, oy, size / 2);
    grad.addColorStop(0, '#ff6b8a');
    grad.addColorStop(0.5, '#c0392b');
    grad.addColorStop(1, '#7b0d1e');
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.6)';
    ctx.lineWidth   = 1;
    ctx.stroke();

    el.appendChild(canvas);
    el.style.position = 'fixed';
    el.style.left     = (cx - size / 2) + 'px';
    el.style.top      = (cy - size / 2) + 'px';
    el.style.width    = size + 'px';
    el.style.height   = size + 'px';
    document.body.appendChild(el);
    shards.push({ el, angle: mid });
  }

  heartSvg.style.transition = 'opacity 0.15s ease';
  heartSvg.style.opacity    = '0';
  arrowEl.style.display     = 'none';

  const START    = performance.now();
  const DURATION = 900;

  function animateShards(ts) {
    const t     = Math.min((ts - START) / DURATION, 1);
    const eased = t < 0.5 ? 2*t*t : -1 + (4 - 2*t)*t;

    for (const { el, angle } of shards) {
      const fly = eased * 260;
      el.style.transform = `translate(${Math.cos(angle)*fly}px, ${Math.sin(angle)*fly + eased*80}px) rotate(${eased*240}deg)`;
      el.style.opacity   = String(1 - eased);
    }

    if (t < 1) {
      requestAnimationFrame(animateShards);
    } else {
      shards.forEach(s => s.el.remove());
      archer.style.transition = 'opacity 0.6s ease';
      archer.style.opacity    = '0';
      setTimeout(startScene3, 500);
    }
  }
  requestAnimationFrame(animateShards);
}

/* ──────────────────────────────────────────────────────────
   6. SCENE 3 – REVEAL & FILM REEL
   ────────────────────────────────────────────────────────── */
function startScene3() {
  scene1.classList.remove('active');
  scene3.removeAttribute('hidden');
  setTimeout(() => scene3.classList.add('active'), 50);

  buildFilmstrip();

  requestAnimationFrame(() => {
    reelWrap.classList.add('visible');
    startFilmReelScroll();

    setTimeout(() => {
      messageWrap.classList.add('visible');
      typeMessage(CONFIG.message, () => {
        if (cursorBlink) cursorBlink.classList.add('hidden');
        replayBtn.hidden = false;
      });
    }, 600);
  });
}

/* ── Typewriter effect ── */
function typeMessage(text, onDone) {
  let i   = 0;
  let out = '';

  function typeChar() {
    if (i >= text.length) {
      if (onDone) onDone();
      return;
    }
    const ch = text[i];
    out += ch === '\n' ? '<br>' : ch;
    typedMessage.innerHTML = out;
    i++;
    const delay = ch === '.' || ch === ',' ? 260 : ch === '\n' ? 400 : 48 + Math.random() * 28;
    setTimeout(typeChar, delay);
  }
  typeChar();
}

/* ──────────────────────────────────────────────────────────
   7. PURE CSS 35MM FILM STRIP BUILDER
   ────────────────────────────────────────────────────────── */
function createFilmSegment() {
  const segment = document.createElement('div');
  segment.className = 'segment';

  // Left sprocket holes (17 holes)
  const holesLeft = document.createElement('div');
  holesLeft.className = 'holes left';
  for (let i = 0; i < 17; i++) {
    const hole = document.createElement('div');
    hole.className = 'hole';
    holesLeft.appendChild(hole);
  }
  segment.appendChild(holesLeft);

  // Right sprocket holes (17 holes)
  const holesRight = document.createElement('div');
  holesRight.className = 'holes right';
  for (let i = 0; i < 17; i++) {
    const hole = document.createElement('div');
    hole.className = 'hole';
    holesRight.appendChild(hole);
  }
  segment.appendChild(holesRight);

  // Edge print labels: repeating labels "2A", "3", "3A", "4" next to windows
  const edgeLabels = ['▶ 2A', '3', '▶ 3A', '4'];
  const edgeTops   = [0.2925, 0.8775, 1.4625, 2.0475];

  for (let i = 0; i < 4; i++) {
    const markL = document.createElement('div');
    markL.className = 'edge-mark left';
    markL.style.top = `calc(var(--w) * ${edgeTops[i]})`;
    markL.textContent = edgeLabels[i];
    segment.appendChild(markL);

    const markR = document.createElement('div');
    markR.className = 'edge-mark right';
    markR.style.top = `calc(var(--w) * ${edgeTops[i]})`;
    markR.textContent = edgeLabels[i];
    segment.appendChild(markR);
  }

  // 4 photo windows per segment
  for (let f = 0; f < 4; f++) {
    const frame = document.createElement('div');
    frame.className = 'frame';

    const img = document.createElement('img');
    const imgSrc = CONFIG.images[imageCursor % CONFIG.images.length];
    imageCursor++;
    img.src = imgSrc;
    img.alt = 'Memory photo';
    img.loading = 'eager';

    frame.appendChild(img);
    segment.appendChild(frame);
  }

  return segment;
}

function buildFilmstrip() {
  reelTrack.innerHTML = '';
  imageCursor = 0;

  document.documentElement.style.setProperty(
    '--object-position',
    CONFIG.objectPosition || 'center 30%'
  );

  // Measure or estimate segment height to ensure at least 2.5x viewport coverage
  const stripW = reelRotate.offsetWidth || 380;
  const segHeightEst = stripW * 2.34;
  const numSegments = Math.max(4, Math.ceil((window.innerHeight * 2.5) / segHeightEst) + 1);

  for (let s = 0; s < numSegments; s++) {
    reelTrack.appendChild(createFilmSegment());
  }
}

/* ──────────────────────────────────────────────────────────
   8. FILM REEL SMOOTH SCROLL & LOOP
   ────────────────────────────────────────────────────────── */
function startFilmReelScroll() {
  if (reelRAF) cancelAnimationFrame(reelRAF);
  reelScrollY = 0;
  lastTimestamp = null;

  // Measure ONE segment's offsetHeight in JS (do not hardcode)
  const firstSeg = reelTrack.querySelector('.segment');
  if (firstSeg) {
    reelUnitH = firstSeg.offsetHeight;
  }

  function loop(now) {
    if (!lastTimestamp) lastTimestamp = now;
    const dt = Math.min((now - lastTimestamp) / 1000, 0.1);
    lastTimestamp = now;

    if (reelUnitH <= 0) {
      const firstSeg = reelTrack.querySelector('.segment');
      if (firstSeg && firstSeg.offsetHeight > 0) {
        reelUnitH = firstSeg.offsetHeight;
      }
    }

    if (!reelPaused && reelUnitH > 0) {
      const speed = prefersReduced ? (CONFIG.scrollSpeed * 0.25) : CONFIG.scrollSpeed;
      reelScrollY += speed * dt;

      if (reelScrollY >= reelUnitH) {
        reelScrollY -= reelUnitH;

        // Move first segment to bottom for a completely seamless endless loop
        const first = reelTrack.firstElementChild;
        if (first) {
          reelTrack.appendChild(first);

          // Update newly appended segment with the next sequential images
          const imgs = first.querySelectorAll('.frame img');
          imgs.forEach(img => {
            img.src = CONFIG.images[imageCursor % CONFIG.images.length];
            imageCursor++;
          });
        }
      }

      reelTrack.style.transform = `translate3d(0, ${-reelScrollY}px, 0)`;
    }

    reelRAF = requestAnimationFrame(loop);
  }

  reelRAF = requestAnimationFrame(loop);
}

// Pause on touch/hold or hover, resume on release
const pauseScroll  = () => { reelPaused = true; };
const resumeScroll = () => { reelPaused = false; };

reelWrap.addEventListener('mouseenter', pauseScroll);
reelWrap.addEventListener('mouseleave', resumeScroll);
reelWrap.addEventListener('touchstart', pauseScroll, { passive: true });
reelWrap.addEventListener('touchend', resumeScroll, { passive: true });
reelWrap.addEventListener('touchcancel', resumeScroll, { passive: true });

window.addEventListener('resize', () => {
  const firstSeg = reelTrack.querySelector('.segment');
  if (firstSeg) {
    reelUnitH = firstSeg.offsetHeight;
  }
});

/* ──────────────────────────────────────────────────────────
   9. REPLAY FUNCTIONALITY
   ────────────────────────────────────────────────────────── */
replayBtn.addEventListener('click', replay);

function replay() {
  if (reelRAF) {
    cancelAnimationFrame(reelRAF);
    reelRAF = null;
  }
  reelScrollY   = 0;
  lastTimestamp = null;
  reelPaused    = false;

  // Reset Scene 3
  scene3.classList.remove('active');
  scene3.setAttribute('hidden', '');
  reelWrap.classList.remove('visible');
  messageWrap.classList.remove('visible');
  typedMessage.innerHTML = '';
  if (cursorBlink) cursorBlink.classList.remove('hidden');
  replayBtn.hidden = true;

  // Reset Scene 1 elements
  arrowEl.style.display    = 'none';
  arrowEl.style.transition = 'none';
  const na = $('nockArrow');
  const nh = $('nockArrowHead');
  if (na) na.style.display = '';
  if (nh) nh.style.display = '';

  crackGroup.style.opacity = '0';
  heartSvg.style.opacity   = '1';
  heartSvg.style.transform = '';
  heartSvg.style.animation = 'heartBeat 1.6s ease-in-out infinite';

  archer.style.opacity     = '1';

  // Show Scene 1
  scene1.removeAttribute('hidden');
  scene1.classList.add('active');

  clickHandled = false;
}

/* ──────────────────────────────────────────────────────────
   10. INIT
   ────────────────────────────────────────────────────────── */
initDust();

preloadAssets().then(() => {
  setTimeout(() => {
    loader.classList.add('hidden');
    muteBtn.hidden = false;
  }, 400);
});
