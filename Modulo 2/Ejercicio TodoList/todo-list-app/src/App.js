import './App.css';
import { useState } from 'react';
import { TodoAdd } from './components/TodoAdd.jsx';
import { TodoList } from './components/TodoList.jsx';
import { useTodo } from './hooks/useTodo.js';


function App() {
  const {
    todos,
    todosCount,
    pendingTodosCount,
    handleNewTodo,
    handleDeleteTodo,
    handleCompleteTodo,
    handleUpdateTodo,
  } = useTodo();
  return (
    <>
      <div className='card-to-do'>
        <h1>Lista de tareas</h1>
        <div className='counter-todos'>
          <h3>
            No. Tareas: <span>{todosCount}</span>
          </h3>
          <h3>
            Pendientes: <span>{pendingTodosCount}</span>
          </h3>
        </div>
        <div className='add-todo'>
          <h3>Agregar Tarea</h3>
          <TodoAdd handleNewTodo={handleNewTodo} />
        </div>

        <TodoList
          todos={todos}
          handleUpdateTodo={handleUpdateTodo}
          handleDeleteTodo={handleDeleteTodo}
          handleCompleteTodo={handleCompleteTodo}
        />
      </div>
    </>
  );
}

export default App;
