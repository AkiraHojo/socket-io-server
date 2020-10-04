import * as express from "express";
import * as http from "http";
import * as socketIo from "socket.io";

import * as index from "./routes/index";

const port = process.env.PORT || 4001;
const app: express.Express = express();
app.use(index);

const server: http.Server = http.createServer(app);
const io: socketIo.Server = socketIo(server);

io.on("connection", (socket: socketIo.Socket) => {
  let interval: NodeJS.Timeout;
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

const getApiAndEmit = (socket: socketIo.Socket) => {
  const response: Date = new Date();
  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", response);
};

server.listen(port, () => console.log(`Listening on port ${port}`));
