import {Server} from 'socket.io'
import http from 'http'
import express from 'express'

const app=express();
const server=http.createServer(app);

const io=new Server(server,{
  cors:{
    origin:['http://localhost:5173','http://localhost:5174']
  }
})

function getReceiverSocketId(userId){
  return userSocketMap[userId]
}


const userSocketMap={} //userId:socketId
io.on('connection',(socket)=>{

  console.log("User connected : ",socket.id);

  const userId=socket.handshake.query.userId;

  if(userId) userSocketMap[userId]=socket.id;

  socket.emit('getOnlineUsers',Object.keys(userSocketMap))

  socket.on('disconnect',()=>{
    console.log("User disconnected : ",socket.id)
    delete userSocketMap[userId]
  })
})

export{
  io,
  server,
  app,
  getReceiverSocketId
}