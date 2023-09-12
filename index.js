import { send } from './mailer.js'
import { getJdmImg } from './scrapers/journalDeMontreal.js'
import { getSoleilImg } from './scrapers/leSoleil.js'
import { getDevoirImg } from './scrapers/leDevoir.js'
import { getXkcdImg } from './scrapers/xkcd.js'
import { getPresseImg } from './scrapers/laPresse.js'

const handler = async () => {
  console.log(`@doing it...`)
  try {
    const [jdmImg, soleilImg, devoirImg, xkcdImg, presseImg] = await Promise.all([
      getJdmImg(),
      getSoleilImg(),
      getDevoirImg(),
      getXkcdImg(),
      getPresseImg(),
  ]);
    console.log('jdmImg: ', jdmImg)
    console.log('soleilImg: ', soleilImg)
    console.log('devoirImg: ', devoirImg)
    console.log('xkcdImg: ', xkcdImg)
    console.log('presseImg: ', presseImg)

    let emailHTML = `
      Voici ton email: 
      <br>
      ${devoirImg}
      ${jdmImg}
      ${soleilImg}
      ${xkcdImg}
      ${presseImg}
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

handler() // local / github actions style
// export { handler }; // AWS Lambda style