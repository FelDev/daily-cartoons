import got from 'got'
import jsdom from 'jsdom'
const { JSDOM } = jsdom
const url = "https://xkcd.com/"

export async function getXkcdImg() {
  const d = new Date().getDay()
  if (d !== 1 && d !== 3 && d !== 5) {
    // updates every monday, wednesday and friday
    return ""
  }
  const response = await got(url)
  const doc = new JSDOM(response.body).window.document
  const xkcdImg = doc.querySelector("#comic img").src
  const xkcdImgClean = xkcdImg.replace("//", "https://")
  return `<p>xkcd</p>
  <br>
  <img src="${xkcdImgClean}">`
}