'use client';

import { useState } from 'react';
import { TodoModel } from '../../models/TodoModel';

interface TodoItemProps {
  todo: TodoModel;
  onToggleCompletion: (todo: TodoModel) => void;
  onDelete: (id: string) => void;
  isPastDue?: boolean;
}

export default function TodoItem({ 
  todo, 
  onToggleCompletion, 
  onDelete, 
  isPastDue = false 
}: TodoItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    // 삭제 애니메이션을 위한 타임아웃
    setTimeout(() => {
      onDelete(todo.id);
    }, 300);
  };

  return (
    <div 
      className={`
        transition-all duration-300 overflow-hidden
        ${isDeleting ? 'max-h-0 opacity-0 scale-95' : 'opacity-100 scale-100'}
        ${todo.isCompleted ? 'bg-gray-50' : (isPastDue ? 'bg-red-50' : 'bg-white')}
      `}
    >
      <div className="px-4 py-3">
        {/* 할 일 항목 헤더 */}
        <div className="flex items-center">
          {/* 체크박스 */}
          <div className="relative flex items-center">
            <input
              type="checkbox"
              id={`todo-${todo.id}`}
              checked={todo.isCompleted}
              onChange={() => onToggleCompletion(todo)}
              className={`
                w-5 h-5 rounded-full border-2 appearance-none cursor-pointer
                checked:bg-blue-600 checked:border-transparent
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                transition-colors duration-200
                ${isPastDue ? 'border-red-400' : 'border-gray-300'}
              `}
            />
            <label 
              htmlFor={`todo-${todo.id}`}
              className="absolute inset-0 w-5 h-5 cursor-pointer flex items-center justify-center"
            >
              {todo.isCompleted && (
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </label>
          </div>

          {/* 할 일 제목 */}
          <div className="ml-3 flex-1">
            <h4 
              className={`
                font-medium transition-all duration-200
                ${todo.isCompleted 
                  ? 'line-through text-gray-400' 
                  : isPastDue 
                    ? 'text-red-700' 
                    : 'text-gray-800'}
              `}
            >
              {todo.title}
            </h4>
          </div>

          {/* 삭제 버튼 */}
          <button
            onClick={handleDelete}
            className={`
              ml-2 p-2 rounded-full text-gray-400
              hover:bg-gray-100 hover:text-red-500
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500
              transition-colors duration-200
            `}
            aria-label="삭제"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>

          {/* 확장 토글 버튼 (설명이 있을 때만) */}
          {todo.description && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={`
                ml-1 p-2 rounded-full text-gray-400
                hover:bg-gray-100 hover:text-gray-700
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                transition-colors duration-200
              `}
              aria-label={isExpanded ? '접기' : '자세히 보기'}
            >
              <svg 
                className={`w-5 h-5 transition-transform duration-200 ${isExpanded ? 'transform rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          )}
        </div>

        {/* 할 일 설명 (확장 시) */}
        {todo.description && (
          <div 
            className={`
              mt-2 pl-8 text-sm transition-all duration-300 overflow-hidden
              ${isExpanded ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}
              ${todo.isCompleted ? 'text-gray-400' : isPastDue ? 'text-red-600' : 'text-gray-600'}
            `}
          >
            {todo.description}
          </div>
        )}
      </div>
    </div>
  );
}