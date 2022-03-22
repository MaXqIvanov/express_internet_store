import { interStore } from './../models/models';


class goodsController{

    

    async getAll(req:any, res:any){
        const goods = await interStore.findAll()
        return res.json(goods)
    }




}
module.exports = new goodsController();
