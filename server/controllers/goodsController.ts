import { Basket, interStore, User } from './../models/models';
const bcrypt = require('bcryptjs');
class goodsController{

    

    async getAll(req:any, res:any){
        try {
            let {limit, page, sort} = req.query
            const {type} = req.params
            page = page || 1
            limit = Number(limit) || 6
            let offset = page * limit - limit 
            if(String(sort) == "true"){
                const goods = await interStore.findAndCountAll({limit, offset, order: [
                    ['price', 'ASC'],
                ], where:{type:type}})
              
                return res.json(goods)
            }
            const goods = await interStore.findAndCountAll({limit, offset, where:{type:type}})
            return res.json(goods)
           
        } catch (error:any) {
            return res.json(error.message)   
        }
        
    }

    async create(req:any, res:any){
        try {
            const {name, description, price, url, type, email, password} = req.body
            const role = await User.findOne(
                {
                    where: {email},
                    attributes: ['role','password'],
                }
            )
            let bspasswordCheck:any = password && bcrypt.compareSync(password, role.password)
            if(role.role == 'ADMIN' && bspasswordCheck){
                const device = await interStore.create({
                    name, description, price, url, type
                })
                return res.json(device)
            }
            else if(bspasswordCheck==false){
                return res.json("Вы ввели не правильный пароль")
            }
           
            return res.json("Вы не обладаите правами доступа")
        } catch (error:any) {
            return res.json(error.message)
            
        }
       
    }

    async setRaiting(req:any, res:any, next:any){
        try {
            const id = req.params.id;
            const {email, nameProods} = req.body
            const old = await interStore.findOne(
                {
                    where: {id},
                    attributes: ['raiting'], //object
                },
              
            )
            const user = await User.findOne(
                {
                    where: {email},
                    attributes: ['voited'], //object
                }
            )
            if(user.voited == null){
                user.voited = ""
            }
            let arrayOld:any = user.voited.split(",")
            let filter = arrayOld.find((elem:any)=> elem == nameProods)

            if(filter){
                return res.json(false)
            }else {
                if((JSON.stringify(req.body).includes("raiting")) &&  (JSON.stringify(req.body).includes("auth"))){
                    let n = String(req.body.raiting +","+ old.raiting)
                    const device = await interStore.update({"raiting": n}, {
                        where: { id: id }
                      })
                      return res.json(old.raiting)
                }
                else return res.json(false)
            }

           

            

        } catch (error) {
            next(console.log(error)
            )
        }
       
    }

    async deleteOne(req:any, res:any){
        try {
            const {id} = req.params
            const {email, password} = req.body
            const role = await User.findOne(
                {
                    where: {email},
                    attributes: ['role','password'],
                }
            )
            let bspasswordCheck:any = password && bcrypt.compareSync(password, role.password)
            if(role.role == 'ADMIN' && bspasswordCheck){
                const device = await interStore.destroy({
                    where: {id}
                })
                return res.json(device)
            }
            else if(bspasswordCheck==false){
                return res.json({message:"Вы ввели не правильный пароль"})
            }
           
            return res.json({message:"Вы не обладаите правами доступа"})

        } catch (error:any) {
            return res.json(error.message)   
        }
    }


}
module.exports = new goodsController();
