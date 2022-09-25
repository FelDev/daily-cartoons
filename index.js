import { send } from './mailer.js'
import { getJdmImg } from './scrapers/journalDeMontreal.js'
import { getSoleilImg } from './scrapers/leSoleil.js'
import { getDevoirImg } from './scrapers/leDevoir.js'
import { getXkcdImg } from './scrapers/xkcd.js'
import { getPresseImg } from './scrapers/laPresse.js'
import { getGazetteImg } from './scrapers/theGazette.js'

const handler = async () => {
  console.log(`@doing it...`)
  try {
    const [jdmImg, soleilImg, devoirImg, xkcdImg, presseImg, gazetteImg] = await Promise.all([
      getJdmImg(),
      getSoleilImg(),
      getDevoirImg(),
      getXkcdImg(),
      getPresseImg(),
      getGazetteImg(),
  ]);
    console.log('jdmImg: ', jdmImg)
    console.log('soleilImg: ', soleilImg)
    console.log('devoirImg: ', devoirImg)
    console.log('xkcdImg: ', xkcdImg)
    console.log('presseImg: ', presseImg)
    console.log('gazetteImg: ', gazetteImg)

    let emailHTML = `
      Voici ton email: 
      <br>
      ${devoirImg}
      ${jdmImg}
      ${soleilImg}
      ${xkcdImg}
      ${presseImg}
      ${gazetteImg}
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