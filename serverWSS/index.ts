import * as path from "path";
const cors = require('cors')
const express = require('express')
const app = express()
const server = require('http').createServer(app)
const {instrument} = require('@socket.io/admin-ui')
const io = require('socket.io')(server,{
    cors:{
        origin: ['http://localhost:3000' , 'https://admin.socket.io'],
    }
})


server.listen(7000)
app.use(express.static(path.resolve("../" + "/build/frontend")));
app.use(cors())
app.get("*", (req:any, res:any): any => {
    res.sendFile(path.resolve("../") + "/build/frontend/index.html");
});


let users = [];
let connections:any[] = [];

io.on('connection', (socket:any)=> {
    console.log("Успешное подключение "+socket.id);
    
    connections.push(socket);

    socket.on('disconnect', function(data:any){
        connections.splice(connections.indexOf(socket),1)
        console.log("Успешное отсоединение");
    })

    socket.on('sendMessage', (data:any, rooms:any)=>{
       
        if(rooms === ''){
            socket.broadcast.emit('returnMessage', data)
        }
        else {
            socket.to(rooms).emit('returnMessage', data)
        }
       
    })
    socket.on('join-rooms', (rooms:any)=>{        
        socket.join(rooms)
    })
});

instrument(io,{
    auth:false
})