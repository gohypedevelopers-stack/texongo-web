const fs = require('fs');
const path = require('path');

const dir = 'public/digital-fashion-fixed';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.mp4'));

const sizeMap = new Map();
const uniqueFiles = [];

files.forEach(file => {
    const stats = fs.statSync(path.join(dir, file));
    const size = stats.size;
    
    if (sizeMap.has(size)) {
        // If we have a duplicate size, prefer the one that starts with "FAB"
        const existingFile = sizeMap.get(size);
        if (file.startsWith('FAB') && !existingFile.startsWith('FAB')) {
            sizeMap.set(size, file);
        }
    } else {
        sizeMap.set(size, file);
    }
});

const result = Array.from(sizeMap.values());
console.log(JSON.stringify(result, null, 2));
