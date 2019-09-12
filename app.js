const express = require("express");
const app = express();
const http = require("http").createServer(app);
const path = require("path");
const io = require("socket.io")(http);

// Rotas =====================================

app.use(express.static(path.join(__dirname, "public_html")));
app.use(express.static(path.join(__dirname, "node_modules")));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
})

io.sockets.on("connection", socket => {
  sockets.userData = { x: 0, y: 0, z: 0, heading: 0 }; //Valores padrão

  console.log(`${socket.id} Conectou`);
  socket.emit("setId", { id: socket.id });

  socket.on("disconnect", () => {
    socket.broadcast.emit("deletePlayer", { id: socket.id });
  });

  socket.on("init", data => {
    console.log(`socket.init ${data.model}`);
    socket.userData.model = data.model;
    socket.userData.colour = data.colour;
    socket.userData.x = data.x;
    socket.userData.y = data.y;
    socket.userData.z = data.z;
    socket.userData.heading = data.h;
    socket.userData.pb = data.pb;
    socket.userData.action = "Idle";
  });

  socket.on("update", data => {
    socket.userData.x = data.x;
    socket.userData.y = data.y;
    socket.userData.z = data.z;
    socket.userData.heading = data.h;
    socket.userData.pb = data.pb;
    socket.userData.action = data.action;
  });
});

socket.on("chat message", data => {
  console.log(`chat message:${data.id} ${data.message}`);
  io.to(data.id).emit("chat messege", { id: socket.id, message: data.message });
});
http.listen(2019);
console.log("A magia acontece na porta 2019");


setInterval(() =>{
  const nsp = io.of('/');
  let pack = [];

  for(let id in io.sockets.sockets){
    const socket = nsp.connected[id];
    
    // Somente soquetes que foram inicializados

    if(socket.userData.model!==undefined){
      path.push({
        id: socket.id,
        model: socket.userData.model,
        colour: socket.userData.colour,
        x: socket.userData.x,
        y: socket.userData.y,
        z: socket.userData.z,
        heading:socket.userData.heading,
        pb: socket.userData.pb,
        action: socket.userData.action
      });
    }
  }
  if(pack.length> 0) io.emit('remoteData', pack);
},40);