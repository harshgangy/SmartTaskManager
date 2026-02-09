import { useState } from "react";
import { createTask } from "../api/taskApi";

function TaskForm({ onTaskAdded }) {
  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "TODO",
    priority: "MEDIUM",
    dueDate: ""
  });

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!task.title.trim()) {
      alert("Title is required");
      return;
    }

    createTask(task)
      .then(() => {
        setTask({
          title: "",
          description: "",
          status: "TODO",
          priority: "MEDIUM",
          dueDate: ""
        });

        onTaskAdded(); // reload task list
      })
      .catch((err) => {
        console.error("Error creating task:", err);
        alert("Failed to add task");
      });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h5 className="mb-3">Add Task</h5>

      <input
        type="text"
        name="title"
        className="form-control mb-2"
        placeholder="Task title"
        value={task.title}
        onChange={handleChange}
        required
      />

      <textarea
        name="description"
        className="form-control mb-2"
        placeholder="Task description"
        value={task.description}
        onChange={handleChange}
      />

      <div className="row mb-2">
        <div className="col">
          <select
            name="status"
            className="form-select"
            value={task.status}
            onChange={handleChange}
          >
            <option value="TODO">TODO</option>
            <option value="IN_PROGRESS">IN PROGRESS</option>
            <option value="DONE">DONE</option>
          </select>
        </div>

        <div className="col">
          <select
            name="priority"
            className="form-select"
            value={task.priority}
            onChange={handleChange}
          >
            <option value="LOW">LOW</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HIGH">HIGH</option>
          </select>
        </div>
      </div>

      <input
        type="date"
        name="dueDate"
        className="form-control mb-3"
        value={task.dueDate}
        onChange={handleChange}
      />

      <button type="submit" className="btn btn-primary w-100">
        Add Task
      </button>
    </form>
  );
}

export default TaskForm;
