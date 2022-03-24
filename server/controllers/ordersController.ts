import { Orders } from './../models/models';


class ordersController{

    

    async getAll(req:any, res:any){
        try {
            const goods = await Orders.findAndCountAll()
            return res.json(goods)
        } catch (error) {
            console.log(error);    
        }
        
    }

    async create(req:any, res:any, next:any){
        try {
            const {name, price, namePerson, telPerson} = req.body
            const device = await Orders.create({
                name,price,namePerson, telPerson
            })
            
            return res.json(device)
        } catch (error:any) {
            return res.json(error.message)
        }
    }




}
module.exports = new ordersController();
