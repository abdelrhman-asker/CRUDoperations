import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTask } from "../features/tasks/taskSlice";
const DeleteConf = (task) => {
  const dispatch = useDispatch();
  return (
    <div className="MainDeleteConfirmation">
      <div className="DeleteConf">
        <h2>Are you sure you want to delete this record?</h2>
        <div>
          <button onClick={() => dispatch(deleteTask(task.id))}>Delete</button>
          <button>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConf;
