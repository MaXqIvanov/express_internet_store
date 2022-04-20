import { User } from './../models/models';
const CapchaService  = require('../service/capcha-service');
const bcrypt = require('bcryptjs');
const MailService = require('../service/mail-service')
const uuid = require('uuid')
class UserController {



    async getOne(req: any, res: any) {
        try {
            // const emailParams = req.params.email;
            const {email} = req.body
            const users = await User.findOne(
                {
                    where: { email },
                    attributes: ['email', 'activation'], //object
                },

            )
            return res.json(users)
        } catch (error) {
           return res.json("false")

        }

    }

    async createNew(req: any, res: any, next: any) {
        try {
            const { email, password, role, token } = req.body

            const old = await User.findOne(
                {
                    where: { email },
                    attributes: ['email', 'password', 'id'], //object
                },

            )
            let zagl: any = old && old.email
            let pass: any = old && old.password
            let bcpassword = bcrypt.hashSync(password, 7)
            let bspasswordCheck: any = old && bcrypt.compareSync(password, old.password)
            if (String(zagl) !== String(email)) {
                let capcha:any = false;
                 // ЗАДЕПЛОИТЬ В PHP!!!
                capcha = await CapchaService.capchaResponseFunc(token)
                if(capcha === true){
                    const activationLink = uuid.v4();
                    await MailService.sendMailAnyInform(email, activationLink)
                    const device = await User.create({
                        email, 'password': bcpassword, 
                        verification: activationLink
                    })
                    return res.json(device)
                } else return res.json("false")
            }
            else if ((String(zagl) == String(email)) && (bspasswordCheck)) {
                let obj = { email: old.email, id: old.id }
                return res.json(obj)
            }
            else return res.json("false")



        } catch (error: any) {
            return res.json(error.message)
        }
    }

    async setRaitingProod(req: any, res: any, next: any) {
        try {


            const id = req.params.id;
            const { email, nameProods } = req.body

            const old: any = await User.findOne(
                {
                    where: { email },
                    attributes: ['voited'], //object
                },

            )
            if (old.voited == null) {
                old.voited = ""
            }
            let arrayOld: any = old.voited.split(",")
            let filter = arrayOld.find((elem: any) => elem == nameProods)
            if (filter) {
                return res.json(false)
            } else {
                let summ: any = String(nameProods + "," + old.voited)
                const device = await User.update({ "voited": summ }, {
                    where: { email: email }
                })
                return res.json(device)
            }


        } catch (error: any) {
            return res.json(error.message)
        }
    }

    async setActivated (req:any , res:any, next:any){
        try {
            let verification = req.params.link
            const old: any = await User.findOne({
                where: { verification },
                attributes: ['verification','activation'],
            })
            if(verification === old.verification){
                old.activation = true
                const newAct:any = await User.update({
                    'activation' : 1
                }, {
                    where: { verification }
                })
                return res.redirect('http://127.0.0.1:3000/')
            }
            return res.redirect('http://127.0.0.1:3000/?activate=false')
            // return  res.redirect('http://127.0.0.1:3000/')
        } catch (error:any) {
            return res.json(error.message)
        }
    }


}
module.exports = new UserController();
