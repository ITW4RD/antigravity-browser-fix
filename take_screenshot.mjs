import puppeteer from 'puppeteer';

const url = process.argv[2] || 'https://www.youtube.com';
const outputPath = process.argv[3] || 'screenshot.png';

(async () => {
  try {
    console.log(`Abriendo navegador para: ${url}`);
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    // Esperamos hasta que la red esté inactiva (carga completa)
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.screenshot({ path: outputPath });
    console.log(`[EXITO] Captura guardada en: ${outputPath}`);
    await browser.close();
  } catch (error) {
    console.error('[ERROR]', error);
    process.exit(1);
  }
})();
