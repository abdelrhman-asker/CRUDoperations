import React from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import Filters from "./components/Filters";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Task Management App</h1>
      <TaskForm />
      <Filters />
      <TaskList />
    </div>
  );
}

export default App;
