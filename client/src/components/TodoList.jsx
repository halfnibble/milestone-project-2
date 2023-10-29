import { useState, useEffect } from "react";
import axios from "axios";

const TodoList = () => {
    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios
            .get(`${API_URL}/todos`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                console.log(response);
                setTodos(response.data.todos);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div>
            <h1>Todo List</h1>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>{todo.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
