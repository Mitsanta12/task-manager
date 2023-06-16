import React, { ChangeEvent, useRef, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const TaskManager: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);

  const createTaskRef = useRef<HTMLInputElement>(null); // Référence pour l'input d'ajout de tâche

  const handleAddTask = () => {
    const title = createTaskRef.current?.value || ''; // Récupère la valeur de l'input ou une chaîne vide
    const newTask = {
      id: Date.now(),
      title,
      completed: false,
    };
    setTasks([...tasks, newTask]); // Ajoute la nouvelle tâche à la liste des tâches
  };

  const handleUpdateTask = (taskId: number, updatedTask: Task) => {
    setTasks(tasks.map((task) => (task.id === taskId ? updatedTask : task))); // Met à jour la tâche avec l'ID correspondant
  };

  const handleDeleteTask = (taskId: number) => {
    setTasks(tasks.filter((task) => task.id !== taskId)); // Supprime la tâche avec l'ID correspondant
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value); // Met à jour le terme de recherche
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) // Filtre les tâches en fonction du terme de recherche
  );

  return (
    <div>
      <h1>Task Manager</h1>

      <input type="text" ref={createTaskRef} /> {/* Input pour ajouter une nouvelle tâche */}

      <button onClick={handleAddTask}>Add Task</button> {/* Bouton pour ajouter une tâche */}

      <input type="text" onChange={handleSearch} placeholder="Search Task" /> {/* Input de recherche */}

      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>
            <input
              type="text"
              value={task.title}
              onChange={(e) =>
                handleUpdateTask(task.id, { ...task, title: e.target.value }) // Met à jour le titre de la tâche
              }
            />
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button> {/* Bouton pour supprimer la tâche */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
