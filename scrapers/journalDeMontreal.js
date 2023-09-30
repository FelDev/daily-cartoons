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
    let cleanImageUrl = `${imageUrlString.split("?")[0]}?impolicy=resize&width=1000` // remove query params, replace with simple resize
    // let imageURL = new URL(imageUrlString);
    // let searchParams = new URLSearchParams(imageURL.search);
    // searchParams.set('width', '1000');
    // imageURL.search = searchParams.toString();
    // let newImageUrl = imageURL.toString();

    return `
    <a href="${url}">
      <h2>Journal de Montréal</h2>
    </a>
    <br>
    <img src="${cleanImageUrl}">
    `
    
  } catch (err) {
    console.log('@err: ', err)
    
    return "<p>Le Journal de Montréal ça chié...</p>"
  }
}
