// scripts/transcode-videos.mjs
// Converts raw videos into mp4/webm + poster jpg if missing (audio preserved).
import fs from 'fs'
import path from 'path'
import ffmpegPath from 'ffmpeg-static'
import ffmpeg from 'fluent-ffmpeg'
ffmpeg.setFfmpegPath(ffmpegPath)

const ASSETS = path.resolve('public', 'assets')
if (!fs.existsSync(ASSETS)) {
  console.error('Assets folder not found:', ASSETS)
  process.exit(1)
}

const targets = [
  {
    base: 'ntombis-1080',
    srcCandidates: ['ntombis.mp4', 'ntombis.mov', 'ntombis.mkv', 'ntombis.webm'],
    poster: 'ntombis-thumb.jpg'
  }
]

function exists(p){ return fs.existsSync(path.join(ASSETS, p)) }

function transcode(srcName, outName, kind /* 'mp4' | 'webm' */) {
  return new Promise((resolve, reject) => {
    const input = path.join(ASSETS, srcName)
    const output = path.join(ASSETS, outName)

    const cmd = ffmpeg(input)
      .addOption('-map', '0:v:0')
      .addOption('-map', '0:a?')       // keep audio if it exists
      .size('?x1080')

    if (kind === 'mp4') {
      cmd
        .videoCodec('libx264')
        .audioCodec('aac')
        .audioBitrate('160k')
        .outputOptions(['-crf 23', '-preset medium', '-movflags +faststart']) // fast streaming
    } else {
      cmd
        .videoCodec('libvpx-vp9')
        .audioCodec('libopus')
        .audioBitrate('128k')
        .outputOptions(['-crf 30', '-b:v 0']) // CQ mode
    }

    cmd
      .on('start', (c) => console.log('ffmpeg:', c))
      .on('end', () => { console.log('✔ Wrote', outName); resolve() })
      .on('error', (err) => { console.error('ffmpeg error:', err.message); reject(err) })
      .save(output)
  })
}

function makePoster(srcName, posterName) {
  return new Promise((resolve, reject) => {
    const input = path.join(ASSETS, srcName)
    const output = path.join(ASSETS, posterName)
    ffmpeg(input)
      .on('end', () => { console.log('✔ Poster created', posterName); resolve() })
      .on('error', (err) => { console.error('poster error:', err.message); reject(err) })
      .screenshots({ count: 1, timemarks: ['1'], filename: path.basename(output), folder: ASSETS })
  })
}

async function run() {
  for (const t of targets) {
    const src = t.srcCandidates.find(exists)
    if (!src) { console.log(`(skip) No raw source found for ${t.base}`); continue }

    // Clean tiny placeholders if any
    for (const f of [`${t.base}.mp4`, `${t.base}.webm`]) {
      const full = path.join(ASSETS, f)
      try {
        if (fs.existsSync(full) && fs.statSync(full).size < 50_000) fs.unlinkSync(full)
      } catch {}
    }

    if (!exists(`${t.base}.mp4`)) await transcode(src, `${t.base}.mp4`, 'mp4')
    if (!exists(`${t.base}.webm`)) await transcode(src, `${t.base}.webm`, 'webm')
    if (!exists(t.poster)) await makePoster(src, t.poster)
  }
  console.log('✅ Video transcode complete.')
}
run().catch(e => { console.error(e); process.exit(1) })
