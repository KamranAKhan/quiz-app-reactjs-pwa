import firebase from 'firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBXmSVlND3bIcfB3LoHXPFmdxXIiNPHtLc",
    authDomain: "quiz-app-pwa-d259d.firebaseapp.com",
    databaseURL: "https://quiz-app-pwa-d259d.firebaseio.com",
    projectId: "quiz-app-pwa-d259d",
    storageBucket: "quiz-app-pwa-d259d.appspot.com",
    messagingSenderId: "800696273651",
    appId: "1:800696273651:web:76a8705b24b8b0d4778586"
  };
  
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

export const InitializeFirebase = () => {
  Notification.requestPermission().then((permission) => {
    console.log(permission)
    if (permission === 'granted') {
      messaging.getToken().then((currentToken) => {
        if (currentToken) {
            console.log(currentToken)            
      
        } else {
          // Show permission request.
          console.log('No Instance ID token available. Request permission to generate one.');
          // Show permission UI.
      
        }
      }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
  
      });
  
    }
  
  })
}