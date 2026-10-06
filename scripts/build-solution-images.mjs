// Solution imagery, cut from the project visualisation films (run `npm run frames` first).
// Swap any entry for a real project photo by dropping a file at the same output path.
//
//   public/images/solutions/<slug>.webp        card, 4:3
//   public/images/solutions/<slug>-wide.webp   page band, 21:8
import { mkdirSync } from 'node:fs';
import sharp from 'sharp';

const OUT = 'public/images/solutions';
mkdirSync(OUT, { recursive: true });

// frame: which still; focus: horizontal centre of the crop (0 = left, 1 = right)
const picks = {
  'hospital-project-consultancy':     { film: 'campus', frame: 1,   focus: 0.45 },
  'modular-ot-icu':                   { film: 'ot',     frame: 60,  focus: 0.5 },
  'medical-gas-pipeline-systems':     { film: 'ot',     frame: 75,  focus: 0.2 },
  'biomedical-engineering-equipment': { film: 'campus', frame: 135, focus: 0.3 },
  'cssd-clinical-infrastructure':     { film: 'ot',     frame: 120, focus: 0.75 },
  'hospital-engineering-utilities':   { film: 'campus', frame: 45,  focus: 0.6 },
  'healthcare-project-management':    { film: 'campus', frame: 30,  focus: 0.5 },
  'amc-maintenance':                  { film: 'ot',     frame: 90,  focus: 0.35 },
  'government-healthcare-projects':   { film: 'campus', frame: 15,  focus: 0.4 },
};

async function crop(src, ratio, focus, width, out) {
  const img = sharp(src);
  const { width: W, height: H } = await img.metadata();
  let cw = W, ch = Math.round(W / ratio);
  if (ch > H) { ch = H; cw = Math.round(H * ratio); }
  const left = Math.round(Math.min(W - cw, Math.max(0, focus * W - cw / 2)));
  const top = Math.round((H - ch) / 2);
  await sharp(src).extract({ left, top, width: cw, height: ch }).resize({ width }).webp({ quality: 80 }).toFile(out);
}

for (const [slug, p] of Object.entries(picks)) {
  const src = `public/frames/${p.film}/d/${String(p.frame).padStart(4, '0')}.webp`;
  await crop(src, 4 / 3, p.focus, 960, `${OUT}/${slug}.webp`);
  await crop(src, 21 / 8, p.focus, 1366, `${OUT}/${slug}-wide.webp`);
}
console.log('solution images written');
