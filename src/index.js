import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from 'firebase/app';


const firebaseConfig = {
  apiKey: "AIzaSyAPMCYNkoX8zSsVuGQREvi7anjy_ejlaeQ",
  authDomain: "react-firebase-project-ddbb2.firebaseapp.com",
  projectId: "react-firebase-project-ddbb2",
  storageBucket: "react-firebase-project-ddbb2.appspot.com",
  messagingSenderId: "275000959677",
  appId: "1:275000959677:web:563394f3f46f43b9c0cdd4"
};


initializeApp(firebaseConfig);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
