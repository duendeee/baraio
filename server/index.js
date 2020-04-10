const Koa = require('koa')
const http = require('http')
const socket = require('socket.io')

const app = new Koa()
const server = http.createServer(app.callback())
const io = socket(server)

const SERVER_HOST = 'localhost'
const SERVER_PORT = 8080

var totalUsers = 0;
var rooms = []

io.on("connection", socket => {
    const { id } = socket.client;
    ++totalUsers;
    console.log(`User Connected: ${id}`);
    console.log(`Total Users Connected: ${totalUsers}`);

    //SEND MESSAGE
    socket.on("chat message", ({ nickname, msg }) => {
        console.log(`[*] ${nickname}: ${msg}`);
        io.emit("chat message", { nickname, msg });
    });


    //CREATE ROOM
    socket.on('createRoom', roomName => {
        console.log('[SOCKET] createRoom => ', roomName)
        io.emit('createRoom', roomName)
    })

    //JOIN ROOM
    socket.on('joinRoom', roomNameToJoin => {
        console.log('joining room', roomNameToJoin)
        socket.join(roomNameToJoin)
        io.sockets.in(roomNameToJoin).emit('connectedToRoom', `u are in ${roomNameToJoin} room`)
    })

    

    socket.on("disconnect", () => {
        --totalUsers;
        console.log(`User Disconnected: ${id}`);
        console.log(`Total Users Connected: ${totalUsers}`);
    });
});


server.listen(SERVER_PORT, SERVER_HOST, () => {
    console.log(`[HTTP] Listen => Server is running at http://${SERVER_HOST}:${SERVER_PORT}`)
})