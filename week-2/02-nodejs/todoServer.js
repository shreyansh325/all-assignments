/**
  You need to create an express HTTP server in Node.js which will handle the logic of a todo list app.
  - Don't use any database, just store all the data in an array to store the todo list data (in-memory)
  - Hard todo: Try to save responses in files, so that even if u exit the app and run it again, the data remains (similar to databases)

  Each todo has a title and a description. The title is a string and the description is a string.
  Each todo should also get an unique autogenerated id every time it is created
  The expected API endpoints are defined below,
  1.GET /todos - Retrieve all todo items
    Description: Returns a list of all todo items.
    Response: 200 OK with an array of todo items in JSON format.
    Example: GET http://localhost:3000/todos
    
  2.GET /todos/:id - Retrieve a specific todo item by ID
    Description: Returns a specific todo item identified by its ID.
    Response: 200 OK with the todo item in JSON format if found, or 404 Not Found if not found.
    Example: GET http://localhost:3000/todos/123
    
  3. POST /todos - Create a new todo item
    Description: Creates a new todo item.
    Request Body: JSON object representing the todo item.
    Response: 201 Created with the ID of the created todo item in JSON format. eg: {id: 1}
    Example: POST http://localhost:3000/todos
    Request Body: { "title": "Buy groceries", "completed": false, description: "I should buy groceries" }
    
  4. PUT /todos/:id - Update an existing todo item by ID
    Description: Updates an existing todo item identified by its ID.
    Request Body: JSON object representing the updated todo item.
    Response: 200 OK if the todo item was found and updated, or 404 Not Found if not found.
    Example: PUT http://localhost:3000/todos/123
    Request Body: { "title": "Buy groceries", "completed": true }
    
  5. DELETE /todos/:id - Delete a todo item by ID
    Description: Deletes a todo item identified by its ID.
    Response: 200 OK if the todo item was found and deleted, or 404 Not Found if not found.
    Example: DELETE http://localhost:3000/todos/123

    - For any other route not defined in the server return 404

  Testing the server - run `npm run test-todoServer` command in terminal
 */

const fs = require("fs");

let counter = 1;

function getUniqueNumber(){
  return counter++;
}

const filepath = "./todos.json"

function readTodos(){
  let todos = fs.readFileSync(filepath);
  return JSON.parse(todos);
}

function writeTodos(){
  console.log("New todos: ", JSON.stringify(todos))
  console.log("Skipping write TODOs to file..")
  // fs.writeFileSync(filepath, JSON.stringify(todos, null, 1));
}

const todos = [
  { id: getUniqueNumber(), title: "do job", description: "make the background" },
  { id: getUniqueNumber(), title: "get bored and die", description: "set this as default screensaver :)" },
];
// const todos = readTodos();

function getAllTodos(req, res) {
  res.json(todos);
}

function getTodoById(req, res) {
  const id = req.params.id;
  for(let task of todos){
    if(task['id']==id){
      res.json(task);
      return;
    }
  }
  res.status(404).send();
}

function createTodo(req, res){
  const id = getUniqueNumber();
  const obj = req.body;
  obj['id']=id;
  todos.push(obj);
  writeTodos();
  res.status(201).json(obj);
}

function updateTodo(req, res){
  const id = req.params.id;
  for(let task of todos){
    if(task['id']==id){
      let updatedTask = req.body;
      for(let key of ["title", "description", "completed"]) {
        if(updatedTask[key])
          task[key] = updatedTask[key];
      }
      res.json(task);
      writeTodos();
      return;
    }
  }
  res.status(404).send();
}

function deleteTodo(req, res){
  const id = req.params.id;
  let idx = 0;
  while(idx < todos.length){
    if(todos[idx]['id']==id)
      break;
    idx++;
  }
  if(idx<todos.length){
    todos.splice(idx, 1);
    writeTodos();
    res.send();
  }
  else{
    res.status(404).send();
  }
}

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 3000;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.get("/todos", getAllTodos);
app.get("/todos/:id", getTodoById);
app.post("/todos", createTodo);
app.put("/todos/:id", updateTodo);
app.delete("/todos/:id", deleteTodo);

// app.all('*', (req, res) => {res.status(404).send();});

app.listen(port, () => console.log('Server running on port 3000!'));

module.exports = app;
