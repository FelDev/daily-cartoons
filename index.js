import { send } from './mailer.js'
import { getJdmImg } from './scrapers/journalDeMontreal.js'
import { getSoleilImg } from './scrapers/leSoleil.js'
import { getDevoirImg } from './scrapers/leDevoir.js'
import { getXkcdImg } from './scrapers/xkcd.js'

const handler =  async () => {
  console.log(`@doing it...`)
  try {
    // #TODO promise.all()
    const jdmImg = await getJdmImg()
    const soleilImg = await getSoleilImg()
    const devoirImg = await getDevoirImg()
    const xkcdImg = await getXkcdImg()
    console.log('jdmImg: ', jdmImg)
    console.log('soleilImg: ', soleilImg)
    console.log('devoirImg: ', devoirImg)
    console.log('xkcdImg: ', xkcdImg)

    let emailHTML = `
      Voici ton email: 
      <br>
      ${devoirImg}
      ${jdmImg}
      ${soleilImg}
      ${xkcdImg}
      <br>
      -Félix
    `
    const emailRes = await send(emailHTML)
    console.log('@emailRes: ', emailRes)
  } catch (err) {
    console.log(`@ERREUR`)
    console.log('@err: ', err)
  }
}

export { handler };