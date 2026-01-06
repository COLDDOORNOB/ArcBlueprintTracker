const fs = require('fs');
const https = require('https');
const path = require('path');

// The Google Sheets CSV URL for Data Registry
const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTVGhcLiin4Ke8anpTi8amSCsOF-ato3LUpG5eqHjOU_sH-70n4QfhpwToV4lZ2q5taM4xO-qWSldrH/pub?gid=1774944227&single=true&output=csv";

// Output path in public directory
const OUTPUT_PATH = path.join(__dirname, '..', 'public', 'data_registry.csv');

function download(url, dest) {
    console.log(`Downloading Registry CSV from: ${url}`);

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
            console.log(`Successfully saved Registry CSV to: ${dest}`);
        });
    }).on('error', (err) => {
        console.error('Error downloading CSV:', err);
        process.exit(1);
    });
}

const timestamp = Date.now();
const urlWithCacheBuster = CSV_URL + "&t=" + timestamp;
download(urlWithCacheBuster, OUTPUT_PATH);
