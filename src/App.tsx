import React, { useEffect, useState } from 'react';
import TodoList from './components/TodoList';
import NewTodo from './components/NewTodo';
import './App.css';

export interface Todo {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [darkMode, setDarkMode] = useState(false);

  const fetchTodos = async () => {
    try {
      const res = await fetch('https://idiating-tribe-backend.vercel.app/wp-json/wp/v2/todo');
      const data = await res.json();
      setTodos(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = (todo: Todo) => {
    setTodos((prev) => [...prev, todo]);
  };

  const updateTodo = (updated: Todo) => {
    setTodos((prev) => prev.map(todo => todo._id === updated._id ? updated : todo));
  };

  const deleteTodo = async (id: string) => {
    try {
      await fetch(`https://idiating-tribe-backend.vercel.app/todos/${id}`, { method: 'DELETE' });
      setTodos((prev) => prev.filter(todo => todo._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={darkMode ? 'app dark' : 'app'}>
      <div className="container">
        <h1>IdiatingTribe Assignment</h1>
        <button onClick={() => setDarkMode(!darkMode)} className="theme-btn">
          Toggle {darkMode ? 'Light' : 'Dark'} Mode
        </button>
        <NewTodo onAdd={addTodo} />
        <TodoList
          todos={todos}
          onUpdate={updateTodo}
          onDelete={deleteTodo}
        />
      </div>
    </div>
  );
}

export default App;

