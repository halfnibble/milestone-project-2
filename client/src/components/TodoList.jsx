import { useState, useEffect } from "react";
import axios from "axios";

// Bootstrap
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";

const TodoList = () => {
    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";
    const [todos, setTodos] = useState([]);
    const [showForm, setShowForm] = useState(false);

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
                setTodos(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const newTodoCallback = (todo) => {
        const newTodos = [...todos];
        newTodos.unshift(todo);
        setTodos(newTodos);
        setShowForm(false);
    };

    const updateTodoCallback = (todo) => {
        const newTodos = [...todos];
        const index = newTodos.findIndex((t) => t.id === todo.id);
        newTodos[index] = todo;
        setTodos(newTodos);
    };

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col xs lg="8" style={{ position: "relative" }}>
                    <h1 style={{ textAlign: "left" }}>
                        Todo List
                        <Button
                            variant="success"
                            style={{ position: "absolute", right: "0", top: "10px" }}
                            onClick={() => {
                                setShowForm(!showForm);
                            }}
                        >
                            Add New
                        </Button>
                    </h1>
                    <div
                        className={"todoFormDropdown"}
                        style={{ display: showForm ? "block" : "none" }}
                    >
                        <TodoForm saveTodoCallback={newTodoCallback} />
                    </div>

                    <ul>
                        {todos.map((todo) => (
                            <TodoItem
                                key={todo.id}
                                {...todo}
                                saveTodoCallback={updateTodoCallback}
                            />
                        ))}
                    </ul>
                </Col>
            </Row>
        </Container>
    );
};

export default TodoList;
