// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyBSzqHCoLf_hEiu6lzDjAkP8NH6rK2AaI0",
  authDomain: "gold-inventory-management.firebaseapp.com",
  projectId: "gold-inventory-management",
  storageBucket: "gold-inventory-management.appspot.com",
  messagingSenderId: "992092719010",
  appId: "1:992092719010:web:3cb674f2a9a912d15b54fb",
  measurementId: "G-9VN9ZDPZCW",
  databaseURL: "https://gold-inventory-management-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };