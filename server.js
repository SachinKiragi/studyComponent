require('dotenv').config();
const { log } = require('console');
const express = require("express");
const https = require("https");
const app = express();
const fs = require('fs');
app.use(express.static(__dirname))


const key = fs.readFileSync('cert.key');
const cert = fs.readFileSync('cert.crt');

const server =  https.createServer({key, cert}, app);

const socket = require("socket.io");
const io = socket(server, {
    cors: {
        origin: [
            // "https://localhost",
            "https://192.168.29.188"
        ],
        methods:["GET", "POST"]
    }
});

const users = {};

const socketToRoom = {};

io.on('connection', socket => {
    console.log("user joined");
    socket.on("join room", roomID => {
        if (users[roomID]) {
            const length = users[roomID].length;
            if (length === 4) {
                socket.emit("room full");
                return;
            }
            users[roomID].push(socket.id);
            console.log("user joining in live room");
            console.log("currnt user: ", socket.id);
            
            console.log("users, ", users);
            
        } else {
            console.log("user created room");
            users[roomID] = [socket.id];
            console.log("users, ", users);

        }
        socketToRoom[socket.id] = roomID;
        const usersInThisRoom = users[roomID].filter(id => id !== socket.id);

        socket.emit("all users", usersInThisRoom);
    });

    socket.on("sending signal", payload => {
        io.to(payload.userToSignal).emit('user joined', { signal: payload.signal, callerID: payload.callerID });
    });

    socket.on("returning signal", payload => {
        io.to(payload.callerID).emit('receiving returned signal', { signal: payload.signal, id: socket.id });
    });

    socket.on('disconnect', () => {
        const roomID = socketToRoom[socket.id];
        let room = users[roomID];
        if (room) {
            room = room.filter(id => id !== socket.id);
            users[roomID] = room;
        }
    });

});

server.listen(process.env.PORT || 8181, () => console.log('server is running on port 8181'));


