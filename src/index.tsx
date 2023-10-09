import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {initializeApp} from "firebase/app";
import {Timestamp, doc, getFirestore, setDoc} from "@firebase/firestore";

const app = initializeApp({
    apiKey: "AIzaSyDHhQAIlvXvMWSTcecW4um1UXwFB_NNSYE",
    authDomain: "real-time-chatting-project.firebaseapp.com",
    projectId: "real-time-chatting-project",
    storageBucket: "real-time-chatting-project.appspot.com",
    messagingSenderId: "687884914798",
    appId: "1:687884914798:web:00fc2ffe5fee32fecf167f",
});

export const db = getFirestore(app);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
