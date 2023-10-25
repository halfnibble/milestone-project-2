import axios from "axios";
import React, { useEffect, useState } from "react";

import logo from "./logo.svg";
import "./App.css";

function App() {
    const [message, setMessage] = useState("Loading...");
    const [secret, setSecret] = useState("Loading...");

    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

    useEffect(() => {
        axios.get(`${API_URL}/`).then((resp) => {
            setMessage(resp.data.message);
            setSecret(resp.data.secret);
        });
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <h1>Test</h1>
                <h3>{message}</h3>
                <h4>Don't tell anyone this: {secret}</h4>
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Takeover React
                </a>
            </header>
        </div>
    );
}

export default App;
