import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { StyledFirebaseAuth } from "react-firebaseui";
import firebase from "firebase";

function App() {
  const [user, setUser] = useState({ id: "", name: "", email: "" });

  const firebaseConfig: any = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  };

  let app;
  if (!firebase.apps.length) {
    app = firebase.initializeApp(firebaseConfig);
  } else {
    app = firebase.app(); // if already initialized, use that one
  }

  const uiConfig = {
    signInFlow: "popup",
    signInSuccessUrl: "/",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
  };

  useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        setUser({
          id: user.uid ?? "",
          name: user.displayName ?? "",
          email: user.email ?? "",
        });
      }
    });
  }, []);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <div>
          Id: <span>{user.id}</span>
        </div>
        <div>
          Name: <span>{user.name}</span>
        </div>
        <div>
          Email: <span>{user.email}</span>
        </div>
      </div>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={app.auth()} />
      <button onClick={() => app.auth().signOut()}>Sign Out</button>
    </>
  );
}

export default App;
