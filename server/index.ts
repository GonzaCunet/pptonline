import * as express from "express";
import * as cors from "cors";
import { db, rtdb } from "./db";
import * as path from "path";
import { nanoid } from "nanoid";
import { values } from "lodash";

const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());
app.use(express.static("dist"));

const usersCollection = db.collection("usersppt");
const roomsCollection = db.collection("roomsppt");

app.post("/signup/", (req, res) => {
  const nombre = req.body.nombre;
  usersCollection
    .where("nombre", "==", nombre)
    .get()
    .then((searchResponse) => {
      if (searchResponse.empty) {
        usersCollection
          .add({
            nombre,
          })
          .then((newUserRef) => {
            res.json({ id: newUserRef.id });
          });
      } else {
        res.status(400).json({
          message: "user already exists",
        });
      }
    });
});

app.post("/auth", (req, res) => {
  const { nombre } = req.body;
  usersCollection
    .where("nombre", "==", nombre)
    .get()
    .then((searchResponse) => {
      if (searchResponse.empty) {
        usersCollection
          .add({
            nombre,
          })
          .then((newUserRef) => {
            res.json({ id: newUserRef.id });
          });
      } else {
        res.json({
          id: searchResponse.docs[0].id,
        });
      }
    });
});

app.get("/rooms/:rtdbRoomId", function (req, res) {
  const { rtdbRoomId } = req.params;
  const RoomsRef = rtdb.ref("/roomsppt/" + rtdbRoomId);

  RoomsRef.get().then((snapshot) => {
    res.json(snapshot);
  });
});

app.post("/rooms", (req, res) => {
  const { userId } = req.body;
  const { nombre } = req.body;
  usersCollection
    .doc(userId.toString())
    .get()
    .then((doc) => {
      if (doc.exists) {
        const roomsRef = rtdb.ref("roomsppt/" + nanoid());
        roomsRef
          .set({
            [userId]: {
              jugada: "",
              nombre: nombre,
              online: true,
              start: false,
              scoreboard: 0,
            },
          })
          .then(() => {
            const roomLongId = roomsRef.key;
            const roomId = 1000 + Math.floor(Math.random() * 999);
            roomsCollection
              .doc(roomId.toString())
              .set({ rtdbRoomId: roomLongId })
              .then(() => {
                res.json({
                  id: roomId.toString(),
                  rtdbId: roomLongId.toString(),
                });
              });
          });
      } else {
        res.status(401).json({ message: "no existis" });
      }
    });
});
app.get("/room/join/:roomId", (req, res) => {
  const { userId } = req.query;
  const { roomId } = req.params;

  usersCollection
    .doc(userId.toString())
    .get()
    .then((doc) => {
      if (doc.exists) {
        roomsCollection
          .doc(roomId)
          .get()
          .then((snap) => {
            const data = snap.data();
            res.json(data);
          });
      } else {
        res.status(401).json({ message: "no existis" });
      }
    });
});

app.post("/room/join", (req, res) => {
  const { userId } = req.body;
  const { name } = req.body;
  const { rtdbRoomId } = req.body;
  const RoomsRef = rtdb.ref("/roomsppt/" + rtdbRoomId);

  RoomsRef.get().then((snap) => {
    const data = snap;
    let elArray = data.val();

    if (values(elArray).length == 2) {
      res.json("La sala ya alcanzó el máximo de jugadores");
    } else {
      RoomsRef.update({
        [userId]: {
          jugada: "",
          nombre: name,
          online: true,
          start: false,
          scoreboard: 0,
        },
      });
      res.json("el usuario se ha unido a la sala");
    }
  });
});

app.patch("/room/:rtdbRoomId", function (req, res) {
  const { rtdbRoomId } = req.params;
  const { userID } = req.body;
  const { updateObject } = req.body;
  const RoomsRef = rtdb.ref("/roomsppt/" + rtdbRoomId + "/" + userID);
  RoomsRef.update(updateObject).then(() => {
    res.json({ message: "ok" });
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
