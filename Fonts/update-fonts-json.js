const fs = require('fs');
const path = require('path');

const fontsDir = __dirname; // Directory containing this script
const outputJson = path.join(fontsDir, 'fonts.json');

const generateFontsJson = () => {
    fs.readdir(fontsDir, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return;
        }

        // Filter for .msdf.json files
        const fontFiles = files.filter(file => file.endsWith('.msdf.json'));
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

// Run the function
generateFontsJson();
