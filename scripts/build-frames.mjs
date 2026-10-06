// Turns the source films into WebP frame sequences for the scroll-scrubbed
// canvas sections, plus a poster still for each. Run with `npm run frames`.
//
//   public/frames/<name>/d/0001.webp   desktop (1366w)
//   public/frames/<name>/m/0001.webp   mobile  (828w)
//   public/frames/<name>/poster.webp
import { execFileSync } from 'node:child_process';
import { mkdirSync, readdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import ffmpeg from 'ffmpeg-static';
import sharp from 'sharp';

const SRC = 'src/assets/video';
const OUT = 'public/frames';

const films = [
  // Campus flythrough: full frame.
  { name: 'campus', file: 'medinfra-2.mp4', crop: null },
  // OT/ICU walkthrough: crop off the bottom band that carries burned-in titles.
  { name: 'ot', file: 'modular-ot-icu.mp4', crop: 'crop=1366:616:0:0' },
];

const sizes = [
  { dir: 'd', width: 1366, quality: 74 },
  { dir: 'm', width: 828, quality: 70 },
];

for (const film of films) {
  const base = join(OUT, film.name);
  rmSync(base, { recursive: true, force: true });
  const raw = join(base, '_raw');
  mkdirSync(raw, { recursive: true });

  // 1. Lossless PNG frames straight from the decoder
  const vf = [film.crop].filter(Boolean).join(',') || 'null';
  execFileSync(ffmpeg, ['-v', 'error', '-i', join(SRC, film.file), '-vf', vf, join(raw, '%04d.png')]);
  const frames = readdirSync(raw).filter((f) => f.endsWith('.png')).sort();

  // 2. Encode each size as WebP
  for (const size of sizes) {
    const dir = join(base, size.dir);
    mkdirSync(dir, { recursive: true });
    await Promise.all(
      frames.map((f) =>
        sharp(join(raw, f))
          .resize({ width: size.width })
          .webp({ quality: size.quality, effort: 5 })
          .toFile(join(dir, f.replace('.png', '.webp')))
      )
    );
  }

  // 3. Poster = first frame, larger quality, used before the sequence loads
  await sharp(join(raw, frames[0])).webp({ quality: 82 }).toFile(join(base, 'poster.webp'));
  // Keep a JPEG of a mid-film frame for social cards
  const mid = frames[Math.floor(frames.length * 0.42)];
  await sharp(join(raw, mid)).jpeg({ quality: 84, mozjpeg: true }).toFile(join(base, 'still.jpg'));

  rmSync(raw, { recursive: true, force: true });
  console.log(`${film.name}: ${frames.length} frames`);
}
