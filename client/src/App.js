import axios from "axios";
import React, { lazy, useEffect, useState, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Nav from "./components/Nav";
import "./App.css";

const Home = lazy(() => import("./components/Home"));
const Register = lazy(() => import("./components/Register"));
const Login = lazy(() => import("./components/Login"));
const TodoList = lazy(() => import("./components/TodoList"));
const TodoForm = lazy(() => import("./components/TodoForm"));

function App() {
    const [message, setMessage] = useState("Loading...");
    const [secret, setSecret] = useState("Loading...");

    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

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
                <h4>Don't tell anyone this: "{secret}"</h4>
                <Nav />
            </header>

            <Suspense fallback={<h1>Loading...</h1>}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/todos" element={<TodoList />} />
                </Routes>
            </Suspense>
        </div>
    );
}

export default App;
