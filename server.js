const express = require('express');
const app = express();
const http= require('http')
const socketio = require('socket.io')
const SERVER_PORT = process.env.PORT || 5555;

const server = http.createServer(app);
const io = socketio(server)
users = {
    'admin':'admin',
}

socketmap = {}

io.on('connection',(socket)=>{
    console.log('Connected with socket id= '+socket.id);

    function loggin(s,u)
    {
        s.join(u)
        s.emit('logged_in')
        socketmap[s.id]=u
        console.log(socketmap)
    }

    socket.on('login',(data) => {
        if(users[data.username])
        {
            if(users[data.username]==data.password)
            {
                loggin(socket,data.username)
            }
            else
            {
                socket.emit('login_failed')
            }
        }
        else
        {
            users[data.username]=data.password
            loggin(socket,data.username)
        }
        
        console.log(users)
    })

    socket.on('msg_send',(data) => {
        data.from = socketmap[socket.id]
        if(data.to)
        {
            io.to(data.to).emit('msg_rcvd',data)
        }
        else
        {
            socket.broadcast.emit('msg_rcvd',data)
        }
    })
})

app.use('/',express.static(__dirname+'/public'))
server.listen(SERVER_PORT, ()=> {
    console.log("http://localhost:5555");
})