import React from "react";
import AuthGoogle from "./assets/Components/AuthGoogle";
import TodoList from "./assets/Components/TodoList/TodoList";
import "./App.css";
function App() {
  return (
    <div>
      <h1>ToDo Uygulaması</h1>
      <AuthGoogle />
      <TodoList></TodoList>
    </div>
  );
}

export default App;
