import { User } from './../models/models';
module.exports =async function(req:any, res:any, next:any){
    if(req.method === 'OPTIONS'){
        next()
    }
    try {
        const {email} = req.body 

        const users = await User.findOne(
            {
                where: {email},
            }
        )
        if(String(users.role) == "ADMIN"){
            req.users = users
            req.email = email
            next()
        }
        else return res.json({message:'У вас нет доступа к этой странице'})
        
       
    } catch (error) {
        return res.json({message:'Вы не авторизованы на сайте'})
    }

}