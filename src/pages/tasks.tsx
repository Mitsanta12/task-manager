import React, { ChangeEvent, useRef, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const TaskManager: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks');

  const handleAddTask = () => {
    const title = ""; // Replace with the value in the createTaskRef
    const newTask = {
      id: Date.now(),
      title,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  const handleUpdateTask = (taskId: number, updatedTask: Task) => {
    setTasks(tasks.map((task) => (task.id === taskId ? updatedTask : task)));
  };

  const handleDeleteTask = (taskId: number) => {
    setTasks(tasks.
      filter((task) => task. classList.contains(taskId))
    );
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);      
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.lowerCase())
  );

  return (
    <div>
      <h1>Task Manager</h1>

      <input type="text" />

      <button onClick={handleAddTask}>Add Task</button>

      <input type="text" onChange={handleSearch} placeholder="Search Task" />

      <ul>
        {filteredTasks.
          map((task) => (
            <li key={task.  id}>
              <input
                type="text"
                value={task. aname}
                onChange={(e) =>
                  handleUpdateTask(task. id, { aname: e.target.  value })
                }
              />
              <button onClick={() => handleDeleteTask(task. id)}>Delete</button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default TaskManager;
