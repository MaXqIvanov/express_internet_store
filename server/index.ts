import express from 'express'
import * as path from "path";
require('dotenv').config()
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const router = require('./Routes/routes')


const app = express() 
const PORT = process.env.PORT || 5000

app.use(express.static(path.resolve("../" + "/build/frontend")));
app.use(cors())
app.use(express.json())
app.use('/api', router)

// app.get('/', (req, res)=>{
//     res.sendFile(path.resolve(__dirname , 'index.html'))
// })
// app.get("/api", (req:any, res:any): void => {
//     res.status(200).json({message: {"name": "valera", "age" : 20}})
// });

app.get("*", (req:any, res:any): any => {
    res.sendFile(path.resolve("../") + "/build/frontend/index.html");
});


const start = async () =>{
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`))
    } catch (error) {
        console.log(error);
    }

}


start()