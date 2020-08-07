const express = require('express')
const socketio = require('socket.io')
const Room = require('./room')
const Client = require('./client')
const http = require('http')

const PORT = process.env.PORT || 5000
const router = require('./router')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const rooms = new Map

function createId(len = 6, chars = 'abcdefghjkmnopqrstwxyz0123456789')
{
    let id = '';
    while (len--)
    {
        id += chars[Math.random() * chars.length | 0];
    }
    return id;
}

function createRoom(id = createId())
{
    const room = new Room(id);
    console.log('creating room', room);
    rooms.set(id, room);
    return room;
}

io.on('connect', (socket) => {
    console.log('we have a new connection')
    const client = new Client(socket.id)

    socket.on('join', ({name, room}, callback) => {
        console.log("client Name " + client.name + " name " + name + " room " + room)
        if (client.name === name)
            callback({error: "duplicated socket"})
        else {
            if (!room) {
                room = createId()
                callback({costumRoom: room});
            }
    
            client.name = name
            activeRoom = rooms.get(room)
            if (!activeRoom)
                activeRoom = createRoom(room)
            activeRoom.join(client)
            .then(res => {
                let admin = activeRoom.getRoomAdmin()
                socket.emit('message', {user: admin.name, text: `${client.name} welcome to the room ${activeRoom.id}`})
                socket.broadcast.to(activeRoom.id).emit('message', {user: admin.name, text: `${client.name} has joined`})
                socket.join(activeRoom.id)
        
                io.to(activeRoom.id).emit('roomData', {room: activeRoom.id, users: [...activeRoom.clients]})
                callback({success: 'weclcome budy'})
            })
            .catch(error => {
                callback({error})
            })
        }
    })

    socket.on('sendMessage', (message, callback) => {
        if (client) {
            io.to(client.room.id).emit('message', {user: client.name, text: message})
            io.to(client.room.id).emit('roomData', {room: client.room.id, users: [...client.room.clients]})
        }

        callback()
    })

    socket.on('disconnect', () => {
        console.log('User had left !!!');
        const room = client.room
        
        if (room) {
            room.leave(client)
            if (room.clients.size === 0)
            {
                rooms.delete(room.id);
            } else {
                let admin = room.getRoomAdmin()
                if (client.admin) {
                    admin = room.nextRoomAdmin()
                    console.log(admin)
                    io.to(room.id).emit('message', {user: admin.name, text: `new room admin is ${admin.name}.`})
                }
                io.to(room.id).emit('message', {user: admin.name, text: `${client.name} has left.`})
                io.to(room.id).emit('roomData', {room: room.id, users: [...room.clients]})
            }
        }
    })
})

app.use(router)

server.listen(PORT, () => console.log(`server has started on port ${PORT}`))