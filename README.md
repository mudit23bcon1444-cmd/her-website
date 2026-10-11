# 💔 Heartbreak Reel

A single-page, cinematic, mobile-first web experience — no frameworks, no build step.  
Open `index.html` directly in a browser (or serve with any static server).

---

## Folder Structure

```
cute-web/
├── index.html
├── style.css
├── script.js
├── assets/
│   ├── filmstrip.png          ← Film strip with 4 transparent windows (included)
│   ├── person-with-arrow.png  ← OPTIONAL: your own archer figure; if missing, SVG is used
│   ├── images/
│   │   ├── 01.jpg             ← Drop your photos here (any number, any name)
│   │   ├── 02.jpg
│   │   └── ...
│   └── audio/
│       ├── khat.mp3           ← Song 1 ("Khat")
│       └── ishq.mp3           ← Song 2 ("Ishq")
└── README.md
```

---

## ✏️ How to Personalise

All user-editable settings live at the top of **`script.js`** in the `CONFIG` object:

```js
const CONFIG = {
  // List your image paths (relative to index.html)
  images: [
    'assets/images/01.jpg',
    'assets/images/02.jpg',
    // add as many as you like
  ],

  // Two songs that crossfade in a loop
  audio: [
    'assets/audio/khat.mp3',
    'assets/audio/ishq.mp3',
  ],

  // Message shown after the heart breaks (use \n for line breaks)
  message: 'Every frame of us — a film I never stop replaying.\nYou were the story worth telling.',

  scrollSpeed:       60,   // reel scroll speed in px/sec
  crossfadeSeconds:  3,    // seconds for audio crossfade
  volume:            0.7,  // 0–1
};
```

### Adding photos
1. Drop `.jpg` / `.png` files into `assets/images/`.
2. Add each path to the `images` array in `CONFIG`.
3. Photos automatically cycle through the film-strip windows in order.

### Adding songs
1. Drop `.mp3` files into `assets/audio/`.
2. Update the `audio` array in `CONFIG`.

### Custom message
Edit the `message` string in `CONFIG`. Use `\n` for line breaks.

### Optional archer figure
Place `assets/person-with-arrow.png` — it will automatically replace the built-in SVG archer.  
If the file is missing, the SVG silhouette is used as a fallback.

---

## 🚀 Running Locally

Simply open `index.html` in any modern browser.  
For audio autoplay to work after the first click, no special setup is needed — the click gesture unlocks audio.

Or serve with Python:
```bash
python3 -m http.server 8080
# then open http://localhost:8080
```

Or with Node:
```bash
npx serve .
```

---

## 🎬 Experience Flow

| Scene | What happens |
|-------|-------------|
| **Scene 1 – Intro** | Dark cinematic background, floating dust, glowing pulsing heart with "Click me" button, SVG archer with idle breathing animation |
| **Scene 2 – Click sequence** | Arrow fires and flies to heart → screen shake + white flash + haptic → heart cracks and breaks into shards → archer fades |
| **Scene 3 – Reveal** | Typewriter message fades in · Film reel of your photos scrolls infinitely · Mute toggle · Hold reel to pause · Replay button |

---

## ♿ Accessibility & Performance

- **`prefers-reduced-motion`**: Screen shake, shards, and particle animations are disabled; simple fades used instead.
- **Preloader**: All images and audio are preloaded with a progress bar before the experience starts.
- **60 fps reel scroll**: Powered by `requestAnimationFrame` with `transform: translateY`.
- **Tab visibility**: Audio pauses when you switch tabs and resumes on return.
- **Responsive**: Mobile-first CSS, works on any screen size.

---

## 📋 Browser Support

Works in all modern browsers (Chrome 80+, Firefox 75+, Safari 14+, Edge 80+).  
Requires JavaScript enabled.
