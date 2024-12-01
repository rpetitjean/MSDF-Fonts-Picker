const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar'); // Make sure to install it: npm install chokidar

// Define the fonts directory
const fontsDir = path.join(__dirname);
const outputJson = path.join(fontsDir, 'fonts.json');

// Function to generate fonts.json
const generateFontsJson = () => {
    fs.readdir(fontsDir, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return;
        }

        // Filter for .json files (excluding fonts.json itself)
        const fontFiles = files.filter(file => file.endsWith('.json') && file !== 'fonts.json');
        const fontsJson = { fonts: fontFiles };

        // Write to fonts.json
        fs.writeFile(outputJson, JSON.stringify(fontsJson, null, 2), err => {
            if (err) {
                console.error('Error writing fonts.json:', err);
            } else {
                console.log('fonts.json updated successfully:', fontsJson);
            }
        });
    });
};

// Watch the fonts directory for changes
const watchFontsDirectory = () => {
    const watcher = chokidar.watch(fontsDir, {
        persistent: true,
        ignoreInitial: true
    });

    // React to file additions, deletions, or changes
    watcher
        .on('add', filePath => {
            console.log(`File added: ${filePath}`);
            generateFontsJson();
        })
        .on('unlink', filePath => {
            console.log(`File removed: ${filePath}`);
            generateFontsJson();
        })
        .on('error', error => console.error('Watcher error:', error));
};

// Run the generator and start watching
generateFontsJson(); // Generate initially
watchFontsDirectory(); // Start watching
