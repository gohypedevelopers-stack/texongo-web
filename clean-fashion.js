const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'public', 'digital-fashion-fixed');

if (!fs.existsSync(dir)) process.exit(0);

const files = fs.readdirSync(dir);

files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).size < 100000) {
        fs.unlinkSync(filePath);
        console.log('Deleted:', file);
    }
});
