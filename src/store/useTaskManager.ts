import create from 'zustand';

const useTaskManager = create((set) => ({
  tasks: [],

  // Recherche d'une tâche en fonction du titre
  searchTask: (title) => {
    set((state) => ({
      // Filtre les tâches en fonction du titre recherché
      tasks: state.tasks.filter((task) =>
        task.title.toLowerCase().includes(title.toLowerCase())
      ),
    }));
  },

  // Ajout d'une nouvelle tâche
  addTask: (newTask) => {
    set((state) => ({
      // Ajoute la nouvelle tâche à la liste des tâches existantes
      tasks: [...state.tasks, newTask],
    }));
  },

  // Mise à jour du titre d'une tâche existante
  updateTask: (taskId, updatedTitle) => {
    set((state) => ({
      // Met à jour le titre de la tâche correspondante dans la liste des tâches
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, title: updatedTitle } : task
      ),
    }));
  },

  // Suppression d'une tâche
  deleteTask: (taskId) => {
    set((state) => ({
      // Filtre les tâches en excluant celle avec l'ID donné
      tasks: state.tasks.filter((task) => task.id !== taskId),
    }));
  },
}));

export { useTaskManager };
