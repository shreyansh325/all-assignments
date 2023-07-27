/*
  Implement a class `Todo` having below methods
    - add(todo): adds todo to list of todos
    - remove(indexOfTodo): remove todo from list of todos
    - update(index, updatedTodo): update todo at given index
    - getAll: returns all todos
    - get(indexOfTodo): returns todo at given index
    - clear: deletes all todos

  Once you've implemented the logic, test your code by running
  - `npm run test-todo-list`
*/

class Todo {
  todos;
  constructor() {
    this.todos = [];
  }
  isValidIndex(taskIndex) {
    return taskIndex>=0 && taskIndex<this.todos.length;
  }
  add(task) {
    this.todos.push(task);
  }
  remove(taskIndex) {
    if (this.isValidIndex(taskIndex))
      this.todos.splice(taskIndex, 1);
  }
  update(taskIndex, taskUpdated) {
    if (this.isValidIndex(taskIndex))
      this.todos[taskIndex] = taskUpdated;
  }
  getAll() {
    return [...this.todos];
  }
  get(taskIndex) {
    return this.isValidIndex(taskIndex)?this.todos[taskIndex]:null;
  }
  clear() {
    this.todos = [];
  }
}

module.exports = Todo;
