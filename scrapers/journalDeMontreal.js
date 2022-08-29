import got from 'got'
import jsdom from 'jsdom'
const { JSDOM } = jsdom
const url = "https://www.journaldemontreal.com/opinions/ygreck/page/1"

export async function getJdmImg() {
  const response = await got(url)
  const doc = new JSDOM(response.body).window.document
  const jdmImg = doc.querySelector(".story-img").src
  return jdmImg
}