const puppeteer = require('puppeteer')


const sharp = require('sharp')


async function scraper(url) {

  

const browser = await puppeteer.launch({headless: true})
const context = await browser.createIncognitoBrowserContext()
const page = await browser.newPage()
await page.setUserAgent("Chrome/109.0.5414.120")
await page.goto(url)


const imageElement = await page.$('#imgTagWrapperId')
const bounding_box = await imageElement.boundingBox()

const screenshotBuffer = await page.screenshot({
encoding: 'binary',
clip: {
x: bounding_box.x,
y: bounding_box.y,
width: Math.min(bounding_box.width, page.viewport().width),
height: Math.min(bounding_box.height, page.viewport().height),
}
})
const resizedBuffer = await sharp(screenshotBuffer)
.resize(Math.round(120, 120))
.toBuffer()

const screenshotBase64 = Buffer.from(resizedBuffer, 'binary').toString('base64')


const title = await page.evaluate(() => {
  const priceSelector1 = '#titleExpanderContent';
  const priceSelector2 = '#productTitle';
  const priceSelector3 = '#titleExpanderContent > h1';
  const priceSelector4 = '#title'

  const selectedPrices = document.querySelector(priceSelector1) || document.querySelector(priceSelector2) || document.querySelector(priceSelector3) || document.querySelector(priceSelector4);
  return selectedPrices.textContent;

})

const price = await page.evaluate(() => {
  const selector1 = '#corePrice_feature_div > div > span.a-price.aok-align-center > span:nth-child(2)';
  const selector2 = '#corePrice_desktop > div > table > tbody > tr > td.a-span12 > span.a-price.a-text-price.a-size-medium.apexPriceToPay > span.a-offscreen';
  const selector3 = '#corePrice_feature_div > div > div > span > span:nth-child(2)';
  const selector4 = '#corePrice_desktop > div > span > span > span.a-offscreen';
  const selector5 = '#corePriceDisplay_desktop_feature_div > div.a-section.a-spacing-none.aok-align-center > span.a-price.aok-align-center.reinventPricePriceToPayMargin.priceToPay > span:nth-child(2)'
  const selector6 = '#corePriceDisplay_mobile_feature_div > div.a-section.a-spacing-none.aok-align-center > span.a-price.aok-align-center.reinventPricePriceToPayMargin.priceToPay > span:nth-child(2)'
  const selectedElement = document.querySelector(selector1) || document.querySelector(selector2) || document.querySelector(selector3) || document.querySelector(selector4) || document.querySelector(selector5) || document.querySelector(selector6);
  return selectedElement.textContent;
});


await context.close()

return { screenshotBase64, title, price }
}

// scraper()

module.exports = {

    scraper
    
   }
   
 