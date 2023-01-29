// const puppeteer = require('puppeteer')



// async function run() {
    
//     const browser = await puppeteer.launch()
//     const page = await browser.newPage()
//     await page.goto('https://www.amazon.com/Biotin-Anti-Hair-Loss-Shampoo/dp/B07K4S4J66/?_encoding=UTF8&pf_rd_p=0798b88b-b822-4b83-9597-593c0613a997&pd_rd_wg=aXpJc&pf_rd_r=2RA9W9BJC79QVPVHAFXM&content-id=amzn1.sym.0798b88b-b822-4b83-9597-593c0613a997&pd_rd_w=5B9YM&painterId=gwm-asin-tile&pd_rd_r=6a692cf3-027d-4c95-836e-2e26aadbb622&ref_=pd_gwm_bmx_s1')


//     // THIS WORKS
//     const imageElement = await page.$('#imgTagWrapperId')
//     const imageBox = await imageElement.boundingBox()
//     await page.screenshot({
//       path: 'exampleTwo.png',
//       clip: {
//         x: imageBox.x,
//         y: imageBox.y,
//         width: imageBox.width,
//         height: imageBox.height
//       }
//     })

//     // await page.screenshot({path: "example.png", fullPage: true})

//     //THIS WORKS
//     const title = await page.evaluate(() => document.title)
//     console.log(title)


//             //THIS WORKS


//             // const price = await page.evaluate(() => document.querySelector('#sns-base-price').textContent)
//             // console.log(price)

//             //THIS WORKS
//     // const price = await page.evaluate(() => {
//     //     const element = document.evaluate('//span[@class="a-price aok-align-center reinventPricePriceToPayMargin priceToPay"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
//     //     return element.textContent;
//     // });
//     // console.log(price);

//     await browser.close()
// }
// run()

// // const puppeteer = require('puppeteer');

// // const run = async () => {
// //     const browser = await puppeteer.launch()
// //     const page = await browser.newPage()
// //     await page.goto('https://www.amazon.com/fire-tv-stick-with-3rd-gen-alexa-voice-remote/dp/B08C1W5N87/ref=mp_s_a_1_1?keywords=fire+stick&qid=1674949786&sr=8-1')

// //     const imageElement = await page.$('#imgTagWrapperId')
// //     const imageBox = await imageElement.boundingBox()
// //     await page.screenshot({
// //       path: 'example.png',
// //       clip: {
// //         x: imageBox.x,
// //         y: imageBox.y,
// //         width: imageBox.width,
// //         height: imageBox.height
// //       }
// //     })

// //         const title = await page.evaluate(() => document.title)
// //     console.log(title)


// //     let price
    
// //     const priceOne = await page.evaluate(() => document.querySelector('#sns-base-price').textContent)
// //     if(priceOne) {
// //         price = priceOne
// //     } else {

// //     // console.log(priceOne)

// //     const priceTwo = await page.evaluate(() => {
// //         const element = document.evaluate('//span[@class="a-price aok-align-center reinventPricePriceToPayMargin priceToPay"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
// //         return element ? element.textContent : null;
// //     });
// //     price = priceTwo


// // }
// // console.log(price)

// // await browser.close()
// // }
// // run()


// // const run = async () => {
// //     try {
// //         const browser = await puppeteer.launch()
// //         const page = await browser.newPage()
// //         await page.goto('https://www.amazon.com/fire-tv-stick-with-3rd-gen-alexa-voice-remote/dp/B08C1W5N87/ref=mp_s_a_1_1?keywords=fire+stick&qid=1674949786&sr=8-1')

// //         const imageElement = await page.$('#imgTagWrapperId')
// //         const imageBox = await imageElement.boundingBox()
// //         await page.screenshot({
// //           path: 'example.png',
// //           clip: {
// //             x: imageBox.x,
// //             y: imageBox.y,
// //             width: imageBox.width,
// //             height: imageBox.height
// //           }
// //         })

// //         const title = await page.evaluate(() => document.title)
// //         console.log(title)

// //         let price
// //         const priceOne = await page.evaluate(() => document.querySelector('#sns-base-price').textContent)
// //         if(priceOne) {
// //             price = priceOne
// //         } else {

// //             const priceTwo = await page.evaluate(() => {
// //                 const element = document.evaluate('//span[@class="a-price aok-align-center reinventPricePriceToPayMargin priceToPay"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
// //                 return element ? element.textContent : null;
// //             });
// //             price = priceTwo
// //         }
// //         console.log(price)
// //     } catch (err) {
// //         console.error(err)
// //     } finally {
// //         await browser.close()
// //     }
// // }
// // run()

// // const run = async () => {
// //     const browser = await puppeteer.launch()
// //     const page = await browser.newPage()
// //     await page.goto('https://www.amazon.com/fire-tv-stick-with-3rd-gen-alexa-voice-remote/dp/B08C1W5N87/ref=mp_s_a_1_1?keywords=fire+stick&qid=1674949786&sr=8-1')

// //     const imageElement = await page.$('#imgTagWrapperId')
// //     const imageBox = await imageElement.boundingBox()
// //     await page.screenshot({
// //       path: 'example.png',
// //       clip: {
// //         x: imageBox.x,
// //         y: imageBox.y,
// //         width: imageBox.width,
// //         height: imageBox.height
// //       }
// //     })

// //         const title = await page.evaluate(() => document.title)
// //     console.log(title)


// //     let price
    
// //     const priceOne = await page.evaluate(() => document.querySelector('#sns-base-price').textContent)
// //     if(priceOne) {
// //         price = priceOne
// //     } else {

// //     // console.log(priceOne)

// //     const priceTwo = await page.evaluate(() => {
// //         const element = document.evaluate(;
// //     });
// //     price = priceTwo


// // }
// // console.log(price)

// // await browser.close()
// // }
// // run()


// module.exports = {

//  run
   
// }


// const puppeteer = require('puppeteer')



// async function run() {
    
//     const browser = await puppeteer.launch()
//     const page = await browser.newPage()
//     await page.goto('https://www.amazon.com/Nexxus-Shampoo-Conditioner-Keratin-Protein/dp/B09MRNFDYX/ref=pd_aw_ci_mcx_mh_pd_di_sccai_mh_cn_bw_sspa_ma_huc_pt_thematic_2?pd_rd_w=walVg&content-id=amzn1.sym.29a4cd40-6b7d-4bcc-840d-7a215a75f91f&pf_rd_p=29a4cd40-6b7d-4bcc-840d-7a215a75f91f&pf_rd_r=9C548RRT45WMC4J9S3AG&pd_rd_wg=8CyqO&pd_rd_r=a79b5a69-292b-43de-b6fa-d56de935d4d1&pd_rd_i=B09MRNFDYX')


//     // THIS WORKS
//     const imageElement = await page.$('#imgTagWrapperId')
//     const imageBox = await imageElement.boundingBox()
//     await page.screenshot({
//       path: 'exampleThree.png',
//       clip: {
//         x: imageBox.x,
//         y: imageBox.y,
//         width: imageBox.width,
//         height: imageBox.height
//       }
//     })

//     const title = await page.evaluate(() => document.title)
//     console.log(title)

//         const price = await page.evaluate(() => document.querySelector('#corePrice_feature_div').textContent)
//     console.log(price)

//     await browser.close();
// }
// run()

// module.exports = {

//     run
      
//    }

//     {/* <textarea 
//                     type='text'
//                     placeholder='content'
//                     value={item_name}
//                     onChange={e => setItem_Name(e.target.value)}
//                     className='form-input add-post-input textarea'
//                 />
//                                 <textarea 
//                     type='text'
//                     placeholder='content'
//                     value={item_picture}
//                     onChange={e => setItem_Picture(e.target.value)}
//                     className='form-input add-post-input textarea'
//                 />                <textarea 
//                 type='text'
//                 placeholder='content'
//                 value={item_price}
//                 onChange={e => setItem_Price(e.target.value)}
//                 className='form-input add-post-input textarea'
//             /> */

//    'https://www.amazon.com/Nexxus-Shampoo-Conditioner-Keratin-Protein/dp/B09MRNFDYX/ref=pd_aw_ci_mcx_mh_pd_di_sccai_mh_cn_bw_sspa_ma_huc_pt_thematic_2?pd_rd_w=walVg&content-id=amzn1.sym.29a4cd40-6b7d-4bcc-840d-7a215a75f91f&pf_rd_p=29a4cd40-6b7d-4bcc-840d-7a215a75f91f&pf_rd_r=9C548RRT45WMC4J9S3AG&pd_rd_wg=8CyqO&pd_rd_r=a79b5a69-292b-43de-b6fa-d56de935d4d1&pd_rd_i=B09MRNFDYX'