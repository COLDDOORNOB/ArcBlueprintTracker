const fs = require('fs');
const https = require('https');
const path = require('path');

// The Google Sheets CSV URL
const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRUbvNSaRrEWnR67yD6RVyG3ypoeWJaJG9eBZ-f_cw7kOu4ZFSIBSHP4geWdtfQ_8zRzZTTi5h5Cw2d/pub?gid=1016263653&single=true&output=csv";

// Output path in public directory
const OUTPUT_PATH = path.join(__dirname, '..', 'public', 'data.csv');
const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images');
const MANIFEST_PATH = path.join(__dirname, '..', 'public', 'image-manifest.json');

function generateImageManifest() {
    console.log(`Scanning images in: ${IMAGES_DIR}`);
    try {
        const files = fs.readdirSync(IMAGES_DIR).filter(f => {
            const ext = path.extname(f).toLowerCase();
            return ['.png', '.webp', '.jpg', '.jpeg'].includes(ext);
        });
        fs.writeFileSync(MANIFEST_PATH, JSON.stringify(files, null, 2));
        console.log(`Successfully saved image manifest to: ${MANIFEST_PATH} (${files.length} images)`);
    } catch (err) {
        console.error('Error generating image manifest:', err);
    }
}

function download(url, dest) {
    console.log(`Downloading CSV from: ${url}`);

    https.get(url, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
            console.log(`Following redirect to: ${res.headers.location}`);
            download(res.headers.location, dest);
            return;
        }

        if (res.statusCode !== 200) {
            console.error(`Failed to download CSV. Status Code: ${res.statusCode}`);
            process.exit(1);
        }

        const file = fs.createWriteStream(dest);
        res.pipe(file);

        file.on('finish', () => {
            file.close();
            console.log(`Successfully saved CSV to: ${dest}`);
            generateImageManifest(); // Generate manifest after CSV download
        });
    }).on('error', (err) => {
        console.error('Error downloading CSV:', err);
        process.exit(1);
    });
}

download(CSV_URL, OUTPUT_PATH);
