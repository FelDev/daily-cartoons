import got from 'got'
import jsdom from 'jsdom'
const { JSDOM } = jsdom
const url = "https://www.lesoleil.com/opinions/caricatures"

export async function getSoleilImg() {
  try {
    const resPage1 = await got(url)
    const doc1 = new JSDOM(resPage1.body).window.document
    const cartoonUrl = doc1.querySelector("div.promo-image > a").href
    const resPage2 = await got(`https://www.lesoleil.com${cartoonUrl}`)
    const doc2 = new JSDOM(resPage2.body).window.document
    const img = doc2.querySelector(".lead-art-wrapper img").src
    
    return `<h2>Le Soleil</h2>
    <br>
    <img src="${img}">`
      
  } catch (err) {
    return "<p>Le Soleil ça chié...</p>"
  }
}