import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
//React root is necessary for display of app
const root = ReactDOM.createRoot(document.getElementById("root"));
//Renders the App component inside of a div
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
