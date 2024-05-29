"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const db_1 = require("./db");
const path = require("path");
const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());
app.use(express.static("dist"));
const usersCollection = db_1.db.collection("users"); /*despues lo cambiamos esto salu2*/
const roomsCollection = db_1.db.collection("rooms");
app.post("/mensajes/:rtdbRoomId", function (req, res) {
    return "hola";
});
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../dist/index.html"));
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
