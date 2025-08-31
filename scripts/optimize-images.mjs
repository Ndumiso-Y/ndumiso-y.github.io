// Converts JPG/PNG images in /public/assets to WebP/AVIF. UI still uses JPG/PNG.
import fs from 'fs'
import path from 'path'
import sharp from 'sharp'
const ASSETS = path.resolve('public', 'assets')
if (!fs.existsSync(ASSETS)) { console.error('Assets folder not found:', ASSETS); process.exit(1) }
const exts = ['.jpg','.jpeg','.png']
const files = fs.readdirSync(ASSETS).filter(f => exts.includes(path.extname(f).toLowerCase()))
for (const file of files) {
  const base = path.join(ASSETS, path.parse(file).name)
  const input = path.join(ASSETS, file)
  const img = sharp(input)
  if (!fs.existsSync(base + '.webp')) await img.webp({ quality: 70 }).toFile(base + '.webp')
  if (!fs.existsSync(base + '.avif')) await img.avif({ quality: 50 }).toFile(base + '.avif')
  console.log('Optimized:', file)
}
console.log('✅ Image optimization complete.')
