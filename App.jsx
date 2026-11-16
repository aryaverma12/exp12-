import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "";

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [message, setMessage] = useState("");

  async function getTasks() {
    try {
      const response = await fetch(`${API_URL}/api/tasks`);
      if (!response.ok) throw new Error("Could not load tasks");
      const data = await response.json();
      setTasks(data);
      setMessage("");
    } catch (error) {
      setMessage("Unable to connect to the server. Please try again.");
      console.error(error);
    }
  }

  useEffect(() => {
    getTasks();
  }, []);

  async function addTask(event) {
    event.preventDefault();
    if (!task.trim()) return;

    try {
      const response = await fetch(`${API_URL}/api/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: task.trim() })
      });

      if (!response.ok) throw new Error("Could not add task");
      setTask("");
      await getTasks();
    } catch (error) {
      setMessage("Unable to add task. Please try again.");
      console.error(error);
    }
  }

  async function deleteTask(id) {
    try {
      const response = await fetch(`${API_URL}/api/tasks/${id}`, {
        method: "DELETE"
      });

      if (!response.ok) throw new Error("Could not delete task");
      await getTasks();
    } catch (error) {
      setMessage("Unable to delete task. Please try again.");
      console.error(error);
    }
  }

  return (
    <main className="container">
      <h1>MERN Task Manager</h1>

      <form className="input-area" onSubmit={addTask}>
        <input
          type="text"
          placeholder="Enter a task"
          value={task}
          onChange={(event) => setTask(event.target.value)}
          aria-label="Enter a task"
        />
        <button type="submit">Add Task</button>
      </form>

      {message && <p className="message">{message}</p>}

      <ul>
        {tasks.map((item) => (
          <li key={item._id}>
            <span>{item.title}</span>
            <button type="button" onClick={() => deleteTask(item._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;