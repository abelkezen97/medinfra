// Generates favicons, app icons and Open Graph images from the brand artwork.
// Run with `npm run icons` (after `npm run frames`, which produces the stills).
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import sharp from 'sharp';

const SOURCE = 'src/assets/brand/medinfra-logo-source.png'; // stacked logo, transparent background
const MARK = 'src/assets/brand/mi-mark.png';
const MARK_WHITE = 'src/assets/brand/mi-mark-white.png';
const WORD_WHITE = 'src/assets/brand/mi-word-white.png';
const NAVY = '#061428';
const WHITE = '#FFFFFF';

mkdirSync('public/brand', { recursive: true });
mkdirSync('public/og', { recursive: true });

// --- Split the stacked logo into mark + wordmark, plus white versions ---------
// The mark and the wordmark are separated by fully transparent rows; find them.
{
  const { data, info } = await sharp(SOURCE).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const opaqueRow = (y) => {
    let n = 0;
    for (let x = 0; x < info.width; x++) if (data[(y * info.width + x) * 4 + 3] > 40) n++;
    return n > 2;
  };
  let top = 0;
  while (!opaqueRow(top)) top++;
  let split = top;
  while (opaqueRow(split)) split++; // first empty row under the mark

  const whiten = async (input, out) => {
    const { data: d, info: i } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    for (let k = 0; k < d.length; k += 4) d[k] = d[k + 1] = d[k + 2] = 255;
    await sharp(d, { raw: { width: i.width, height: i.height, channels: 4 } }).png().toFile(out);
  };
  // extract and trim in separate pipelines (sharp would otherwise trim first)
  const part = async (y, h) => {
    const cut = await sharp(SOURCE).extract({ left: 0, top: y, width: info.width, height: h }).png().toBuffer();
    return sharp(cut).trim().png().toBuffer();
  };

  const mark = await part(0, split);
  const word = await part(split, info.height - split);
  await sharp(mark).toFile(MARK);
  await sharp(word).toFile('src/assets/brand/mi-word.png');
  await whiten(mark, MARK_WHITE);
  await whiten(word, WORD_WHITE);
  await sharp(SOURCE).trim().png().toFile('public/brand/medinfra-logo.png');
}

// --- Square icons: mark on transparent / navy -----------------------------
const square = (size, pad = 0, bg = { r: 0, g: 0, b: 0, alpha: 0 }) =>
  sharp(MARK)
    .resize(size - pad * 2, size - pad * 2, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .extend({ top: pad, bottom: pad, left: pad, right: pad, background: bg })
    .png();

await square(32).toFile('public/favicon-32.png');
await square(180, 22, WHITE).toFile('public/apple-touch-icon.png');
await square(192, 22, WHITE).toFile('public/icon-192.png');
await square(512, 60, WHITE).toFile('public/icon-512.png');
await square(512, 0).toFile('public/brand/logo-mark.png');

// favicon.ico containing a single 32px PNG (ICO allows embedded PNG)
const png32 = readFileSync('public/favicon-32.png');
const ico = Buffer.alloc(22);
ico.writeUInt16LE(0, 0); ico.writeUInt16LE(1, 2); ico.writeUInt16LE(1, 4);
ico.writeUInt8(32, 6); ico.writeUInt8(32, 7); ico.writeUInt8(0, 8); ico.writeUInt8(0, 9);
ico.writeUInt16LE(1, 10); ico.writeUInt16LE(32, 12);
ico.writeUInt32LE(png32.length, 14); ico.writeUInt32LE(22, 18);
writeFileSync('public/favicon.ico', Buffer.concat([ico, png32]));

// favicon.svg wrapping a 64px PNG so modern browsers get a crisp tab icon
const png64 = await square(64).toBuffer();
writeFileSync(
  'public/favicon.svg',
  `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64"><image width="64" height="64" xlink:href="data:image/png;base64,${png64.toString('base64')}"/></svg>`
);

writeFileSync(
  'public/site.webmanifest',
  JSON.stringify(
    {
      name: 'MedInfra — Complete Healthcare Project Solutions',
      short_name: 'MedInfra',
      start_url: '/',
      display: 'standalone',
      background_color: NAVY,
      theme_color: NAVY,
      icons: [
        { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      ],
    },
    null,
    2
  )
);

// --- Open Graph cards (1200×630) ---------------------------------------------
async function og(still, out, line1, line2) {
  const W = 1200, H = 630;
  const overlay = Buffer.from(`
    <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="0.4">
          <stop offset="0" stop-color="#061428" stop-opacity=".94"/>
          <stop offset=".55" stop-color="#061428" stop-opacity=".62"/>
          <stop offset="1" stop-color="#061428" stop-opacity=".15"/>
        </linearGradient>
      </defs>
      <rect width="${W}" height="${H}" fill="#004791" fill-opacity=".18"/>
      <rect width="${W}" height="${H}" fill="url(#g)"/>
      <rect x="72" y="560" width="56" height="3" fill="#9CC2F7"/>
      <text x="72" y="300" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-weight="700" font-size="62" fill="#fff" letter-spacing="-2">${line1}</text>
      <text x="72" y="378" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-weight="700" font-size="62" fill="#9CC2F7" letter-spacing="-2">${line2}</text>
      <text x="72" y="456" font-family="Helvetica, Arial, sans-serif" font-size="22" fill="#ffffff" fill-opacity=".72" letter-spacing="4">COMPLETE HEALTHCARE PROJECT SOLUTIONS</text>
      <text x="148" y="568" font-family="Helvetica, Arial, sans-serif" font-size="20" fill="#ffffff" fill-opacity=".6" letter-spacing="2">www.medinfra.org</text>
    </svg>`);
  const mark = await sharp(MARK_WHITE).resize({ height: 56 }).png().toBuffer();
  const word = await sharp(WORD_WHITE).resize({ height: 40 }).png().toBuffer();
  await sharp(still)
    .resize(W, H, { fit: 'cover', position: 'right' })
    .composite([
      { input: overlay, top: 0, left: 0 },
      { input: mark, top: 96, left: 72 },
      { input: word, top: 106, left: 72 + Math.round(56 * (728 / 460)) + 18 },
    ])
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(out);
}

await og('public/frames/campus/still.jpg', 'public/og/medinfra-default.jpg', 'Healthcare projects, from', 'concept to commissioning.');
await og('public/frames/ot/still.jpg', 'public/og/medinfra-ot-icu.jpg', 'Modular OT &amp; ICU —', 'precision where it matters.');
console.log('icons + og images written');
