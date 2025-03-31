import { useState, useEffect, useCallback } from 'react';
import { TodoModel } from '../models/TodoModel';
import * as todoService from '../services/todoService';

export function useTodoViewModel() {
  const [todos, setTodos] = useState<TodoModel[]>([]);
  const [pastDueTodos, setPastDueTodos] = useState<TodoModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // 선택된 날짜의 todos 불러오기
  const fetchTodosByDate = useCallback(async (date: Date) => {
    setLoading(true);
    setError(null);
    try {
      const fetchedTodos = await todoService.getTodosByDate(date);
      setTodos(fetchedTodos);
    } catch (err) {
      setError('할 일을 불러오는 중 오류가 발생했습니다.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // 미완료된 과거 todos 불러오기
  const fetchPastDueTodos = useCallback(async (date: Date) => {
    try {
      const pastDue = await todoService.getUncompletedTodosBeforeDate(date);
      setPastDueTodos(pastDue);
    } catch (err) {
      console.error('미완료된 과거 할 일을 불러오는 중 오류가 발생했습니다:', err);
    }
  }, []);

  // 날짜 변경 핸들러
  const handleDateChange = useCallback((date: Date) => {
    setSelectedDate(date);
  }, []);

  // 할 일 추가
  const addTodo = useCallback(async (title: string, description: string) => {
    try {
      await todoService.addTodo({
        title,
        description,
        dueDate: selectedDate.toISOString(),
        isCompleted: false,
      });
      fetchTodosByDate(selectedDate);
    } catch (err) {
      setError('할 일을 추가하는 중 오류가 발생했습니다.');
      console.error(err);
    }
  }, [selectedDate, fetchTodosByDate]);

  // 할 일 완료 상태 토글
  const toggleTodoCompletion = useCallback(async (todo: TodoModel) => {
    try {
      const updatedTodo = {
        ...todo,
        isCompleted: !todo.isCompleted,
        completedAt: !todo.isCompleted ? new Date().toISOString() : undefined,
      };
      await todoService.updateTodo(updatedTodo);
      fetchTodosByDate(selectedDate);
      fetchPastDueTodos(selectedDate);
    } catch (err) {
      setError('할 일 상태를 변경하는 중 오류가 발생했습니다.');
      console.error(err);
    }
  }, [selectedDate, fetchTodosByDate, fetchPastDueTodos]);

  // 할 일 삭제
  const deleteTodo = useCallback(async (id: string) => {
    try {
      await todoService.deleteTodo(id);
      fetchTodosByDate(selectedDate);
      fetchPastDueTodos(selectedDate);
    } catch (err) {
      setError('할 일을 삭제하는 중 오류가 발생했습니다.');
      console.error(err);
    }
  }, [selectedDate, fetchTodosByDate, fetchPastDueTodos]);

  // 선택된 날짜 또는 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    fetchTodosByDate(selectedDate);
    fetchPastDueTodos(selectedDate);
  }, [selectedDate, fetchTodosByDate, fetchPastDueTodos]);

  return {
    todos,
    pastDueTodos,
    loading,
    error,
    selectedDate,
    handleDateChange,
    addTodo,
    toggleTodoCompletion,
    deleteTodo,
  };
}