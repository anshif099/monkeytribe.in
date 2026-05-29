import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const publicDir = './public';

const tasks = [
  // header-logo.png: convert to WebP, displayed at ~115px wide (2x = 230px)
  {
    input: path.join(publicDir, 'header-logo.png'),
    outputs: [
      { file: path.join(publicDir, 'header-logo.webp'), width: 230, quality: 80 },
      { file: path.join(publicDir, 'header-logo@1x.webp'), width: 115, quality: 80 },
    ],
  },
  // logo.webp (footer): displayed at 193x241, source is 300x375. Resize to 2x display = 386x482
  {
    input: path.join(publicDir, 'logo.webp'),
    outputs: [
      { file: path.join(publicDir, 'logo-optimized.webp'), width: 400, quality: 80 },
      { file: path.join(publicDir, 'logo-optimized@1x.webp'), width: 200, quality: 80 },
    ],
  },
  // logo2.webp: displayed at 214x267, source is 300x358. Resize to 2x = 428x534
  {
    input: path.join(publicDir, 'logo2.webp'),
    outputs: [
      { file: path.join(publicDir, 'logo2-optimized.webp'), width: 428, quality: 80 },
      { file: path.join(publicDir, 'logo2-optimized@1x.webp'), width: 214, quality: 80 },
    ],
  },
  // creative-monkeys.webp: displayed at 142x130, increase compression
  {
    input: path.join(publicDir, 'creative-monkeys.webp'),
    outputs: [
      { file: path.join(publicDir, 'creative-monkeys-optimized.webp'), width: 284, quality: 75 },
      { file: path.join(publicDir, 'creative-monkeys-optimized@1x.webp'), width: 142, quality: 75 },
    ],
  },
];

async function run() {
  for (const task of tasks) {
    if (!fs.existsSync(task.input)) {
      console.warn(`⚠ Skipping missing file: ${task.input}`);
      continue;
    }
    const meta = await sharp(task.input).metadata();
    console.log(`\nProcessing: ${task.input} (${meta.width}x${meta.height})`);
    
    for (const out of task.outputs) {
      const result = await sharp(task.input)
        .resize(out.width, null, { withoutEnlargement: true })
        .webp({ quality: out.quality, effort: 6 })
        .toFile(out.file);
      const inSize = fs.statSync(task.input).size;
      console.log(`  → ${path.basename(out.file)}: ${result.width}x${result.height}, ${(result.size/1024).toFixed(1)} KiB (was ${(inSize/1024).toFixed(1)} KiB)`);
    }
  }
  console.log('\n✅ All images optimized!');
}

run().catch(console.error);
