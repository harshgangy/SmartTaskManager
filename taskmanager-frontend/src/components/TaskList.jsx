import { useEffect, useState } from "react";
import { getAllTasks, deleteTask, updateTask } from "../api/taskApi";
import TaskForm from "./TaskForm";
import { toast } from "react-toastify";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const loadTasks = () => {
    getAllTasks()
      .then((res) => setTasks(res.data))
      .catch(() => toast.error("Failed to load tasks"));
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleDelete = (id) => {
    deleteTask(id).then(() => {
      toast.success("Task deleted");
      loadTasks();
    });
  };

  const handleUpdate = () => {
    updateTask(editingTask.id, editingTask).then(() => {
      toast.success("Task updated");
      setEditingTask(null);
      loadTasks();
    });
  };

  const today = new Date().toISOString().split("T")[0];

  const filteredTasks = tasks
    .filter((task) =>
      task.title.toLowerCase().includes(searchText.toLowerCase())
    )
    .filter((task) =>
      statusFilter === "ALL" ? true : task.status === statusFilter
    );

  return (
    <div>
      <TaskForm onTaskAdded={() => {
        toast.success("Task added");
        loadTasks();
      }} />

      {/* SEARCH & FILTER */}
      <div className="row mb-3">
        <div className="col-md-8">
          <input
            className="form-control"
            placeholder="Search by title..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        <div className="col-md-4">
          <select
            className="form-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="ALL">All Status</option>
            <option value="TODO">TODO</option>
            <option value="IN_PROGRESS">IN PROGRESS</option>
            <option value="DONE">DONE</option>
          </select>
        </div>
      </div>

      {/* TASK LIST */}
      {filteredTasks.length === 0 && (
        <p className="text-muted text-center">No tasks found</p>
      )}

      {filteredTasks.map((task) => {
        const isOverdue =
          task.dueDate && task.dueDate < today && task.status !== "DONE";

        const statusColor =
          task.status === "TODO"
            ? "secondary"
            : task.status === "IN_PROGRESS"
            ? "primary"
            : "success";

        const priorityColor =
          task.priority === "HIGH"
            ? "danger"
            : task.priority === "MEDIUM"
            ? "warning"
            : "info";

        return (
          <div
            key={task.id}
            className={`card mb-3 border-start border-4 ${
              isOverdue ? "border-danger" : `border-${statusColor}`
            }`}
            style={{
              backgroundColor: isOverdue ? "#fff5f5" : "white"
            }}
          >
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start">
                <h5 className="mb-1">{task.title}</h5>

                <div>
                  <span className={`badge bg-${statusColor}`}>
                    {task.status.replace("_", " ")}
                  </span>

                  {isOverdue && (
                    <span className="badge bg-danger ms-2">Overdue</span>
                  )}
                </div>
              </div>

              <p className="text-muted small">
                {task.description || "No description"}
              </p>

              <div className="d-flex justify-content-between align-items-center">
                <span className={`badge bg-${priorityColor}`}>
                  Priority: {task.priority}
                </span>

                <div>
                  <button
                    className="btn btn-outline-primary btn-sm me-2"
                    onClick={() => setEditingTask({ ...task })}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleDelete(task.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* EDIT MODAL */}
      {editingTask && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5>Edit Task</h5>
                <button
                  className="btn-close"
                  onClick={() => setEditingTask(null)}
                />
              </div>

              <div className="modal-body">
                <input
                  className="form-control mb-2"
                  value={editingTask.title}
                  onChange={(e) =>
                    setEditingTask({ ...editingTask, title: e.target.value })
                  }
                />

                <textarea
                  className="form-control mb-2"
                  value={editingTask.description || ""}
                  onChange={(e) =>
                    setEditingTask({
                      ...editingTask,
                      description: e.target.value
                    })
                  }
                />

                <select
                  className="form-select mb-2"
                  value={editingTask.status}
                  onChange={(e) =>
                    setEditingTask({ ...editingTask, status: e.target.value })
                  }
                >
                  <option value="TODO">TODO</option>
                  <option value="IN_PROGRESS">IN PROGRESS</option>
                  <option value="DONE">DONE</option>
                </select>

                <select
                  className="form-select"
                  value={editingTask.priority}
                  onChange={(e) =>
                    setEditingTask({
                      ...editingTask,
                      priority: e.target.value
                    })
                  }
                >
                  <option value="LOW">LOW</option>
                  <option value="MEDIUM">MEDIUM</option>
                  <option value="HIGH">HIGH</option>
                </select>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setEditingTask(null)}
                >
                  Cancel
                </button>

                <button className="btn btn-primary" onClick={handleUpdate}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskList;
