import got from 'got'
import jsdom from 'jsdom'
const { JSDOM } = jsdom
const url = "https://www.lesoleil.com/opinions/caricatures"

export async function getSoleilImg() {
  try {
    const response = await got(url)
    const doc = new JSDOM(response.body).window.document
    const img = doc.querySelector(".promo-image img").src
    
    return `<h2>Le Soleil</h2>
    <br>
    <img src="${img}">`
      
  } catch (err) {
    return "<p>Le Soleil ça chié...</p>"
  }
}
