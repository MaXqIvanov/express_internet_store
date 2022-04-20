import { User } from './../models/models';
import { Messages } from "../models/models"
const bcrypt = require('bcryptjs');
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


}
module.exports = new messagesController()