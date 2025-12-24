const fs = require('fs');
const path = require('path');

const rootDir = __dirname + '/../public';
const dirs = ['images', 'Background']; // Don't delete icons yet or verify first? User said convert images. Icons was part of my script.
// Wait, I converted icons too.
const dirsToClean = ['images', 'Background', 'icons'];

async function cleanDir(dirName) {
    const dirPath = path.join(rootDir, dirName);
    if (!fs.existsSync(dirPath)) return;

    const files = fs.readdirSync(dirPath);
    let deletedCount = 0;

    for (const file of files) {
        if (file.toLowerCase().endsWith('.png')) {
            // Check if .webp equivalent exists
            const webpPath = path.join(dirPath, file.replace(/\.png$/i, '.webp'));

            // Special exemption for favicons (not in this list) or specific files?
            // "Arc BP Tracker Logo White Small.png" -> .webp exists.

            if (fs.existsSync(webpPath)) {
                // Safe to delete png
                fs.unlinkSync(path.join(dirPath, file));
                deletedCount++;
                console.log(`Deleted: ${file} (WebP replacement confirmed)`);
            } else {
                console.warn(`Skipping delete: ${file} (No WebP found!)`);
            }
        }
    }
    console.log(`Cleaned ${dirName}: ${deletedCount} files deleted.`);
}

(async () => {
    for (const dir of dirsToClean) {
        await cleanDir(dir);
    }
    console.log("Cleanup Complete!");
})();
