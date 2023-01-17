import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'

function TodoPage() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState({});
    const [selectedTodo, setSelectedTodo] = useState({});

    useEffect(() => {
        getTodos();
    }, []);

    const getTodos = async () => {
        const result = await axios.get('https://localhost:44373/api/Todo');
        setTodos(result.data);
    }

    const handleNewTodoChange = (event) => {
        setNewTodo({ ...newTodo, [event.target.name]: event.target.value });
    }

    const handleSelectedTodoChange = (event) => {
        setSelectedTodo({ ...selectedTodo, [event.target.name]: event.target.value });
    }

    const createTodo = async () => {
      await axios.post('https://localhost:44373/api/Todo', {
          description: newTodo.description,
          isComplete: false
      });
      getTodos();
  }
  
  const updateTodo = async (todoId) => {
      await axios.put(`https://localhost:44373/api/Todo/${todoId}`, {
          id: selectedTodo.id,
          description: selectedTodo.description,
          isComplete: selectedTodo.isComplete
      });
      getTodos();
  }
  

    const getTodo = async (todoId) => {
        const result = await axios.get(`https://localhost:44373/api/Todo/${todoId}`);
        setSelectedTodo(result.data);
    }

    return (
      <div className="todo-page">
        <h1>Todo List</h1>
        <div>            
            <h2>All Todos</h2>
            <ul className="todo-list">
                {todos.map((todo) => (
                    <li className="todo-item" key={todo.id}>
                        {todo.description} - {todo.isComplete ? 'Completed' : 'Incomplete'}
                        <button onClick={() => getTodo(todo.id)}>Edit</button>
                    </li>
                ))}
            </ul>
        </div>
        <div className="create-form">
            <h2>Create Todo</h2>
            <input type="text" name="description" placeholder="Description" onChange={handleNewTodoChange} />
            <button onClick={createTodo}>Create</button>
        </div>
        <div className="edit-form">
            <h2>Edit Todo</h2>
            <input type="text" name="description" placeholder="Description" value={selectedTodo.description} onChange={handleSelectedTodoChange} />
            <button onClick={() => updateTodo(selectedTodo.id)}>Save</button>
        </div>
      </div>
    );
    
}
export default TodoPage;
