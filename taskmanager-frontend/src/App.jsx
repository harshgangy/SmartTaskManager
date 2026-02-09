import TaskList from "./components/TaskList";

function App() {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "720px" }}>
        <div className="card shadow-lg border-0">
          <div className="card-body p-4">
            <h2 className="text-center text-primary fw-bold mb-4">
              Smart Task Manager
            </h2>

            <TaskList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
