const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const cors = require('cors')
const schema = require('./schema')
const users:any = [{id:1, username:'Vasya', age:25},
{
    id:2, username: 'Gena', age:32
}]
const app = express()
app.use(cors())


const root = {
    getAllUsers: ()=>{
        return users
    },
    getUser:({id}:any)=>{
        return users.find((user:any) => user.id == id) 
    },
    createUser:({input}:any)=>{
        const id = Date.now()
        const user = {id, ...input}
        users.push(user)
        return user
    }
}

app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: root
}))

app.listen(8000, ()=> console.log('server has been started Port 8000')
)