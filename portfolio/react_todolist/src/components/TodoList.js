import React from 'react';
// Importing Components
import Todo from './Todo';

function TodoList(props) {
  const { todos, setTodos, filteredTodos } = props;
  // console.log(todos); // for check
  return (
    <>
      <div class="todo-container">
        <ul class="todo-list">
          {filteredTodos.map((todo) => (
            <Todo
              key={todo.id}
              text={todo.text}
              todos={todos}
              setTodos={setTodos}
              todo={todo}
            />
          ))}
        </ul>
      </div>
    </>
  );
}

export default TodoList;
