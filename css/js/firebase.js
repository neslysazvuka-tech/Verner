import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push, onChildAdded, onValue, remove, off } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAjrBXw1ACyd-b8I5OrI4gkxCfjrFrRs_Q",
  authDomain: "realtime-multiplayer-93582.firebaseapp.com",
  databaseURL: "https://realtime-multiplayer-93582-default-rtdb.firebaseio.com",
  projectId: "realtime-multiplayer-93582",
  storageBucket: "realtime-multiplayer-93582.firebasestorage.app",
  messagingSenderId: "38981770435",
  appId: "1:38981770435:web:e4a55a523f14243d551676"
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Проверка инициализации
console.log("Firebase инициализирован:", app.name);
console.log("База данных подключена:", database.app.name);

export { database, ref, set, push, onChildAdded, onValue, remove, off };
