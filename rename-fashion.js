const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'public', 'digital fashion');

if (!fs.existsSync(dir)) {
    console.error('Directory not found:', dir);
    process.exit(1);
}

const files = fs.readdirSync(dir);

files.forEach(file => {
    if (file.endsWith('.mp4')) {
        const oldPath = path.join(dir, file);
        const newName = file.replace(/\s+/g, '_');
        const newPath = path.join(dir, newName);
        
        if (oldPath !== newPath) {
            fs.renameSync(oldPath, newPath);
            console.log(`Renamed: ${file} -> ${newName}`);
        }
    }
});
