import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js";
import { getDatabase, ref, set, push, onChildAdded, onValue, remove, off } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAjrBXw1ACyd-b8I5OrI4gkxCfjrFrRs_Q",
  authDomain: "realtime-multiplayer-93582.firebaseapp.com",
  databaseURL: "https://realtime-multiplayer-93582-default-rtdb.firebaseio.com",
  projectId: "realtime-multiplayer-93582",
  storageBucket: "realtime-multiplayer-93582.firebasestorage.app",
  messagingSenderId: "38981770435",
  appId: "1:38981770435:web:b9e89a3b3e524169551676"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, set, push, onChildAdded, onValue, remove, off };
