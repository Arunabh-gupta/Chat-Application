const express = require("express")
const app = express()
const http = require("http")
const cors = require("cors")
const server = http.createServer(app)
const { Server } = require("socket.io");

const io = new Server(server, {
    cors:{
        origin: "http://localhost:3000",
        methods: ["GET","POST"]
    }
});

io.on('connection', (socket) => {
    // when a user connects to this server we refer to them as a socket
    console.log(socket.id + " connected");
    
    // Creates a event listener which listenes to "Join_Room" event which is emmited in the frontend
    socket.on("Join_Room", (data)=>{
        socket.join(data);
        console.log(`User connected: ${socket.id} in Room: ${data}`)
    })

    // Creates an event listener which listenes to the event "send_message" which is emmited in the frontend
    socket.on("send_message", (data) => {
        console.log(data);
        socket.to(data.room).emit("recieve_message", data);
        
    })


    // this function is called when a socket/user disconnects. Ex: closing a tab, or just leaving the server for any other reason
    socket.on('disconnect', () => {
        console.log(socket.id + " disconnected")
    })
})

app.use(cors())
const PORT = 8000;
server.listen(PORT, ()=>{
    console.log("Server is running")
})

