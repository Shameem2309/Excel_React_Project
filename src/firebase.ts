import { initializeApp } from 'firebase/app';
import { getFirestore, Firestore} from 'firebase/firestore';


  // Your Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAPMCYNkoX8zSsVuGQREvi7anjy_ejlaeQ",
    authDomain: "react-firebase-project-ddbb2.firebaseapp.com",
    projectId: "react-firebase-project-ddbb2",
    storageBucket: "react-firebase-project-ddbb2.appspot.com",
    messagingSenderId: "275000959677",
    appId: "1:275000959677:web:563394f3f46f43b9c0cdd4"
  };

  const app = initializeApp(firebaseConfig);
  const firestore = getFirestore(app);
  
  export { firestore };;