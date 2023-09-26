import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'


function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [completed, setCompleted] = useState(false);

  axios.defaults.baseURL = "http://localhost:3000";

  // fetch all todos from server
  const fetchTodos = () => {
    axios
      .get("/todos")
      .then((res) => {
        setTodos(res.data);
      })
      .catch(err => console.log(err));
  };

  // create a todo
  const createTodo = event => {
    event.preventDefault();
    if(!title){
      alert('Empty title!');
      return;
    }
    axios
      .post("/todos", {title, completed})
      .then((res) => {
        setTodos(todos.concat(res.data));
      })
      .catch( (err) => console.log(err));
      setTitle("");
      setCompleted(false);
  };
  
  useEffect(() => fetchTodos(), []);

  return (
    <>
      <center>
        <div  className="todo-page">
          <h2>Todos</h2>
          <div className="create-todo">
            <form onSubmit={createTodo}>
              <input type="text" placeholder='Enter Task' value={title} onChange={ e => setTitle(e.target.value)}/>
            </form>
          </div>
          <div>
            {todos.map( val => (
              <Todo 
                key={val.id} 
                id={val.id} 
                title={val.title} 
                description={val.description} 
                completed={val.completed} 
                todos={todos}
                setTodos={setTodos}
              />
            )
            )}
          </div>
        </div>
      </center>
    </>
  )
}

function Todo(props) {
  const [completed, setCompleted] = useState(props.completed);
  const { id, todos, setTodos } = props;

  const deleteTodo = () => {
    axios
      .delete(`/todos/${id}`)
      .then(() => {
        setTodos(todos.filter((todo) => todo.id !== id));
      })
      .catch((err) => console.log(err));
  };

  const completeTodo = () => {
    axios
      .put(`/todos/${id}`, {id, completed: !completed })
      .then(() => {
        setCompleted(!completed);
      })
      .catch((err) => console.log(err));
  };
    return <div className="todo-item">
      <span className="checkbox" onClick={completeTodo}>
        {completed?"[x]":"[ ]"}
      </span>
      <h4 className={(completed?"is-complete":"")}>
        {props.title}
      </h4>
      <button onClick={deleteTodo}> X </button>
    </div>
}

export default App
