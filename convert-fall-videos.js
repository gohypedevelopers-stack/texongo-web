const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const fs = require('fs');
const path = require('path');

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

// Paths
const inputDir = path.join(__dirname, 'public', 'digital fall');
const outputDir = path.join(__dirname, 'public', 'digital-fall-fixed');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.mp4'));

async function processFiles() {
  console.log(`Found ${files.length} .mp4 files in 'digital fall'. Starting batch conversion...`);
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const inputPath = path.join(inputDir, file);
    // Use underscored names for the output to be safe
    const outputFileName = file.replace(/ /g, '_');
    const outputPath = path.join(outputDir, outputFileName);

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
          resolve(); 
        })
        .save(outputPath);
    });
  }
  console.log('\n✅ All Digital Fall videos processed successfully!');
}

processFiles();
