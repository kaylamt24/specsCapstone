const puppeteer = require('puppeteer')



async function run(url) {
    
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(`${url}`)


    // THIS WORKS
    const imageElement = await page.$('#imgTagWrapperId')
    const bounding_box = await imageElement.boundingBox()
    const screenshotBuffer = await page.screenshot({
      // path: 'exampleThree.png',
      // quality: 50,
      encoding: 'binary',
      clip: {
        x: bounding_box.x,
        y: bounding_box.y,
        width: Math.min(bounding_box.width, page.viewport().width),
        height: Math.min(bounding_box.height, page.viewport().height)
      }
    })

    const item_picture = Buffer.from(screenshotBuffer, 'binary').toString('base64')

    const item_name = await page.evaluate(() => document.title)
    console.log(item_name)

        const item_price = await page.evaluate(() => document.querySelector('#corePrice_desktop > div > table > tbody > tr > td.a-span12 > span.a-price.a-text-price.a-size-medium.apexPriceToPay > span.a-offscreen').textContent)
    console.log(item_price)

    await browser.close();

    return {item_picture, item_name, item_price}
}
// run()

module.exports = {

    run
    
   }
   
   