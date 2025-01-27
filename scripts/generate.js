const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function generateScreenshots() {
    console.log('Starting screenshot generation...');
    
    const browser = await puppeteer.launch({
        headless: "new",
        defaultViewport: {
            width: 1200,
            height: 800
        }
    });

    try {
        const page = await browser.newPage();
        
        // Create assets/images directory if it doesn't exist
        const imagesDir = path.join(__dirname, '../assets/images');
        if (!fs.existsSync(imagesDir)) {
            fs.mkdirSync(imagesDir, { recursive: true });
        }

        // Generate a simple test screenshot
        await page.setContent(`
            <div style="width: 1200px; height: 800px; background: linear-gradient(135deg, #2C3E50 0%, #3498DB 100%); display: flex; align-items: center; justify-content: center;">
                <h1 style="color: white; font-family: Arial; font-size: 48px;">Business Pro</h1>
            </div>
        `);
        
        await page.screenshot({
            path: path.join(imagesDir, 'homepage.jpg'),
            type: 'jpeg',
            quality: 90
        });

        console.log('Screenshot generated successfully!');

    } catch (error) {
        console.error('Error generating screenshots:', error);
    } finally {
        await browser.close();
    }
}

generateScreenshots().catch(console.error); 