const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
  },
});

let clientCount = 0;

app.get("/", (req, res) => {
  res.send("Backend is running...");
});

io.on("connection", (socket) => {
  clientCount++;
  console.log(`Client connected (${clientCount} active users)`);

  const sendData = () => {
    const fakeData = {
      speed: Math.floor(Math.random() * 100),
      battery: Math.floor(Math.random() * 100),
      fuel: Math.floor(Math.random() * 50),
      braking: Math.random() > 0.5,
    };

    console.log("Sending Data:", fakeData);
    io.emit("realTimeData", fakeData); // Emit to all clients

    setTimeout(sendData, 5000); // Slower interval (5 seconds)
  };

  sendData(); // Start sending data

  socket.on("disconnect", () => {
    clientCount--;
    console.log(`Client disconnected (${clientCount} active users)`);
  });
});

server.listen(5000, () => {
  console.log("✅ Server running on http://localhost:5000");
});
