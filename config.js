import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
  apiKey: "AIzaSyA6dwzm4dmGl3joyh2qbvBcpzY3CmQJfy8",
  authDomain: "story-hub-92b3d.firebaseapp.com",
  projectId: "story-hub-92b3d",
  storageBucket: "story-hub-92b3d.appspot.com",
  messagingSenderId: "21592731725",
  appId: "1:21592731725:web:22a6d3b43a0561e3ccec04"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
  export default firebase.firestore();

