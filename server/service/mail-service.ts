const nodemailer = require('nodemailer')

class MailService {
    transporter: any;
    constructor(){
        this.transporter = nodemailer.createTransport({
            host: 'smtp.yandex.ru',
            port:465,
            secure: true,
            auth: {
                user: 'maksivanov35@ya.ru',
                pass: process.env.PASS_MAIL
            }
        })
    }
    async sendMailAnyInform(to:any, link:any){
        await this.transporter.sendMail({
            from: 'maksivanov35@ya.ru',
            to: `${to}`,
            subject: 'Активация аккаунта '  + 'web-liter.ru',
            text: 'Активация аккаунта ',
            html: `
            <div>
            <h3>Web-Liter.ru<h3><br></br>
            Для подтверждения аккаунта перейдите по ссылке <br></br>
            <a href=http://localhost:5000/api/activate/${link}>http://localhost:5000/api/activate/${link}</a></div>
            `
          
        })
    }
}
module.exports = new MailService();