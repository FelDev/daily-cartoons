import got from 'got'
import jsdom from 'jsdom'
const { JSDOM } = jsdom
const baseURL = "https://www.lesoleil.com"
const baseCartoonURL =`${baseURL}/opinions/caricatures`

export async function getSoleilImg() {
  try {
    const resPage1 = await got(baseCartoonURL)
    const doc1 = new JSDOM(resPage1.body).window.document
    const cartoonUrl = doc1.querySelector("div.promo-image > a").href
    const resPage2 = await got(`${baseURL}${cartoonUrl}`)
    const doc2 = new JSDOM(resPage2.body).window.document
    const img = doc2.querySelector(".lead-art-wrapper img").src
    
    return `
    <a href="${baseCartoonURL}">
      <h2>Le Soleil</h2>
    </a>
    <br>
    <img src="${img}">`
      
  } catch (err) {
    return "<p>Le Soleil ça chié...</p>"
  }
}