const server = "http://localhost:3000/";

function addTodo(todo) {
  let elem = document.createElement("div");
  elem.setAttribute("id", todo.id);

  let titleSpan = document.createElement("span");
  titleSpan.innerHTML = todo.title;

  let descriptionSpan = document.createElement("span");
  descriptionSpan.innerHTML = todo.description;

  let delButton = document.createElement("button");
  delButton.innerHTML = "Delete";
  delButton.setAttribute("onClick", "deleteTodo(" + todo.id + ")");

  elem.appendChild(titleSpan);
  elem.appendChild(descriptionSpan);
  elem.appendChild(delButton);

  let main = document.getElementById("mainArea");
  main.appendChild(elem);
}

function updateTodos(todos) {
  const currTodos = document.getElementById("mainArea").children;
  let i = 0,
    len = currTodos.length;
  for (; i < todos.length; i++) {
    if (i >= len) addTodo(todos[i]);
    else {
      let [title, description] = currTodos[i].children;
      if (title.innerHTML != todos[i].title) title.innerHTML = todos[i].title;
      if (description.innerHTML != todos[i].description)
        description.innerHTML = todos[i].description;
    }
  }
  while (i < currTodos.length) {
    currTodos[i].remove();
    i++;
  }
}

function getTodos() {
  let main = document.getElementById("mainArea");

  fetch(server + "todos", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((todos) => updateTodos(todos));
}

function deleteTodo(id) {
  fetch(server + "todos/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((val) => document.getElementById(id).remove())
    .then((res) => console.log("removed"));
}

function onPress() {
  let title = document.getElementById("title").value;
  let description = document.getElementById("description").value;
  fetch(server + "todos", {
    method: "POST",
    body: JSON.stringify({
      title: title,
      description: description,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((json) => addTodo(json));
}

getTodos();
