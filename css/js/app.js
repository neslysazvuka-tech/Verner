import { database, ref, set, push, onChildAdded, onValue, remove, off } from './firebase.js';

// DOM элементы
const loginScreen = document.getElementById('login-screen');
const chatScreen = document.getElementById('chat-screen');
const usernameInput = document.getElementById('username-input');
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const messagesContainer = document.getElementById('messages-container');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');
const chatTitle = document.getElementById('chat-title');
const loginStatus = document.getElementById('login-status');

let currentUser = null;
let currentUserId = null;
let messageListener = null;

// Вход в чат
loginBtn.addEventListener('click', () => {
  console.log("Кнопка входа нажата");
  loginUser();
});

usernameInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') loginUser();
});

// Отправка сообщения
sendBtn.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') sendMessage();
});

// Выход из чата
logoutBtn.addEventListener('click', logout);

// Функция входа пользователя
function loginUser() {
  const username = usernameInput.value.trim();
  loginStatus.textContent = "";
  
  if (username.length < 2 || username.length > 20) {
    loginStatus.textContent = "Имя должно быть от 2 до 20 символов";
    return;
  }

  console.log("Попытка входа для пользователя:", username);
  
  currentUser = username;
  currentUserId = generateUserId();
  
  // Показываем статус загрузки
  loginStatus.textContent = "Вход в систему...";
  loginBtn.disabled = true;
  
  set(ref(database, `users/${currentUserId}`), {
    name: username,
    online: true,
    lastActive: Date.now()
  }).then(() => {
    console.log("Пользователь успешно добавлен в базу данных");
    
    // Обновляем UI
    chatTitle.textContent = `${username}`;
    loginScreen.classList.remove('active');
    chatScreen.classList.add('active');
    messageInput.focus();
    
    // Загружаем сообщения
    loadMessages();
    
    // Устанавливаем обработчик для новых сообщений
    messageListener = onChildAdded(ref(database, 'messages'), addMessageToChat);
    
    // Запускаем очистку старых сообщений
    setInterval(cleanupOldMessages, 60000);
    
  }).catch((error) => {
    console.error("Ошибка входа: ", error);
    loginStatus.textContent = `Ошибка входа: ${error.message}`;
    loginBtn.disabled = false;
  });
}

// Функция выхода
function logout() {
  console.log("Попытка выхода пользователя");
  
  remove(ref(database, `users/${currentUserId}`)).then(() => {
    console.log("Пользователь успешно удален из базы данных");
    
    if (messageListener) {
      off(ref(database, 'messages'), messageListener);
    }
    
    currentUser = null;
    currentUserId = null;
    messagesContainer.innerHTML = '';
    messageInput.value = '';
    usernameInput.value = '';
    loginStatus.textContent = "";
    loginBtn.disabled = false;
    
    chatScreen.classList.remove('active');
    loginScreen.classList.add('active');
  }).catch((error) => {
    console.error("Ошибка выхода: ", error);
    alert("Ошибка при выходе: " + error.message);
  });
}

// Остальные функции (sendMessage, loadMessages, addMessageToChat, cleanupOldMessages)
// Оставьте без изменений из предыдущего примера, но добавьте console.log для отладки

// Вспомогательные функции
function generateUserId() {
  return 'user_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now().toString(36);
}

// Отладочная информация
console.log("Скрипт app.js загружен");
console.log("Состояние экранов при загрузке:", {
  loginScreen: loginScreen.classList.contains('active'),
  chatScreen: chatScreen.classList.contains('active')
});

// Проверка перехода каждую секунду
setInterval(() => {
  console.log("Текущее состояние:", {
    user: currentUser,
    userId: currentUserId,
    screens: {
      login: loginScreen.classList.contains('active'),
      chat: chatScreen.classList.contains('active')
    },
    dbConnection: !!database
  });
}, 1000);
