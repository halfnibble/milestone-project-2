import { useState } from "react";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import TodoForm from "./TodoForm";

function TodoItem({ id = null, name = "", completed = false, saveTodoCallback = () => {} }) {
    const [showForm, setShowForm] = useState(false);

    const augmentedSaveTodoCallback = (todo) => {
        saveTodoCallback(todo);
        setShowForm(false);
    };

    return (
        <Card>
            <Card.Body>
                {name} - {completed ? "✅" : "[ ]"}
                <Button
                    style={{ marginLeft: "20px" }}
                    onClick={() => {
                        setShowForm(!showForm);
                    }}
                >
                    Edit
                </Button>
                <div style={{ display: showForm ? "block" : "none" }}>
                    <TodoForm
                        id={id}
                        name={name}
                        completed={completed}
                        saveTodoCallback={augmentedSaveTodoCallback}
                    />
                </div>
            </Card.Body>
        </Card>
    );
}

export default TodoItem;
