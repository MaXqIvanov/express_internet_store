import { User } from './../models/models';
import { Messages } from "../models/models"
import axios from 'axios';
const bcrypt = require('bcryptjs');
const CapchaService  = require('../service/capcha-service');

class messagesController{
        async getAll(req:any, res:any){
            try {
                const id = req.params.id;
                let page = req.query.page
                let limit = req.query.limit
                limit = Number(limit) | 10
                if (page == null){
                    page = 1;
                }else page = Number(page)

                let offset = page * limit - limit
                const message = await Messages.findAndCountAll({limit, offset,
                    where: {idProods:id},
                    attributes: ['id', 'idProods', 'messages', 'imgPerson', 'namePerson', 'email', 'activation'],
                })

                return res.json(message)


            } catch (error:any) {
                return res.json(error.message)
            }

        }

        async createNewPost(req:any, res:any, next:any){
            try {
                const {id} = req.params
                const {idProods, messages, imgPerson, namePerson, email} = req.body

                const newMessages = await Messages.create({
                    idProods, messages, imgPerson, namePerson, email
                })


                return res.json(newMessages)
            } catch (error:any) {
                return res.json(error.message)
            }

        }
        async deletePost(req:any, res:any, next:any){
            try {
                const {password, email} = req.body
                const {id} = req.params
                const user = await User.findOne({
                    where: {email:email}
                })
                let bspasswordCheck:any = password && bcrypt.compareSync(password, user.password)
                if(bspasswordCheck==true){
                    const messages = await Messages.destroy({
                        where: {id:id}
                    })
                    return res.json(messages)
                }
                return res.json("false")

            } catch (error:any) {
                return res.json(error.message)
            }
        }

        async sendTelegram(req:any, res:any, next:any){
            try {

                  const {messageTeleg, token} = req.body
                  let capcha:any = false;
                //  ЗАДЕПЛОИТЬ В PHP!!!
                 try {
                    capcha = await CapchaService.capchaResponseFunc(token)
                 } catch (error) {
                     capcha = true
                 }
                if(capcha === true){

                    const telegram = await axios.post(`https://api.telegram.org/bot${process.env.REACT_APP_TELEGRAMM_TOKEN1}/sendMessage?chat_id=${process.env.REACT_APP_TELEGRAMM_ID}&parse_mode=html&text=${encodeURIComponent(messageTeleg)}`).then((data:any)=>{
                    })
                    return res.json({"message":"Спасибо за вашу помощь"})
                }
                else return res.json({"message":"К сожалению отправить сообщение не получилось"})

            } catch (error:any) {
                return res.json(error.message)
            }
        }


}
module.exports = new messagesController()
