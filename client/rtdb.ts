import firebase from "firebase";

export const API_BASE_URL =
  process.env.ENVIRONMENT == "DEV"
    ? "http://localhost:3000"
    : "https://pptonline-z6eq.onrender.com";
firebase.initializeApp({
  apiKey: "AIzaSyACD-PFhB7oZMNpkDK2JOxc0Rsqwdk_Pc8",
  authDomain: "el-fairbase.firebaseapp.com",
  databaseURL: "https://el-fairbase-default-rtdb.firebaseio.com",
});

export const dataBase = firebase.database();
