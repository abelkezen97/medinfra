import Lenis from 'lenis';
import { initFilms } from './film';

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---- Smooth scroll ------------------------------------------------------
let lenis: Lenis | null = null;
if (!reduce) {
  lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, smoothWheel: true });
  const raf = (t: number) => {
    lenis!.raf(t);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);

  // In-page anchors go through Lenis so they ease instead of jumping.
  document.addEventListener('click', (e) => {
    const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href')!;
    if (id.length < 2) return;
    const el = document.querySelector(id);
    if (!el) return;
    e.preventDefault();
    lenis!.scrollTo(el as HTMLElement, { offset: -96 });
  });
  window.addEventListener('mi:lock', () => lenis!.stop());
  window.addEventListener('mi:unlock', () => lenis!.start());
}

// ---- Reveal on enter ----------------------------------------------------
const revealEls = document.querySelectorAll<HTMLElement>('[data-reveal], [data-split]');
if (reduce || !('IntersectionObserver' in window)) {
  revealEls.forEach((el) => el.classList.add('is-in'));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
  );
  revealEls.forEach((el) => io.observe(el));
}

// ---- Parallax (transform only) -----------------------------------------
const parallax = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'));
if (!reduce && parallax.length) {
  const tick = () => {
    const vh = window.innerHeight;
    for (const el of parallax) {
      const r = el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) continue;
      const speed = parseFloat(el.dataset.parallax || '0.1');
      const center = r.top + r.height / 2 - vh / 2;
      el.style.transform = `translate3d(0, ${(-center * speed).toFixed(1)}px, 0)`;
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

initFilms(reduce);
