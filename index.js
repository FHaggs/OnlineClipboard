const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/home.html');
});

app.get('/:id', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});



io.on('connection', (socket) => {
    socket.on('joinRoom', (room) =>{
      socket.join(room);
      socket.on('chat message', (msg) => {
        io.to(room).emit('chat message', msg);
        //io.emit('chat message', msg);
      });

    });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});