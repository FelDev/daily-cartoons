import got from 'got'
import jsdom from 'jsdom'
const { JSDOM } = jsdom
const url = "https://www.lapresse.ca/debats/caricatures/"

export async function getPresseImg() {
  try {
    const resPage1 = await got(url)
    const doc1 = new JSDOM(resPage1.body).window.document
    const cartoonUrl = doc1.querySelector(".mostRecentCard a").href
    const resPage2 = await got(cartoonUrl)
    const doc2 = new JSDOM(resPage2.body).window.document
    const img = doc2.querySelector(".photoModule__visual").src

    return `
    <a href="${url}">
      <h2>La Presse</h2>
    </a>
    <br>
    <img src="${img}">
    <br>`
  } catch (err) {
    return "<p>La Presse ça chié...</p>"
  }
}
