const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');
const {addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const app = express();
const PORT =process.env.PORT || 5000;
const server = http.createServer(app);
const io = socketio(server);

io.on('connection',(socket)=>{
    console.log("We have a new connection!");

    socket.on('join', ({name,room},callback)=>{
        const {error,user} = addUser({id:socket.id, name,room});
        if(error){
            return callback(error);
        }
        //messages sent by admin
        socket.emit('message', {user: 'admin', text:`${user.name}, welcome to the${user.room}`})
       
        socket.broadcast.to(user.room).emit('message',{user:'admin', text:`${user.name}, has joined!`});
        socket.join(user.room);

        io.to(user.room).emit('roomData',{room:user.room, users: getUsersInRoom(user.room)})
        callback();
    })
    //messages received from user
    socket.on('sendMessage', (message,callback)=>{
        const user = getUser(socket.id);
        io.to(user.room).emit('message',{user:user.name, text:message});

        io.to(user.room).emit('roomData',{room:user.room, users: getUsersInRoom(user.room)});

        callback();
    })
    socket.on('disconnect', ()=>{
        const user = removeUser(socket.id);
        if(user){
            io.to(user.room).emit('message',{user:'admin', text:`${user.name} has left.`})
        }
    })
})
const router = require('./router');

app.use(router);
app.use(cors());
server.listen(PORT, ()=>console.log(`Server has started on port = ${PORT}`));