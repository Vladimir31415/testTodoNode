const express = require('express');
const cors = require('cors');
const { checkJwt } = require('./token.middleware');

const app = express();
app.use(express.json());

app.use(cors());

// Sample initial data in memory
let todos = [
  {
    _id: '1',
    title: 'Buy groceries',
    completed: false,
    userId: 1,
    description: 'Remember to buy milk and eggs.',
  },
  {
    _id: '2',
    title: 'Go for a run',
    completed: true,
    userId: 2,
    description: '5 miles in the park.',
  },
];

// Get all todos
app.get('/api/todos', checkJwt, (req, res) => {
  res.json(todos);
});

// Get a single todo by _id
app.get('/api/todos/:id', (req, res) => {
  const id = req.params.id;
  const todo = todos.find((t) => t._id === id);

  if (todo) {
    res.json(todo);
  } else {
    res.status(404).json({ error: 'Todo not found' });
  }
});

// Create a new todo
app.post('/api/todos', (req, res) => {
  const newTodo = req.body;
  newTodo._id = Math.random().toString();
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Update a todo by _id
app.put('/api/todos/:id', (req, res) => {
  const id = req.params.id;
  const updatedTodo = req.body;
  const index = todos.findIndex((t) => t._id === id);

  if (index !== -1) {
    todos[index] = { ...todos[index], ...updatedTodo };
    res.json(todos[index]);
  } else {
    res.status(404).json({ error: 'Todo not found' });
  }
});

// Delete a todo by _id
app.delete('/api/todos/:id', (req, res) => {
  const id = req.params.id;
  const index = todos.findIndex((t) => t._id === id);

  if (index !== -1) {
    todos.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ error: 'Todo not found' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
