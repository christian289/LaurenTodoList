export interface TodoModel {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  isCompleted: boolean;
  createdAt: string;
  completedAt?: string;
}