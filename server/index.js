"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const db_1 = require("./db");
const path = require("path");
const nanoid_1 = require("nanoid");
const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());
app.use(express.static("dist"));
const usersCollection = db_1.db.collection("usersppt");
const roomsCollection = db_1.db.collection("roomsppt");
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
        }
        else {
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
        }
        else {
            res.json({
                id: searchResponse.docs[0].id,
            });
        }
    });
});
app.get("/rooms/:rtdbRoomId", function (req, res) {
    const { rtdbRoomId } = req.params;
    const RoomsRef = db_1.rtdb.ref("/roomsppt/" + rtdbRoomId);
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
            const roomsRef = db_1.rtdb.ref("roomsppt/" + (0, nanoid_1.nanoid)());
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
        }
        else {
            res.status(401).json({ message: "no existis" });
        }
    });
});
app.get("/test", (req, res) => {
    res.json("el get de prueba");
});
app.get("/rooom/:roomId", (req, res) => {
    console.log("holas");
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
        }
        else {
            res.status(401).json({ message: "no existis" });
        }
    });
});
// app.get("/rooms/:rtdbRoomId", function (req, res) {
//   const { rtdbRoomId } = req.params;
//   const RoomsRef = rtdb.ref("/roomsppt/" + rtdbRoomId + "/data");
//   RoomsRef.get().then((snapshot) => {
//     const usersData: any[] = [];
//     snapshot.forEach((doc) => {
//       usersData.push(doc);
//     });
//     res.json(usersData);
//   });
// });
app.patch("/room/:rtdbRoomId", function (req, res) {
    console.log("hola soy el patch");
    const { rtdbRoomId } = req.params;
    const { userID } = req.body;
    const { updateObject } = req.body;
    const RoomsRef = db_1.rtdb.ref("/roomsppt/" + rtdbRoomId + "/" + userID);
    RoomsRef.update(updateObject).then(() => {
        res.json({ message: "ok" });
    });
});
app.get("*", (req, res) => {
    console.log("probando el error");
    res.sendFile(path.join(__dirname, "../dist/index.html"));
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
