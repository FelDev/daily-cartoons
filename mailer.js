import 'dotenv/config'
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export async function send (emailHTML) {
  try {
    const msg = {
      to: process.env.EMAIL_TO,
      from: process.env.EMAIL_FROM,
      subject: "Daily_Cartoons",
      text: emailHTML,
      html: emailHTML,
    }
    await sgMail.send(msg)
    return "success"
  } catch (err) {
    console.log('@err mailer.js: ', err)
  }
}