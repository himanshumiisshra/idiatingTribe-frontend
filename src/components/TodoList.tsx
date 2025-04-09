import React, { useState } from 'react';
import { Todo } from '../App';

interface Props {
  todos: Todo[];
  onUpdate: (todo: Todo) => void;
  onDelete: (id: string) => void;
}

const TodoList: React.FC<Props> = ({ todos, onUpdate, onDelete }) => {
  const [editId, setEditId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDesc, setEditDesc] = useState('');

  const handleToggle = async (todo: Todo) => {
    try {
      const res = await fetch(`https://idiating-tribe-backend.vercel.app/todos/${todo._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !todo.completed }),
      });
      const updated = await res.json();
      onUpdate(updated);
    } catch (err) {
      console.error(err);
    }
  };

  const startEdit = (todo: Todo) => {
    setEditId(todo._id);
    setEditTitle(todo.title);
    setEditDesc(todo.description || '');
  };

  const handleEdit = async () => {
    try {
      const res = await fetch(`https://idiating-tribe-backend.vercel.app/todos/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: editTitle, description: editDesc }),
      });
      const updated = await res.json();
      onUpdate(updated);
      setEditId(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Todos</h2>
      {todos.length === 0 ? (
        <p>No todos found.</p>
      ) : (
        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo._id} className="todo-item">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggle(todo)}
              />
              {editId === todo._id ? (
                <>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                  <textarea
                    value={editDesc}
                    onChange={(e) => setEditDesc(e.target.value)}
                  />
                  <button onClick={handleEdit}>Save</button>
                  <button onClick={() => setEditId(null)}>Cancel</button>
                </>
              ) : (
                <div className={`todo-text ${todo.completed ? 'completed' : ''}`}>
                  <strong>{todo.title}</strong>
                  <p>{todo.description}</p>
                  <button onClick={() => startEdit(todo)}>Edit</button>
                  <button onClick={() => onDelete(todo._id)}>Delete</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;

