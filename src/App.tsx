// src/App.tsx

import React, { useState } from "react";
import Layout from "./components/Layout";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");
  const [editTodoId, setEditTodoId] = useState<number | null>(null); // Düzenlenen todo'nun id'sini saklar
  const [editText, setEditText] = useState<string>(""); // Düzenleme yapılacak metin

  const addTodo = () => {
    if (newTodo.trim() === "") return;

    const newTodoItem: Todo = {
      id: Date.now(),
      text: newTodo,
      completed: false,
    };

    setTodos([...todos, newTodoItem]);
    setNewTodo("");
  };

  const toggleComplete = (id: number) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  };

  const editTodo = (id: number, text: string) => {
    setEditTodoId(id);
    setEditText(text);
  };

  const saveEdit = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, text: editText } : todo
    ));
    setEditTodoId(null);
    setEditText("");
  };

  return (
    <Layout>
      <div className="bg-white p-4 rounded-md h-98 overflow-y-auto" style={{ backgroundColor: "rgba(255, 255, 255, 0.6)" }}>
        <h1 className="text-4xl font-extrabold text-indigo-600 text-center mb-6">
          To-do List
        </h1>

        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="border border-indigo-300 p-2 w-full mb-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 transition-all duration-300 ease-in-out"
          placeholder="Add a new task"
        />
        <button
          onClick={addTodo}
          className="bg-indigo-600 text-white w-full py-2 mb-6 rounded-md hover:bg-indigo-900"
        >
          Add Task
        </button>

        <ul className="space-y-4">
          {todos.map(todo => (
            <li
              key={todo.id}
              className={`p-4 rounded-lg shadow-md ${todo.completed ? "bg-green-100 text-gray-500" : "bg-gray-100 text-black"}`}
              style={{
                background: todo.completed ? "#d1fae5" : "#f3f4f6",
                transition: "background-color 0.3s ease",
              }}
            >
              <div className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleComplete(todo.id)}
                  className="form-checkbox h-5 w-5 text-indigo-600"
                />
                {editTodoId === todo.id ? (
                  <div className="flex items-center space-x-4 w-full">
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="border p-2 w-full mb-4 rounded-md"
                    />
                    <button
                      onClick={() => saveEdit(todo.id)}
                      className="bg-indigo-500 text-white px-2 py-1 rounded-md hover:bg-indigo-700"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <span
                    className={`flex-1 ${todo.completed ? "line-through" : ""}`}
                    onClick={() => toggleComplete(todo.id)}
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    {todo.text}
                  </span>
                )}
                <button
                  onClick={() => setTodos(todos.filter(t => t.id !== todo.id))}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
                <button
                  onClick={() => editTodo(todo.id, todo.text)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Edit
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default App;
