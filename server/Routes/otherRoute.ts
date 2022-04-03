const Routers = require('express')
const otherRouter = new Routers


// other code:
otherRouter.post("/trainer", async(req:any, res:any) => {
    try {
        const {math, gogo} = req.body
        res.status(200).json({math, gogo})
    } catch (error:any) {
     res.json(error.message)
        
    }
  
})

module.exports = otherRouter