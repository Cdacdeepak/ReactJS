import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newDueDate, setNewDueDate] = useState('');
  const [newPriority, setNewPriority] = useState('Low');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    setTasks(storedTasks);
  }, []);
  

  const saveTasksToLocalStorage = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  const addTask = () => {
    if (newTask && newDescription && newDueDate) {
      const updatedTasks = [
        ...tasks,
        {
          id: Date.now(),
          title: newTask,
          description: newDescription,
          dueDate: newDueDate,
          priority: newPriority,
          isComplete: false,
        },
      ];
      setTasks(updatedTasks);
      saveTasksToLocalStorage(updatedTasks);
      setNewTask('');
      setNewDescription('');
      setNewDueDate('');
      setNewPriority('Low');
    }
  };

  const markComplete = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, isComplete: true } : task
    );
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  const getPriorityClass = (priority) => { 
    switch (priority) {
      case "Low":
        return "rounded-pill text-bg-success";
      case "Medium":
        return "rounded-pill text-bg-warning";
      case "High":
        return "rounded-pill text-bg-danger";
      default:
        return "rounded-pill text-bg-secondary";
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">To-Do List</h1>
      <div className="mb-3 row">
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Task title"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
        </div>
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Description"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
        </div>
        <div className="col">
          <input
            type="date"
            className="form-control"
            value={newDueDate}
            onChange={(e) => setNewDueDate(e.target.value)}
          />
        </div>
        <div className="col">
          <select
            className="form-control"
            value={newPriority}
            onChange={(e) => setNewPriority(e.target.value)}

          >
            
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div className="col">
          <button className="btn btn-primary" onClick={addTask}>
            Add Task
          </button>
        </div>
      </div>
      <div className="task-list">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`task card mb-3 ${task.isComplete ? 'bg-success text-white' : ''}`}
          >
            <div className="card-body">
              <h3 className="card-title">{task.title}</h3>
              <p className="card-text">{task.description}</p>
              <p className="card-text">Due Date: {task.dueDate}</p>
              {/* <p className="card-text">Priority: {task.priority}</p> */}
              <p className="card-text">
                Priority:{" "}
                <span className={`badge ${getPriorityClass(task.priority)}`}>
                  {task.priority}
                </span>
              </p>
              {!task.isComplete && (
                <button className="btn btn-success " onClick={() => markComplete(task.id)}>
                  Mark Complete
                </button>
              )}
              <button className="btn btn-danger ms-2" onClick={() => deleteTask(task.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
