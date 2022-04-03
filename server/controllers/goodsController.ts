import { interStore, User } from './../models/models';

class goodsController{

    

    async getAll(req:any, res:any){
        try {
            let {limit, page} = req.query
            const {type} = req.params
            page = page || 1
            limit = limit || 6
            let offset = page * limit - limit 
            const goods = await interStore.findAndCountAll({limit, offset, where:{type:type}})
            return res.json(goods)
        } catch (error:any) {
            return res.json(error.message)   
        }
        
    }

    async getOne(req:any, res:any){
        try {
            const {id} = req.params
            const device = await interStore.findOne(
                {
                    where: {id},
                }
            )
            return res.json(device)
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


}
module.exports = new goodsController();
