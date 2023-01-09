const express = require('express');
const puppeteer = require('puppeteer');
const router = express.Router();

router.post('/', async (req, res) => {
  const html = req.body.html || "No body";
  const options = {
    margin : {
      top : "1.5cm",
      right : "1.5cm",
      bottom : "1.5cm",
      left : "4cm"
    }
  }
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--font-render-hinting=none'
    ]
  });
  const page = await browser.newPage();
  await page.setUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36");
  await page.goto('data:text/html;charset=UTF-8,' + html, {waitUntil: 'networkidle0'});
  await page.emulateMediaType('screen');
  const buffer = await page.pdf(options);
  await page.close();
  await browser.close();
  res.set("Content-Type", "application/pdf");
  res.status(200).send(buffer);
});

module.exports = router;
