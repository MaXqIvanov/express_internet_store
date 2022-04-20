
import axios from 'axios'
class CapchaService {
    
    newCapcha:any;
    constructor() { 
        this.newCapcha;
    }

    async capchaResponseFunc(token:any){
        
        const capchResponse = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHAV2}&response=${token}`).then((response:any)=>{
            this.newCapcha = response.data.success
           
        })
        return this.newCapcha ;
        
    }
   
}

module.exports = new CapchaService();