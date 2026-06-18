export type Category = '仕事' | '個人' | '勉強' | 'その他';

export interface Task {
  id: string;
  title: string;
  description?: string;
  category: Category;
  completed: boolean;
  createdAt: Date;
  dueDate?: Date;
}
