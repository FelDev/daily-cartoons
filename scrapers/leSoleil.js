import got from 'got'
import jsdom from 'jsdom'
const { JSDOM } = jsdom
const url = "https://www.lesoleil.com/opinions/caricatures"

export async function getSoleilImg() {
  const response = await got(url)
  const doc = new JSDOM(response.body).window.document
  const jdmImg = doc.querySelector("._full-article-cartoon_145kag img").src

  return jdmImg
}