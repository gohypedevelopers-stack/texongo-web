const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const fs = require('fs');
const path = require('path');

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

// Paths - using the folder we created earlier
const inputDir = path.join(__dirname, 'public', 'digital-drape');
const outputDir = path.join(__dirname, 'public', 'digital-drape-fixed');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.mp4'));

async function processFiles() {
  console.log(`Found ${files.length} .mp4 files. Starting batch conversion...`);
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, file);

    if (fs.existsSync(outputPath)) {
      console.log(`[${i + 1}/${files.length}] Skipping ${file} (already processed)`);
      continue;
    }

    console.log(`[${i + 1}/${files.length}] Converting: ${file}`);
    
    await new Promise((resolve) => {
      ffmpeg(inputPath)
        .videoCodec('libx264')
        .audioCodec('aac')
        .outputOptions([
          '-pix_fmt yuv420p',
          '-movflags +faststart'
        ])
        .on('end', () => {
          console.log(`  ✓ Success`);
          resolve();
        })
        .on('error', (err) => {
          console.error(`  ✗ Error converting ${file}: ${err.message}`);
          resolve(); // Resolve anyway to continue with the next file
        })
        .save(outputPath);
    });
  }
  console.log('\n✅ All videos processed successfully!');
}

processFiles();
