const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function capture() {
  const url = process.argv[2] || 'http://localhost:5001';
  const outPath = process.argv[3] || 'public/projects/mtcx-tools/store-hero.png';
  const delay = parseInt(process.argv[4] || '1500', 10);
  const mode = process.argv[5] || 'desktop';

  const fullOut = path.resolve(process.cwd(), outPath);
  fs.mkdirSync(path.dirname(fullOut), { recursive: true });

  console.log(`Navigating to ${url}...`);
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    if (mode === 'mobile') {
      await page.setViewport({ width: 400, height: 860, deviceScaleFactor: 2, isMobile: true });
    } else {
      await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
    }

    await page.goto(url, { waitUntil: 'networkidle2', timeout: 20000 });
    await new Promise(r => setTimeout(r, delay));

    // Try clicking 'Accept & continue' button if present
    try {
      const buttons = await page.$$('button');
      for (const btn of buttons) {
        const text = await page.evaluate(el => el.textContent, btn);
        if (text && text.includes('Accept & continue')) {
          await btn.click();
          await new Promise(r => setTimeout(r, 800));
          break;
        }
      }
    } catch (e) {}

    const selector = process.argv[6] || (mode.startsWith('#') || mode.startsWith('.') ? mode : null);

    if (mode === 'scroll') {
      await page.evaluate(() => window.scrollBy(0, 700));
      await new Promise(r => setTimeout(r, 1000));
    }
    
    if (selector) {
      await page.evaluate((sel) => {
        const el = document.querySelector(sel);
        if (el) el.scrollIntoView();
      }, selector);
      await new Promise(r => setTimeout(r, 1000));
    }

    await page.screenshot({ path: fullOut, fullPage: false });
    console.log(`Saved screenshot to ${fullOut}`);
  } catch (err) {
    console.error('Screenshot error:', err.message);
  } finally {
    await browser.close();
  }
}

capture();
