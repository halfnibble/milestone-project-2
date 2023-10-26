const client = require("./db-client");

async function listTodosForUser(token) {
    const result = await client.query(
        'SELECT t.id, t.name, t.completed FROM "Todo" t ' +
            'JOIN "User" u ON t.user_id = u.id WHERE u.token = $1',
        [token]
    );
    return result.rows;
}

async function createTodoForUser(token, name) {
    const result = await client.query(
        'INSERT INTO "Todo" (name, user_id) ' +
            'SELECT $1, u.id FROM "User" u WHERE u.token = $2 ' +
            "RETURNING id, name, completed",
        [name, token]
    );
    return result.rows[0]; // Return the newly created Todo item
}

async function updateTodoItem(token, todoId, updatedName, updatedStatus) {
    const result = await client.query(
        'UPDATE "Todo" SET name = $1, completed = $2 ' +
            'FROM "User" WHERE "Todo".id = $3 AND "User".token = $4 ' +
            'RETURNING "Todo".id, name, completed',
        [updatedName, updatedStatus, todoId, token]
    );
    return result.rows[0]; // Return the updated Todo item
}

async function deleteTodoItem(token, todoId) {
    await client.query(
        'DELETE FROM "Todo" ' + 'USING "User" WHERE "Todo".id = $1 AND "User".token = $2',
        [todoId, token]
    );
    // No return value, you can check if deletion was successful by counting affected rows if needed
}

module.exports = {
    listTodosForUser,
    createTodoForUser,
    updateTodoItem,
    deleteTodoItem,
};
