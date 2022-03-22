
import { Basket } from './../models/models';


class basketController{

    async create(req:any, res:any, next:any){
        try {
            const {name, price, description, url, trueid} = req.body
            const device = await Basket.create({
                name,price, description, url, trueid
            })
            
            return res.json(device)
        } catch (error) {
            next(console.log(error)
            )
        }
    }

    async getAll(req:any, res:any){
        const goods = await Basket.findAll()
        return res.json(goods)
    }
    async getOne(req:any, res:any){
        const {id} = req.params
        const device = await Basket.findOne(
            {
                where: {id},
            }
        )
        return res.json(device)
    }
    

    async removes(req:any, res:any, next:any){
        try {
           const {id} = req.params;

           const device = await Basket.destroy({
            where: { id: id }
          })
         return res.json(req.body)
        } catch (error) {
            next(console.log(error))
        }
       
    }

    async updates(req:any, res:any, next:any){
            
        try {
            const id = req.params.id;
            const device = await Basket.update(req.body, {
              where: { id: id }
            })
        
            return res.json(device)

        } catch (error) {
            next(console.log(error)
            )
        }
    }



}
module.exports = new basketController();
