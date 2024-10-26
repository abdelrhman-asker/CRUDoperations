import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTask } from "../features/tasks/taskSlice";
import TaskForm from "./TaskForm";

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const filter = useSelector((state) => state.tasks.filter);
  const dispatch = useDispatch();
  const [confirmation, setConfirmation] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [editingTask, setEditingTask] = useState(null);

  const applyFilters = (task) => {
    const matchesState = filter.state === "all" || task.state === filter.state;
    const matchesPriority =
      filter.priority === "all" || task.priority === filter.priority;
    const matchesSearch = task.title
      .toLowerCase()
      .includes(filter.search.toLowerCase());
    return matchesState && matchesPriority && matchesSearch;
  };

  const tasksByState = {
    todo: tasks.filter((task) => task.state === "todo" && applyFilters(task)),
    doing: tasks.filter((task) => task.state === "doing" && applyFilters(task)),
    done: tasks.filter((task) => task.state === "done" && applyFilters(task)),
  };

  const handleDelete = (taskId) => {
    dispatch(deleteTask(taskId));
    setConfirmation(false);
  };

  return (
    <div>
      {Object.entries(tasksByState).map(([state, tasks]) => (
        <div key={state} className="task-section">
          <h2
            style={{ color: "gray", textDecoration: "underline solid black" }}
          >
            * {state.toUpperCase()} *
          </h2>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <div key={task.id} className="Results">
                <h3>
                  <span>Title: </span>
                  {task.title}
                </h3>
                <p>
                  <span>Description: </span>
                  {task.description}
                </p>
                <h4
                  className={
                    task.priority === "Low"
                      ? "LowPer"
                      : task.priority === "High"
                      ? "HighPer"
                      : "MedPer"
                  }
                >
                  <span className="perText">Priority: </span>
                  {task.priority}
                </h4>
                <h4>
                  <span>State: </span>
                  {task.state}
                </h4>

                {confirmation && taskToDelete === task.id ? (
                  <div className="MainDeleteConfirmation">
                    <div className="DeleteConf">
                      <h2>Are you sure you want to delete this record?</h2>
                      <div className="Del-Can-Btns">
                        <button onClick={() => handleDelete(task.id)}>
                          Delete
                        </button>
                        <button onClick={() => setConfirmation(false)}>
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                ) : null}
                {task.image && <img src={task.image} alt="Task" width={100} />}

                <button
                  onClick={() => {
                    setConfirmation(true);
                    setTaskToDelete(task.id);
                  }}
                >
                  {" "}
                  🗑️
                </button>
                <button onClick={() => setEditingTask(task)}>✏️ Edit</button>

                {/* Render TaskForm only if editingTask.id matches the current task.id */}
                {editingTask && editingTask.id === task.id && (
                  <TaskForm
                    editingTask={editingTask}
                    setEditingTask={setEditingTask}
                    initialValues={editingTask}
                    onSubmit={() => setEditingTask(null)} // Close form after editing
                  />
                )}
              </div>
            ))
          ) : (
            <p>No tasks available in this category.</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default TaskList;
