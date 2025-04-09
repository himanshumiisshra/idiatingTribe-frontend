import React, { useState } from 'react';
import { Todo } from '../App';

interface NewTodoProps {
  onAdd: (todo: Todo) => void;
}

const NewTodo: React.FC<NewTodoProps> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newTodo = {
      title,
      description,
      completed: false,
    };

    try {
      const response = await fetch('https://idiating-tribe-backend.vercel.app/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodo),
      });

      if (!response.ok) {
        throw new Error('Failed to create todo');
      }

      const data: Todo = await response.json();
      onAdd(data);
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <h2>Add New Todo</h2>
      <div>
        <label>Title:&nbsp;</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div style={{ marginTop: '10px' }}>
        <label>Description:&nbsp;</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button type="submit" style={{ marginTop: '10px' }}>Add Todo</button>
    </form>
  );
};

export default NewTodo;
