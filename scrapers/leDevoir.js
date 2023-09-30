import got from 'got'
import jsdom from 'jsdom'
const { JSDOM } = jsdom
const url = "https://www.ledevoir.com"

export async function getDevoirImg() {
  try {
    const resPage1 = await got(url)
    const doc1 = new JSDOM(resPage1.body).window.document
    const cartoonUrl = doc1.querySelector(".caricature a").href
    const resPage2 = await got(cartoonUrl)
    const doc2 = new JSDOM(resPage2.body).window.document
    const img = doc2.getElementById("photo_courante").src
    
    return `
    <a href="${url}">
      <h2>Le Devoir</h2>
    </a>
    <br>
    <img src="${img}">
    <br>`
  } catch (err) {
    return "<p>Le Devoir ça chié...</p>"
  }
}