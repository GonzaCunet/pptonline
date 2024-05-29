import * as express from "express";
import * as cors from "cors";
import { db, rtdb } from "./db";

const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());
app.use(express.static("dist"));

const usersCollection =
  db.collection("users"); /*despues lo cambiamos esto salu2*/
const roomsCollection = db.collection("rooms");

app.post("/mensajes/:rtdbRoomId", function (req, res) {
  return "hola";
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
