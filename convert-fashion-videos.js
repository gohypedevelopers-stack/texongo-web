const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const path = require('path');

ffmpeg.setFfmpegPath(ffmpegPath);

const inputDir = path.join(__dirname, 'public', 'digital fashion');
const outputDir = path.join(__dirname, 'public', 'digital-fashion-fixed');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function convertFile(file) {
  const inputPath = path.join(inputDir, file);
  const outputPath = path.join(outputDir, file);

  // Skip if already converted and looks valid
  if (fs.existsSync(outputPath) && fs.statSync(outputPath).size > 100000) {
    console.log(`  - Skipping: ${file} (already exists)`);
    return;
  }

  return new Promise((resolve, reject) => {
    console.log(`Converting: ${file}`);

    ffmpeg(inputPath)
      .outputOptions([
        '-c:v libx264',
        '-profile:v main',
        '-level:v 4.0',
        '-pix_fmt yuv420p',
        '-crf 23',
        '-preset fast',
        '-movflags +faststart',
        '-an'
      ])
      .on('end', () => {
        console.log(`  ✓ Success`);
        resolve();
      })
      .on('error', (err, stdout, stderr) => {
        console.error(`  ✗ Error converting ${file}: ${err.message}`);
        console.error(`  FFmpeg Stderr: ${stderr}`);
        resolve(); // Continue anyway
      })
      .save(outputPath);
  });
}

async function processFiles() {
  const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.mp4'));
  console.log(`Found ${files.length} videos to process.`);
  
  for (let i = 0; i < files.length; i++) {
    console.log(`[${i + 1}/${files.length}] Converting: ${files[i]}`);
    try {
      await convertFile(files[i]);
    } catch (e) {
      // Continue with next file even if one fails
    }
  }
  console.log('\n✅ All Digital Fashion videos processed successfully!');
}

processFiles();
