import { interStore } from './../models/models';


class goodsController{

    

    async getAll(req:any, res:any){
        try {
            let {limit, page} = req.query
            page = page || 1
            limit = limit || 4
            let offset = page * limit - limit 
            const goods = await interStore.findAndCountAll({limit, offset})
            return res.json(goods)
        } catch (error) {
            console.log(error);    
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


}
module.exports = new goodsController();
