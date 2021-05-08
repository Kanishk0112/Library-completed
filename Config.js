import * as firebase from "firebase"
require("@firebase/firestore")
var firebaseConfig = {
  apiKey: "AIzaSyAN-thRXnnvDpdvMfAsTtRFML7GaFzPSDM",
  authDomain: "library-completed.firebaseapp.com",
  projectId: "library-completed",
  storageBucket: "library-completed.appspot.com",
  messagingSenderId: "222895479358",
  appId: "1:222895479358:web:7545172155c68bcee58f6f"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
  export default firebase.firestore();