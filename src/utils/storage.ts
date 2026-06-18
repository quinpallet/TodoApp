import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from '../types';

const STORAGE_KEY = '@todo_tasks';

export const saveTasks = async (tasks: Task[]): Promise<void> => {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

export const loadTasks = async (): Promise<Task[]> => {
  const data = await AsyncStorage.getItem(STORAGE_KEY);
  if (!data) return [];
  return JSON.parse(data).map((t: any) => ({
    ...t,
    createdAt: new Date(t.createdAt),
    dueDate: t.dueDate ? new Date(t.dueDate) : undefined,
  }));
};
