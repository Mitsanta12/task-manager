import create from 'zustand';

interface Task {
  id: number;
  title: string;
}

const useTaskManager = create<Task[]>((set, get) => ({
  tasks: [],
  //for adding task with method push
  addTask: (task: Task) => set((state) => {
    state.tasks.push(task);
  }),

//for updating task
  updateTask: (index: number, updatedTask: Task) => set((state) => {
    state.tasks[index] = updatedTask;
  }),

  // for deleting a specific task by index
  deleteTask: (index: number) => set((state) => {
    state.tasks.splice(index, 1);
  }),

  // for searching another task in storage
  searchTask: (title: string) => get((state) => state.tasks.find((task) => task.title === title)),
}));

export { useTaskManager };