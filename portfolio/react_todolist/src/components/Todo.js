import React from 'react';

function Todo(props) {
  const { text, todo, todos, setTodos } = props;
  const deleteHandler = () => {
    console.log(todo); // for check
    setTodos(todos.filter((el) => el.id !== todo.id));
  };
  const completeHandler = () => {
    setTodos(
      todos.map((item) => {
        if (item.id === todo.id) {
          return { ...item, completed: !todo.completed };
        }
        return item;
      })
    );
  };
  return (
    <>
      <div className="todo">
        <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
          {text}
        </li>
        <button onClick={completeHandler} className="complete-btn">
          <i className="fas fa-check"></i>
        </button>
        <button onClick={deleteHandler} className="trash-btn">
          <i className="fas fa-trash"></i>
        </button>
      </div>
    </>
  );
}

export default Todo;
