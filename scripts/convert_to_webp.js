const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const rootDir = __dirname + '/../public';
const dirs = ['images', 'Background', 'icons'];

async function convertDir(dirName) {
    const dirPath = path.join(rootDir, dirName);
    if (!fs.existsSync(dirPath)) {
        console.log(`Directory not found: ${dirPath}`);
        return;
    }

    const files = fs.readdirSync(dirPath);

    for (const file of files) {
        if (file.toLowerCase().endsWith('.png')) {
            const inputPath = path.join(dirPath, file);
            const outputPath = path.join(dirPath, file.replace(/\.png$/i, '.webp'));

            console.log(`Converting: ${file} ...`);

            try {
                await sharp(inputPath)
                    .webp({ quality: 80 })
                    .toFile(outputPath);

                // Optional: Delete original? 
                // Let's keep them for now, user can delete manually or I will if confirmed.
                // Actually, to verify site works, we need to switch code first.
                // But to save space, we should eventually delete.

                // Just converting for now.
            } catch (err) {
                console.error(`Failed to convert ${file}:`, err);
            }
        }
    }
}

(async () => {
    for (const dir of dirs) {
        await convertDir(dir);
    }
    console.log("Conversion Complete!");
})();
