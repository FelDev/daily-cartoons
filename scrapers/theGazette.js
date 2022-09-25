import got from 'got'
import jsdom from 'jsdom'
const { JSDOM } = jsdom
const urlStart = "https://montrealgazette.com"
const url = `${urlStart}/category/opinion/`
const gotOptions = {
  headers: {
    'user-agent': undefined
  }
}

export async function getGazetteImg() {
  try {
    const resPage1 = await got(url, gotOptions)
    const doc1 = new JSDOM(resPage1.body).window.document
    const cartoonUrl = doc1.querySelector("#secondary-nav > div > ul > li:nth-child(1) > a").href
    const resPage2 = await got(`${urlStart}${cartoonUrl}`, gotOptions)
    const doc2 = new JSDOM(resPage2.body).window.document
    const img = doc2.querySelector("#main-content > article > div.gallery-block > div.gallery.gallery-- > ol > li:nth-child(1) > figure > picture > img").src
    
    return `<h2>The Gazette</h2>
    <br>
    <img src="${img.replace(/\?.+/, '')}">
    <br>`
  } catch (err) {
    return "<p>The Gazette ça chié...</p>"
  }
}
