const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function capture() {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

    console.log('Navigating to login...');
    await page.goto('https://danella.onrender.com/store-manager/login', { waitUntil: 'networkidle2', timeout: 25000 });

    // Fill form
    await page.type('input[type="email"]', 'admin@danellaimports.com');
    await page.type('input[type="password"]', 'Abcd1234@');
    
    console.log('Submitting login...');
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 15000 }).catch(() => {}),
      page.click('button[type="submit"]')
    ]);

    await new Promise(r => setTimeout(r, 3000));

    console.log('Current URL after login:', page.url());

    // Also navigate to /store-manager/products or stay on /store-manager
    const outPath = path.resolve(process.cwd(), 'public/projects/danella/danella-products.png');
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    await page.screenshot({ path: outPath, fullPage: false });
    console.log('Saved manager screenshot to', outPath);

  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await browser.close();
  }
}

capture();
