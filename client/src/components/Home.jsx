import React, { useState } from "react";

import logo from "../logo.svg";
import "./Home.css";

function PopopenWndow({ open = false }) {
    return (
        <div
            className="popopenwndow"
            style={{
                display: open ? "block" : "none",
                position: "absolute",
                top: 20,
                left: 0,
            }}
        >
            <h1>PopopenWndow</h1>
        </div>
    );
}

function Home() {
    const [windowOpen, setWindowOpen] = useState(false);
    return (
        <div>
            <img src={logo} className="Home-logo" alt="logo" />

            <p>
                Edit <code>src/Home.js</code> and save to reload.
            </p>
            <div style={{ position: "relative", display: "inline-block" }}>
                <PopopenWndow open={windowOpen} />
                <button onClick={() => setWindowOpen(!windowOpen)}>Open Window</button>
            </div>
            <a
                className="Home-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
            >
                Takeover React
            </a>
        </div>
    );
}

export default Home;
