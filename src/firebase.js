import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAOiiiivYE8mnGWplwBWYIL-A-Yd-5ma0E",
  authDomain: "nc-chat-app.firebaseapp.com",
  databaseURL: "https://nc-chat-app.firebaseio.com",
  projectId: "nc-chat-app",
  storageBucket: "nc-chat-app.appspot.com",
  messagingSenderId: "1009379485175",
  appId: "1:1009379485175:web:a5e4c9c6af79af9238faf2",
  measurementId: "G-41V5FYL4SB",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
