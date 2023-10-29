import React from "react";

import logo from "../logo.svg";
import "./Home.css";

function Home() {
    return (
        <div>
            <img src={logo} className="Home-logo" alt="logo" />
            <p>
                Edit <code>src/Home.js</code> and save to reload.
            </p>
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
