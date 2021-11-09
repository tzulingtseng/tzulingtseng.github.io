import React, { useState, useEffect } from 'react';
import './App.css';
// Importing Components
import Form from './components/Form';
import TodoList from './components/TodoList';

function App() {
  // useState
  const [inputText, setInputText] = useState('');
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState('all');
  const [filteredTodos, setFilteredTodos] = useState([]);
  // useEffect
  useEffect(() => {
    getLocalTodos();
  }, []);
  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [todos, status]);
  //functions
  const filterHandler = () => {
    switch (status) {
      case 'completed':
        setFilteredTodos(todos.filter((item) => item.completed));
        break;
      case 'uncompleted':
        setFilteredTodos(todos.filter((item) => !item.completed));
        break;
      case 'all':
        setFilteredTodos(todos);
        break;
    }
  };
  // localStorage
  const getLocalTodos = () => {
    if (localStorage.getItem('todos') === null) {
      localStorage.setItem('todos', JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem('todos'));
      setTodos(todoLocal);
    }
  };
  const saveLocalTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
  };
  return (
    <>
      <div className="App">
        <header>
          <h1>Tzuling's Todo List</h1>
        </header>
        <Form
          todos={todos}
          setTodos={setTodos}
          inputText={inputText}
          setInputText={setInputText}
          setStatus={setStatus}
        />
        <TodoList
          todos={todos}
          setTodos={setTodos}
          filteredTodos={filteredTodos}
        />
      </div>
    </>
  );
}

export default App;
