// Scroll-scrubbed film sections.
//
// Each film is a WebP frame sequence (see scripts/build-frames.mjs) painted on a
// canvas. Scroll position inside the section's tall track maps to a frame, so the
// footage plays forward and backward with the page — smoothly on every browser,
// which seeking a <video> element cannot do.
//
// Markup contract (see components/ScrollFilm.astro):
//   [data-film]            section; data-src, data-frames, data-variant
//   [data-film-track]      tall scroll runway
//   [data-film-frame]      element the variant transform is applied to
//   [data-film-canvas]     canvas the frames paint into
//   [data-film-shade]      overlay whose opacity follows the story
//   [data-film-intro]      headline that hands over to the chapters
//   [data-film-chapter]    captions with data-from / data-to (0–1)
//   [data-film-spec]       chips that light up in sequence
//   [data-film-fill]       progress rail fill;  [data-film-count] frame/stage counter

type Variant = 'hero' | 'slot' | 'expand';

const clamp = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);
const smooth = (n: number) => {
  n = clamp(n);
  return n * n * (3 - 2 * n);
};
const pad = (n: number, l = 3) => String(n).padStart(l, '0');

export function initFilms(reduce: boolean) {
  document.querySelectorAll<HTMLElement>('[data-film]').forEach((root) => {
    if (reduce) {
      root.classList.add('film--static');
      return;
    }
    createFilm(root);
  });
}

function createFilm(root: HTMLElement) {
  const track = root.querySelector<HTMLElement>('[data-film-track]')!;
  const frameEl = root.querySelector<HTMLElement>('[data-film-frame]')!;
  const canvas = root.querySelector<HTMLCanvasElement>('[data-film-canvas]')!;
  const shade = root.querySelector<HTMLElement>('[data-film-shade]');
  const intro = root.querySelector<HTMLElement>('[data-film-intro]');
  const chapters = Array.from(root.querySelectorAll<HTMLElement>('[data-film-chapter]'));
  const specs = Array.from(root.querySelectorAll<HTMLElement>('[data-film-spec]'));
  const panel = root.querySelector<HTMLElement>('[data-film-panel]');
  const segs = Array.from(root.querySelectorAll<HTMLElement>('[data-film-seg]'));
  const steps = Array.from(root.querySelectorAll<HTMLElement>('[data-film-step]'));
  const fill = root.querySelector<HTMLElement>('[data-film-fill]');
  const count = root.querySelector<HTMLElement>('[data-film-count]');
  const ctx = canvas.getContext('2d', { alpha: false })!;

  const variant = (root.dataset.variant || 'hero') as Variant;
  const total = parseInt(root.dataset.frames || '0', 10);
  const base = root.dataset.src!;

  const frames: (HTMLImageElement | null)[] = new Array(total).fill(null);
  let started = false;
  let size: 'd' | 'm' = 'd';

  // ---- canvas sizing --------------------------------------------------
  let cw = 0, ch = 0;
  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    // clientWidth/Height ignore the variant's CSS transforms.
    cw = Math.max(1, Math.round(canvas.clientWidth * dpr));
    ch = Math.max(1, Math.round(canvas.clientHeight * dpr));
    canvas.width = cw;
    canvas.height = ch;
    // Pick the lighter set only when it will genuinely look the same.
    const aspect = 1366 / 768;
    const needed = Math.max(cw, ch * aspect);
    if (!started) size = needed <= 900 ? 'm' : 'd';
    lastDrawn = -1;
  }

  // ---- progressive loading: coarse frames first, then fill the gaps ----
  function load() {
    if (started) return;
    started = true;
    const order: number[] = [];
    const seen = new Set<number>();
    for (const stride of [24, 8, 4, 2, 1]) {
      for (let i = 0; i < total; i += stride) {
        if (!seen.has(i)) { seen.add(i); order.push(i); }
      }
    }
    if (!seen.has(total - 1)) order.push(total - 1);

    let cursor = 0;
    const PARALLEL = 6;
    const next = () => {
      if (cursor >= order.length) return;
      const i = order[cursor++];
      const img = new Image();
      img.decoding = 'async';
      img.onload = () => {
        frames[i] = img;
        if (Math.abs(i - wantFrame) <= 24) { lastDrawn = -1; kick(); } // repaint if closer
        root.classList.add('film--ready');
        next();
      };
      img.onerror = next;
      img.src = `${base}/${size}/${pad(i + 1, 4)}.webp`;
    };
    for (let k = 0; k < PARALLEL; k++) next();
  }

  // Start fetching well before the section is on screen.
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && load()),
    { rootMargin: '150% 0px 150% 0px' }
  );
  io.observe(root);

  // ---- drawing -----------------------------------------------------------
  let lastDrawn = -1;
  let wantFrame = 0;
  function nearestLoaded(i: number) {
    if (frames[i]) return i;
    for (let d = 1; d < total; d++) {
      if (i - d >= 0 && frames[i - d]) return i - d;
      if (i + d < total && frames[i + d]) return i + d;
    }
    return -1;
  }
  function draw(i: number) {
    const idx = nearestLoaded(i);
    if (idx < 0 || idx === lastDrawn) return;
    const img = frames[idx]!;
    const ir = img.naturalWidth / img.naturalHeight;
    const cr = cw / ch;
    let dw = cw, dh = ch, dx = 0, dy = 0;
    if (ir > cr) { dh = ch; dw = ch * ir; dx = (cw - dw) / 2; }
    else { dw = cw; dh = cw / ir; dy = (ch - dh) / 2; }
    ctx.drawImage(img, dx, dy, dw, dh);
    lastDrawn = idx;
  }

  // ---- scroll → progress -----------------------------------------------
  let target = 0, eased = 0, running = false, near = false;

  function kick() {
    if (!running) { running = true; requestAnimationFrame(frame); }
  }

  function measure() {
    const r = track.getBoundingClientRect();
    const vh = window.innerHeight;
    const span = r.height - vh;
    target = span > 0 ? clamp(-r.top / span) : 0;
    near = r.top < vh * 1.5 && r.bottom > -vh * 0.5;
    if (near) kick();
  }

  function frame() {
    eased += (target - eased) * 0.18;
    if (Math.abs(target - eased) < 0.0005) eased = target;
    const p = eased;

    applyVariant(p);

    // Footage plays across most of the runway, holding a beat at each end.
    const vp = clamp((p - 0.02) / 0.9);
    wantFrame = Math.round(vp * (total - 1));
    draw(wantFrame);

    // Intro headline hands over to the chapters.
    if (intro) {
      const out = smooth((p - 0.05) / 0.12);
      intro.style.opacity = (1 - out).toFixed(3);
      intro.style.transform = `translate3d(0, ${(-60 * out).toFixed(1)}px, 0)`;
      intro.style.visibility = out >= 1 ? 'hidden' : 'visible';
    }

    // Chapter captions fade in and out of their band.
    for (const c of chapters) {
      const from = parseFloat(c.dataset.from!), to = parseFloat(c.dataset.to!);
      const local = (p - from) / (to - from);
      let o = 0, y = 14;
      if (local > -0.3 && local < 1.3) {
        // Fade out fully before the next caption fades in, so texts never overlap.
        const inn = smooth((local - 0.02) / 0.1);
        const out = smooth((local - 0.88) / 0.1);
        o = clamp(inn - out);
        y = 14 * (1 - inn) - 14 * out;
      }
      c.style.opacity = o.toFixed(3);
      c.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`;
      c.style.visibility = o <= 0.001 ? 'hidden' : 'visible';
    }

    // Journey timeline appears as the intro hands over; each segment fills across its chapter.
    if (panel) {
      const first = chapters[0] ? parseFloat(chapters[0].dataset.from!) : 0.16;
      panel.style.opacity = smooth((p - (first - 0.04)) / 0.06).toFixed(3);
    }
    chapters.forEach((c, i) => {
      const from = parseFloat(c.dataset.from!), to = parseFloat(c.dataset.to!);
      if (segs[i]) segs[i].style.transform = `scaleX(${clamp((p - from) / (to - from)).toFixed(4)})`;
      if (steps[i]) steps[i].classList.toggle('is-active', p >= from && (p < to || i === chapters.length - 1));
    });

    for (let s = 0; s < specs.length; s++) {
      specs[s].classList.toggle('is-lit', p >= 0.2 + (s / specs.length) * 0.6);
    }

    if (fill) fill.style.transform = `scaleY(${p.toFixed(4)})`;
    if (count) count.textContent = `${pad(wantFrame + 1)} / ${pad(total)}`;

    if (eased !== target || lastDrawn !== nearestLoaded(wantFrame)) {
      requestAnimationFrame(frame);
    } else {
      running = false;
    }
  }

  function applyVariant(p: number) {
    if (variant === 'expand') {
      // A rounded card inside the page gutters that grows to full bleed, then recedes on exit.
      const open = smooth(p / 0.16);
      const exit = smooth((p - 0.9) / 0.1);
      const vw = window.innerWidth;
      const gutter = Math.max(20, (vw - 1320) / 2 + Math.min(48, Math.max(20, vw * 0.04)));
      const x = gutter * (1 - open);
      const y = 24 * (1 - open);
      const r = 24 * (1 - open) + 24 * exit;
      frameEl.style.clipPath = `inset(${y.toFixed(1)}px ${x.toFixed(1)}px round ${r.toFixed(1)}px)`;
      frameEl.style.transform = `scale(${(1 - 0.06 * exit).toFixed(4)})`;
      if (shade) shade.style.opacity = (0.15 + 0.7 * open).toFixed(3);
      return;
    }
    if (variant === 'hero') {
      // Full-bleed at rest; on exit the frame lifts into a card and recedes.
      const exit = smooth((p - 0.88) / 0.12);
      const scale = 1 - 0.08 * exit;
      frameEl.style.transform = `scale(${scale.toFixed(4)})`;
      frameEl.style.borderRadius = `${(28 * exit).toFixed(1)}px`;
      if (shade) shade.style.opacity = Math.min(1, 1 - 0.2 * smooth((p - 0.04) / 0.14) + 0.4 * exit).toFixed(3);
    } else {
      // A thin cinema slot that opens to full frame, then closes on the way out.
      const open = smooth(p / 0.2);
      const exit = smooth((p - 0.9) / 0.1);
      const insetY = 36 * (1 - open) + 30 * exit;
      const insetX = 10 * (1 - open) + 6 * exit;
      const radius = 18 * (1 - open) + 18 * exit;
      frameEl.style.clipPath = `inset(${insetY.toFixed(2)}% ${insetX.toFixed(2)}% round ${radius.toFixed(1)}px)`;
      frameEl.style.transform = `scale(${(1.12 - 0.12 * open).toFixed(4)})`;
      if (shade) shade.style.opacity = Math.min(1, 0.95 - 0.15 * open + 0.4 * exit).toFixed(3);
    }
  }

  const onResize = () => { resize(); measure(); };
  window.addEventListener('scroll', measure, { passive: true });
  window.addEventListener('resize', onResize);
  resize();
  measure();
  running = true;
  frame();
}
