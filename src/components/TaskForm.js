// TaskForm.jsx
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addTask, updateTask } from "../features/tasks/taskSlice";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  priority: yup.string().oneOf(["Low", "Medium", "High"]).required(),
  state: yup.string().oneOf(["todo", "doing", "done"]).required(),
});

const TaskForm = ({
  onSubmit,
  initialValues = {},
  editingTask,
  setEditingTask,
}) => {
  const dispatch = useDispatch();
  const [imagePreview, setImagePreview] = useState(initialValues.image || "");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
  });

  // Reset form when initialValues change (for editing mode)
  useEffect(() => {
    reset(initialValues);
    setImagePreview(initialValues.image || "");
  }, [reset]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const submitForm = (data) => {
    const image = imagePreview;
    if (initialValues.id) {
      dispatch(updateTask({ id: initialValues.id, data: { ...data, image } }));
    } else {
      dispatch(addTask({ id: Date.now(), ...data, image }));
    }
    onSubmit && onSubmit();
  };

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className={editingTask ? "EditingForm" : "FormMain"}
    >
      {editingTask && <h3> Edit Your Task</h3>}
      {editingTask && (
        <span onClick={() => setEditingTask(null)} className="CLosingEditing">
          ✖️
        </span>
      )}
      <input {...register("title")} placeholder="Task Title" />
      <p style={{ color: "tomato" }}>{errors.title?.message}</p>

      <textarea {...register("description")} placeholder="Description" />
      <p style={{ color: "tomato" }}>{errors.description?.message}</p>

      <select {...register("priority")}>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <p>{errors.priority?.message}</p>

      <select {...register("state")}>
        <option value="todo">To Do</option>
        <option value="doing">Doing</option>
        <option value="done">Done</option>
      </select>
      <p>{errors.state?.message}</p>

      <input type="file" onChange={handleImageChange} />
      {imagePreview && <img src={imagePreview} alt="Preview" width={100} />}

      <button type="submit">{initialValues.id ? "Update" : "Save"} Task</button>
    </form>
  );
};

export default TaskForm;
