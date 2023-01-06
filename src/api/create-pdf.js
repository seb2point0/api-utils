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
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(html);
  await page.emulateMediaType('screen');
  const pdfBuffer = await page.pdf(options);
  await page.close();
  await browser.close();
  res.set("Content-Type", "application/pdf");
  res.status(200).send(pdfBuffer);
});

module.exports = router;
