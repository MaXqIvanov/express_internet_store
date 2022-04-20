import { User } from './../models/models';

class adminController{

    

    async getAll(req:any, res:any){
        try {

                return res.json(req.users)
           
        } catch (error) {
            return "false"
        }

 


}
}
module.exports = new adminController();
