'use client';

import { TodoModel } from '../../models/TodoModel';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: TodoModel[];
  pastDueTodos: TodoModel[];
  onToggleCompletion: (todo: TodoModel) => void;
  onDelete: (id: string) => void;
}

export default function TodoList({ 
  todos, 
  pastDueTodos, 
  onToggleCompletion, 
  onDelete 
}: TodoListProps) {
  return (
    <div className="bg-white rounded-lg elevation-2 overflow-hidden">
      {/* 미완료된 이전 할 일 */}
      {pastDueTodos.length > 0 && (
        <div className="border-b border-gray-100">
          <div className="px-4 py-3 bg-red-50">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-base font-medium text-red-700">미완료된 이전 할 일</h3>
            </div>
          </div>
          
          <div className="divide-y divide-gray-100">
            {pastDueTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggleCompletion={onToggleCompletion}
                onDelete={onDelete}
                isPastDue
              />
            ))}
          </div>
        </div>
      )}

      {/* 오늘의 할 일 */}
      <div>
        <div className="px-4 py-3 bg-blue-50 border-b border-gray-100">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3 className="text-base font-medium text-blue-700">오늘의 할 일</h3>
          </div>
        </div>
        
        {todos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            <p className="text-gray-500">오늘은 계획된 할 일이 없습니다.</p>
            <p className="text-gray-400 text-sm mt-1">아래에서 새로운 할 일을 추가해 보세요!</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggleCompletion={onToggleCompletion}
                onDelete={onDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}