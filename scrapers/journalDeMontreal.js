import got from 'got'
import jsdom from 'jsdom'
const { JSDOM } = jsdom
const url = "https://www.journaldemontreal.com/opinions/caricatures"
let cartoonURL

export async function getJdmImg() {
  try {
    const resPage1 = await got(url)
    const doc1 = new JSDOM(resPage1.body).window.document
    cartoonURL = doc1.querySelector(".cartoon-img > a").href

    const srcset = doc1.querySelector(".cartoon-img img").srcset
    let imageUrlString = srcset.split(',')[1].trim();
    
    let cleanImageUrl = `${imageUrlString.split("?")[0]}?impolicy=resize&width=1000` // remove query params, replace with simple resize

    return `
    <a href="${cartoonURL}">
      <h2>Journal de Montréal</h2>
    </a>
    <br>
    <img src="${cleanImageUrl}">
    `
    
  } catch (err) {
    console.log('@err: ', err)
    
    return `<p>Le Journal de Montréal ça chié...<a href="${cartoonURL}"> </a></p>`
  }
}