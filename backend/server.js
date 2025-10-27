const express = require("express");
const http = require("http");
const app = express();
const { Server } = require("socket.io");
const cors=require('cors');
const server = http.createServer(app);

app.use(cors());
const io = new Server(server, {
  cors: {
    origin: "https://simplechat-rjbc.onrender.com",  
    methods: ["POST", "GET"],
  },
});

io.on("connection", (socket) => {
  console.log(`client ${socket.id} is connected`);

    socket.on("Join_Room",(data)=>{
        socket.join(data)
        console.log(`client ${socket.id} is Joined to the room ${data}`)
    })

    socket.on("send_message",(data)=>{  //rceive the user sending message 
        socket.to(data.room).emit("receivemessage",data) //send thte specific message to the specific client who join to specific room
    })

  socket.on("disconnect", () => {
    console.log(`client ${socket.id} is disconnected.`);
  });
});

server.listen(4000, () => {
  console.log("server is listing in the port 4000");
});
