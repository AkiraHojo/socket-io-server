import { randomInt } from "crypto";
import * as express from "express";
import * as http from "http";
import * as socketIo from "socket.io";

const port = process.env.PORT || 4001;
const app: express.Express = express();

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
  const response: string = randomInt(100).toString();
  socket.emit("FromAPI", response);
};

server.listen(port, () => console.log(`Listening on port ${port}`));
