import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./Login.css";

function TodoForm({ id = null, name = "", completed = false, saveTodoCallback = () => {} }) {
    const [todo, setTodo] = useState({ id, name, completed });
    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";
    const token = localStorage.getItem("token");

    const createTodo = (todo) => {
        axios
            .post(
                `${API_URL}/todos`,
                {
                    ...todo,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((response) => {
                console.log("Successfully created todo!");
                saveTodoCallback(response.data);
                setTodo({ id: null, name: "", completed: false });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const updateTodo = (todo) => {
        axios
            .put(
                `${API_URL}/todos/${todo.id}`,
                {
                    ...todo,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((response) => {
                console.log("Successfully updated todo!");
                saveTodoCallback(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (todo.id === null) {
            createTodo(todo);
        } else {
            updateTodo(todo);
        }
    };

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col xs lg="6">
                    <Form className="todoform">
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Todo</Form.Label>
                            <Form.Control
                                name="name"
                                type="name"
                                placeholder="Todo item"
                                value={todo.name}
                                onChange={(e) =>
                                    setTodo((todo) => ({ ...todo, name: e.target.value }))
                                }
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="password">
                            <Form.Check
                                type={"checkbox"}
                                label={`Completed`}
                                checked={todo.completed}
                                onChange={(e) => {
                                    console.log(e.target.checked);
                                    setTodo((todo) => ({
                                        ...todo,
                                        completed: e.target.checked,
                                    }));
                                }}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default TodoForm;
