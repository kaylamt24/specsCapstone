const puppeteer = require('puppeteer')



async function run() {
    
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('https://www.amazon.com/Orgrimmar-Extension-Silicone-Professional-Accessory/dp/B086X2BJJD/?_encoding=UTF8&pd_rd_w=RcV4F&content-id=amzn1.sym.b4f172f0-a2ab-4ffa-ac9d-22e96231ca8e&pf_rd_p=b4f172f0-a2ab-4ffa-ac9d-22e96231ca8e&pf_rd_r=N7CJCBGT0ZSQASD8Z3BS&pd_rd_wg=vzMUU&pd_rd_r=05d88f0a-f176-41c6-b452-7478d0fd541e&ref_=pd_gw_ci_mcx_mr_hp_atf_m&th=1')


    // THIS WORKS
    const imageElement = await page.$('#imgTagWrapperId')
    const imageBox = await imageElement.boundingBox()
    await page.screenshot({
      path: 'example.png',
      clip: {
        x: imageBox.x,
        y: imageBox.y,
        width: imageBox.width,
        height: imageBox.height
      }
    })

    // await page.screenshot({path: "example.png", fullPage: true})

    //THIS WORKS
    const title = await page.evaluate(() => document.title)
    console.log(title)


            //THIS WORKS
    // const price = await page.evaluate(() => document.querySelector('#sns-base-price').textContent)
    // console.log(price)
    // const price = await page.evaluate(() => document.querySelector('#corePriceDisplay_desktop_feature_div > div.a-section.a-spacing-none.aok-align-center > span.a-price.aok-align-center.reinventPricePriceToPayMargin.priceToPay').textContent)
    // console.log(price)
    

    //     const price = await page.evaluate(() => {
    //     const element = document.evaluate('//span[@class="a-price aok-align-center reinventPricePriceToPayMargin priceToPay"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    //     return element.textContent;
    // });
    // console.log(price);
    
    await browser.close();
}

            //THIS WORKS
    // const price = await page.evaluate(() => {
    //     const element = document.evaluate('//span[@class="a-price aok-align-center reinventPricePriceToPayMargin priceToPay"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    //     return element.textContent;
    // });
    // console.log(price);

    // let price;
    // const priceOne = await page.evaluate(() => document.querySelector('#sns-base-price').textContent);
    // if (priceOne) {
    //     price = priceOne;
    // } else {
    //     const priceTwoElement = await page.$("#corePriceDisplay_mobile_feature_div > div.a-section.a-spacing-none.aok-align-center > span > span:nth-child(2)")
    //     if (priceTwoElement) {
    //         const priceTwo = await page.evaluate(el => el.textContent, priceTwoElement);
    //         if (priceTwo !== null && priceTwo !== undefined) {
    //             price = priceTwo;
    //         } else {
    //             price = null;
    //         }
    //     }
    
        
    // const priceSelector1 = '#sns-base-price';
    // const priceSelector2 = '#corePriceDisplay_mobile_feature_div > div.a-section.a-spacing-none.aok-align-center';
    
    // if (await page.$(priceSelector1)) {
    //   const price = await page.evaluate(() => document.querySelector(priceSelector1).textContent);
    //   console.log(price);
    // } else if (await page.$x(priceSelector2)) {
    //   const price = await page.evaluate((priceSelector2) => {
    //     const element = document.evaluate(priceSelector2, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    //     return element.textContent;
    //   }, priceSelector2);
    //   console.log(price);
    


        
    // console.log(price);
    // await browser.close();
        
        
    // }
    // console.log(price);
    // await browser.close();
    // }

run()
