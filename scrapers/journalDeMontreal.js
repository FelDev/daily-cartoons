import got from 'got'
import jsdom from 'jsdom'
const { JSDOM } = jsdom
const url = "https://www.journaldemontreal.com/opinions/caricatures"

export async function getJdmImg() {
  try {
    const response = await got(url)
    const doc = new JSDOM(response.body).window.document
    const srcset = doc.querySelector("#landingSection .cartoon-item img").srcset
    let imageUrlString = srcset.split(',')[0].trim();

    let imageURL = new URL(imageUrlString);
    let searchParams = new URLSearchParams(imageURL.search);
    searchParams.set('width', '1000');
    imageURL.search = searchParams.toString();
    let newImageUrl = imageURL.toString();

    return `<h2>Journal de Montréal</h2>
    <br>
    <img src="${newImageUrl}">`
    
  } catch (err) {
    console.log('@err: ', err)
    
    return "<p>Le Journal de Montréal ça chié...</p>"
  }
}
