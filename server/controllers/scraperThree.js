const puppeteer = require('puppeteer')



async function run(url) {
    
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url)


    // THIS WORKS
    const imageElement = await page.$('#imgTagWrapperId')
    const imageBox = await imageElement.boundingBox()
    await page.screenshot({
      path: 'exampleThree.png',
      clip: {
        x: imageBox.x,
        y: imageBox.y,
        width: imageBox.width,
        height: imageBox.height
      }
    })

    const title = await page.evaluate(() => document.title)
    console.log(title)

        const price = await page.evaluate(() => document.querySelector('#corePrice_feature_div').textContent)
    console.log(price)

    await browser.close();
}
run()

module.exports = {

    run
    
      
   }
   
   