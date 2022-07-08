import express, { NextFunction, Request, Response } from "express";
import { Server } from "socket.io";
import Namespace from "./classes/Namespace";
import namespaces from "./data/namespaces";
import "dotenv/config";

interface user {
  id: string;
  username: string;
  image: string;
}

const app = express();
app.use(express.static(__dirname + "/public"));
app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ message: "welcome" });
});
const expressServer = app.listen(process.env.PORT, () => {
  console.log(`socket.io listening on PORT ${process.env.PORT}`);
});
const io = new Server(expressServer, { cors: { origin: "*" } });

let connectedUsers: user[] = [];

let nsData = namespaces.map((ns) => {
  return { id: ns.id, img: ns.img, endpoint: ns.endpoint };
});

io.of("/").on("connection", (socket) => {
  socket.emit("nsList", nsData);
  socket.on("login", async (username: string, image?: string) => {
    if (!username) return;
    let checkloggedIn = connectedUsers.find((user) => user.username === username);
    if (checkloggedIn) return;
    connectedUsers.push({
      id: socket.id,
      username: username,
      image: image || "https://clinicforspecialchildren.org/wp-content/uploads/2016/08/avatar-placeholder.gif",
    });
    io.emit("connectedUsers", connectedUsers);
  });
  socket.on("logout", async (username?: string) => {
    connectedUsers = connectedUsers.filter((user) => {
      return socket.id !== user.id;
    });
    io.emit("connectedUsers", connectedUsers);
  });

  socket.on("disconnect", () => {
    connectedUsers = connectedUsers.filter((user) => {
      return socket.id !== user.id;
    });
    io.emit("connectedUsers", connectedUsers);
  });
});

namespaces.forEach((ns) => {
  io.of(ns.endpoint).on("connection", (socket) => {
    socket.emit("nsList", nsData);
    socket.emit("nsRoomLoad", ns.rooms);
    //when someone emits a join request, we take the room they want to join
    //and pass back the number of users in it
    socket.on("joinRoom", async (roomToJoin) => {
      socket.join(roomToJoin);
      //find the matching room obj inside the current NS obj
      const nsRoom = ns.rooms.find((room) => {
        return room.roomTitle === roomToJoin;
      });
      if (nsRoom) {
        socket.emit("historyGET", nsRoom?.history);
      } else {
        socket.emit("historyGET", []);
      }
      updateUsersInRoom(ns, roomToJoin);
    });
    socket.on("leaveRoom", async (roomToLeave) => {
      socket.leave(roomToLeave);
      updateUsersInRoom(ns, roomToLeave);
    });
    socket.on("newMessageToServer", (msg) => {
      const fullMsg = {
        text: msg.text,
        time: Date.now(),
        username: msg.username,
        avatar: msg.img || "https://clinicforspecialchildren.org/wp-content/uploads/2016/08/avatar-placeholder.gif",
      };
      const roomTitle = Array.from(socket.rooms)[1];
      //need to use room string to find room object of same title in ns object
      const nsRoom = ns.rooms.find((room) => {
        return room.roomTitle === roomTitle;
      });
      nsRoom!.addMessage(fullMsg);
      io.of(ns.endpoint).to(roomTitle).emit("messageToClients", fullMsg);
    });

    socket.on("disconnecting", async (reason) => {
      const roomTitle = Array.from(socket.rooms)[1];
      const ids = await io.of(ns.endpoint).in(roomTitle).allSockets();
      const numOfUsersConnected = ids.size - 1;
      io.of(ns.endpoint).to(roomTitle).emit("updateMembers", numOfUsersConnected);
    });
  });
});

async function updateUsersInRoom(ns: Namespace, room: string) {
  //returns set of all sockets connected to room in ns
  const ids = await io.of(ns.endpoint).in(room).allSockets();
  const numOfUsersConnected = ids.size;
  io.of(ns.endpoint).to(room).emit("updateMembers", numOfUsersConnected);
}
