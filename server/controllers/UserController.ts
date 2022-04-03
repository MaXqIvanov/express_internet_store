import { User } from './../models/models';


class UserController{

    

    async getOne(req:any, res:any){
        try {
            const id = req.params.id;
            const users = await User.findOne(
                {
                    where: {id},
                    attributes: ['email'], //object
                },
              
            )
            return res.json(users)
        } catch (error) {
            console.log(error);    
        }
        
    }

    async createNew(req:any, res:any, next:any){
        try {
            const {email, password, role} = req.body

            const old = await User.findOne(
                {
                    where: {email},
                    attributes: ['email'], //object
                },
              
            )
            let zagl:any = old && old.email
                if(String(zagl) !== String(email)){
                    const device = await User.create({
                        email, password
                    })
                    return res.json(device)
                }
                else return res.json("false")
           
            
            
        } catch (error:any) {
            return res.json(error.message)
        }
    }

    async setRaitingProod(req:any, res:any, next:any){
        try {
            

            const id = req.params.id;
            const {email, nameProods} = req.body

            const old:any = await User.findOne(
                {
                    where: {email},
                    attributes: ['voited'], //object
                },
              
            )
            if(old.voited == null){
                old.voited = ""
            }
            let arrayOld:any = old.voited.split(",")
            let filter = arrayOld.find((elem:any)=> elem == nameProods)
            if(filter){
                return res.json(false)
            }else {
                let summ:any = String(nameProods +","+ old.voited)
                const device = await User.update({"voited": summ}, {
                    where: { email: email }
                  })
                  return res.json(device)
            }
            
            
        } catch (error:any) {
            return res.json(error.message)
        }
    }
  


}
module.exports = new UserController();
