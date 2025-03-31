import { TodoModel } from '../models/TodoModel';

const API_URL = 'http://localhost:5000/api/todo';

export async function getAllTodos(): Promise<TodoModel[]> {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch todos');
  }
  return response.json();
}

export async function getTodosByDate(date: Date): Promise<TodoModel[]> {
  const formattedDate = date.toISOString().split('T')[0];
  const response = await fetch(`${API_URL}/date/${formattedDate}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch todos for date ${formattedDate}`);
  }
  return response.json();
}

export async function getUncompletedTodosBeforeDate(date: Date): Promise<TodoModel[]> {
  const formattedDate = date.toISOString().split('T')[0];
  const response = await fetch(`${API_URL}/uncompleted/${formattedDate}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch uncompleted todos before ${formattedDate}`);
  }
  return response.json();
}

export async function addTodo(todo: Omit<TodoModel, 'id' | 'createdAt'>): Promise<TodoModel> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  });
  if (!response.ok) {
    throw new Error('Failed to add todo');
  }
  return response.json();
}

export async function updateTodo(todo: TodoModel): Promise<void> {
  const response = await fetch(`${API_URL}/${todo.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  });
  if (!response.ok) {
    throw new Error(`Failed to update todo with id ${todo.id}`);
  }
}

export async function deleteTodo(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(`Failed to delete todo with id ${id}`);
  }
}