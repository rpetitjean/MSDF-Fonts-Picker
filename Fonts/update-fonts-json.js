const fs = require('fs');
const path = require('path');

// Define the fonts directory
const fontsDir = path.join(__dirname);
const outputJson = path.join(fontsDir, 'fonts.json');

// Function to generate fonts.json
const generateFontsJson = () => {
    fs.readdir(fontsDir, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            process.exit(1);
        }

        // Filter for .json files (excluding fonts.json itself)
        const fontFiles = files.filter(file => file.endsWith('.json') && file !== 'fonts.json');
        const fontsJson = { fonts: fontFiles };

        // Write to fonts.json
        fs.writeFile(outputJson, JSON.stringify(fontsJson, null, 2), err => {
            if (err) {
                console.error('Error writing fonts.json:', err);
                process.exit(1);
            } else {
                console.log('fonts.json generated successfully:', fontsJson);
            }
        });
    });
};

// Run the function
generateFontsJson();
