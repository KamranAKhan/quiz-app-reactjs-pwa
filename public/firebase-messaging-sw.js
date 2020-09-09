importScripts('https://www.gstatic.com/firebasejs/7.18.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.18.0/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyBXmSVlND3bIcfB3LoHXPFmdxXIiNPHtLc",
    authDomain: "quiz-app-pwa-d259d.firebaseapp.com",    
    projectId: "quiz-app-pwa-d259d",    
    messagingSenderId: "800696273651",
    appId: "1:800696273651:web:76a8705b24b8b0d4778586"
})

firebase.messaging();