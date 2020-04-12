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

    //SET USER
    socket.on("set user", (nickname) => {
        console.log("Recebendo novo usuário: ",nickname);
        socket.nickname = nickname;
        io.emit("userReady", nickname);
    });


    //CREATE and JOIN ROOM
    socket.on('createRoom', lista => {
        console.log('LISTA => ', lista)
        socket.join(lista[0])
        io.emit('createRoom', `sala criada: ${lista}`)
        io.sockets.in(lista[0]).emit('connectedToRoom', `u are in ${lista[0]} room`)
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