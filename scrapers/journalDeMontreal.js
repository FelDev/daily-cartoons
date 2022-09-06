import got from 'got'
import jsdom from 'jsdom'
const { JSDOM } = jsdom
const url = "https://www.journaldemontreal.com/opinions/ygreck/page/1"

export async function getJdmImg() {
  try {
    const response = await got(url)
    const doc = new JSDOM(response.body).window.document
    const img = doc.querySelector(".story-img").src
    
    return `<h2>Journal de Montréal</h2>
    <br>
    <img src="${img}">`
    
  } catch (err) {
    return "<p>Le Journal de Montréal ça chié...</p>"
  }
}