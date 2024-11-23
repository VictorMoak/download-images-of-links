const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Image Link List
const imageLinks = ["links here"];

// Folder where the images will be saved
const outputFolder = 'downloaded-images';

// Create the folder if it does not exist
if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder);
}

// Function to download an image
async function downloadImage(url, folder) {
    try {
        const response = await axios({
            url,
            responseType: 'stream'
        });

        const fileName = path.basename(url);
        const filePath = path.join(folder, fileName);

        response.data.pipe(fs.createWriteStream(filePath));

        console.log(`Downloaded image: ${filePath}`);
    } catch (error) {
        console.error(`Error downloading image ${url}: ${error.message}`);
    }
}

// Download all images from the list
async function downloadAllImages(links, folder) {
    for (const link of links) {
        await downloadImage(link, folder);
    }
}

downloadAllImages(imageLinks, outputFolder);
