// Builds the hero portrait cut-out from the original "Ndu_Blue Background.png".
// The original stays untouched. The background is a flat colour, so a colour-distance
// key with edge un-mixing removes it without touching the face or clothing.
// Writes: public/assets/ndu-hero-cutout.webp and QA composites in docs/redesign-qa/hero-gate1/.
import sharp from 'sharp'
import fs from 'node:fs'

const SRC = 'public/assets/Ndu_Blue Background.png'
const OUT = 'public/assets/ndu-hero-cutout'
const QA = 'docs/redesign-qa/hero-gate1'
const BG = [72, 170, 183] // sampled flat background (#48aab7)
const D0 = 28   // at or below: fully background
const D1 = 150  // at or above: fully subject

fs.mkdirSync(QA, { recursive: true })
const TB = 70   // flood-fill limit for the connected background region
const BAND = 2  // soft alpha only within this many px of the background region
const { data, info } = await sharp(SRC).removeAlpha().raw().toBuffer({ resolveWithObject: true })
const { width, height } = info
const N = width * height
const out = Buffer.alloc(N * 4)
const hist = new Array(11).fill(0)

// 1. Colour distance to the background for every pixel
const dist = new Float32Array(N)
for (let p = 0; p < N; p++) {
  const i = p * 3
  dist[p] = Math.hypot(data[i] - BG[0], data[i + 1] - BG[1], data[i + 2] - BG[2])
}

// 2. Background = pixels near the key colour AND connected to the image border.
//    Light areas inside the subject (white shirt) can never be keyed out this way.
const bg = new Uint8Array(N)
const queue = []
for (let x = 0; x < width; x++) queue.push(x, (height - 1) * width + x)
for (let y = 0; y < height; y++) queue.push(y * width, y * width + width - 1)
while (queue.length) {
  const p = queue.pop()
  if (bg[p] || dist[p] >= TB) continue
  bg[p] = 1
  const x = p % width, y = (p / width) | 0
  if (x > 0) queue.push(p - 1)
  if (x < width - 1) queue.push(p + 1)
  if (y > 0) queue.push(p - width)
  if (y < height - 1) queue.push(p + width)
}

// 3. Alpha: soft only in the thin band that touches the background region
const alpha = new Float32Array(N)
for (let p = 0; p < N; p++) {
  const x = p % width, y = (p / width) | 0
  let nearBg = bg[p] === 1
  for (let dy = -BAND; dy <= BAND && !nearBg; dy++)
    for (let dx = -BAND; dx <= BAND && !nearBg; dx++) {
      const xx = x + dx, yy = y + dy
      if (xx >= 0 && yy >= 0 && xx < width && yy < height && bg[yy * width + xx]) nearBg = true
    }
  alpha[p] = nearBg ? Math.min(1, Math.max(0, (dist[p] - D0) / (D1 - D0))) : 1
}

// 4. Colour: semi-transparent edge pixels take the colour of nearby fully opaque subject
//    pixels (defringe), so no teal or tinted rim survives on any background.
for (let p = 0; p < N; p++) {
  const a = alpha[p], i = p * 3, j = p * 4
  let rgb = [data[i], data[i + 1], data[i + 2]]
  if (a > 0 && a < 1) {
    const x = p % width, y = (p / width) | 0
    let s = [0, 0, 0], n = 0
    for (let dy = -4; dy <= 4; dy++)
      for (let dx = -4; dx <= 4; dx++) {
        const xx = x + dx, yy = y + dy
        if (xx < 0 || yy < 0 || xx >= width || yy >= height) continue
        const q = yy * width + xx
        if (alpha[q] === 1) { s[0] += data[q * 3]; s[1] += data[q * 3 + 1]; s[2] += data[q * 3 + 2]; n++ }
      }
    if (n) rgb = s.map(v => Math.round(v / n))
  }
  out[j] = rgb[0]; out[j + 1] = rgb[1]; out[j + 2] = rgb[2]
  out[j + 3] = Math.round(a * 255)
  hist[Math.round(a * 10)]++
}

const img = sharp(out, { raw: { width, height, channels: 4 } })
// Only the WebP is shipped (44KB); re-run this script to regenerate it.
await img.clone().webp({ quality: 88, alphaQuality: 90 }).toFile(`${OUT}.webp`)

// QA: composite over contrasting backgrounds (playbook B5 / L11)
const backs = { black: '#050505', white: '#ffffff', magenta: '#ff00ff', 'site-teal': '#48aab7', 'site-offwhite': '#f2f2ef' }
const tiles = []
for (const [name, color] of Object.entries(backs)) {
  const buf = await sharp({ create: { width, height, channels: 4, background: color } })
    .composite([{ input: await img.clone().png().toBuffer() }]).png().toBuffer()
  await sharp(buf).resize(540).toFile(`${QA}/cutout-on-${name}.png`)
  // 100% crops of the hardest edges: head top, ear/beard, shoulder, collar
  for (const [crop, r] of Object.entries({ head: [380, 30, 320, 200], beard: [380, 280, 320, 220], shoulder: [100, 420, 280, 240] })) {
    if (name === 'black' || name === 'white' || name === 'magenta') {
      await sharp(buf).extract({ left: r[0], top: r[1], width: r[2], height: r[3] }).toFile(`${QA}/edge-${crop}-${name}.png`)
    }
  }
  tiles.push(name)
}
const sizes = ['webp'].map(e => `${e} ${Math.round(fs.statSync(`${OUT}.${e}`).size / 1024)}KB`)
console.log(JSON.stringify({ width, height, alphaHistogram_0_to_10: hist, outputs: sizes, qa: tiles }))
