import { useState, useEffect } from 'react';
import { Task, Category } from '../types';
import { saveTasks, loadTasks } from '../utils/storage';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    loadTasks().then(setTasks);
  }, []);

  const addTask = async (title: string, category: Category, description?: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      category,
      completed: false,
      createdAt: new Date(),
    };
    const updated = [newTask, ...tasks];
    setTasks(updated);
    await saveTasks(updated);
  };

  const toggleTask = async (id: string) => {
    const updated = tasks.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    setTasks(updated);
    await saveTasks(updated);
  };

  const deleteTask = async (id: string) => {
    const updated = tasks.filter(t => t.id !== id);
    setTasks(updated);
    await saveTasks(updated);
  };

  return { tasks, addTask, toggleTask, deleteTask };
};
