import express from "express";
import { authenticateJwt, SECRET } from "../middleware/index";
import { Todo } from "../db";
import mongoose from "mongoose";

const router = express.Router();

interface TodoItemInterface {
  title: string;
  description: string;
  done: boolean;
  userId: mongoose.Types.ObjectId;
}

router.post('/todos', authenticateJwt, (req, res) => {
  const { title, description } = req.body;
  const done = false;
  const userId = new mongoose.Types.ObjectId(req.headers["userId"]?.toString());
  const todoItem: TodoItemInterface = { title, description, done, userId };
  const newTodo = new Todo(todoItem);

  newTodo.save()
    .then((savedTodo) => {
      res.status(201).json(savedTodo);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed to create a new todo' });
    });
});


router.get('/todos', authenticateJwt, (req, res) => {
  const userId = req.headers["userId"];

  Todo.find({ userId })
    .then((todos) => {
      res.json(todos);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed to retrieve todos' });
    });
});

router.patch('/todos/:todoId/done', authenticateJwt, (req, res) => {
  const { todoId } = req.params;
  const userId = req.headers["userId"];

  Todo.findOneAndUpdate({ _id: todoId, userId }, { done: true }, { new: true })
    .then((updatedTodo) => {
      if (!updatedTodo) {
        return res.status(404).json({ error: 'Todo not found' });
      }
      res.json(updatedTodo);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed to update todo' });
    });
});

export default router;