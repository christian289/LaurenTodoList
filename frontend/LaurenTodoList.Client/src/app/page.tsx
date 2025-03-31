'use client';

import { useState } from 'react';
import { useTodoViewModel } from '../viewmodels/TodoViewModel';
import Header from '../components/Layout/Header';
import MonthView from '../components/Calendar/MonthView';
import TodoList from '../components/TodoList/TodoList';
import AddTodoForm from '../components/TodoList/AddTodoForm';

export default function Home() {
  const {
    todos,
    pastDueTodos,
    loading,
    error,
    selectedDate,
    handleDateChange,
    addTodo,
    toggleTodoCompletion,
    deleteTodo,
  } = useTodoViewModel();
  
  const [isAddingNew, setIsAddingNew] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 pb-20">
        {/* 달력 뷰 */}
        <div className="container mx-auto px-4 pt-3 pb-1">
          <MonthView selectedDate={selectedDate} onDateChange={handleDateChange} />
        </div>
        
        {/* 에러 메시지 */}
        {error && (
          <div className="container mx-auto px-4 py-2">
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded mb-4 elevation-1">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium">에러:</span>
                <span className="ml-1">{error}</span>
              </div>
            </div>
          </div>
        )}
        
        {/* 로딩 인디케이터 */}
        {loading ? (
          <div className="container mx-auto px-4 py-12 flex items-center justify-center">
            <div className="text-center">
              <div className="inline-block w-12 h-12">
                <svg className="animate-spin w-12 h-12 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
              <p className="mt-3 text-gray-600">데이터를 불러오는 중...</p>
            </div>
          </div>
        ) : (
          <div className="container mx-auto px-4 py-2">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 할 일 목록 */}
              <div className="order-2 lg:order-1 fade-in">
                <TodoList
                  todos={todos}
                  pastDueTodos={pastDueTodos}
                  onToggleCompletion={toggleTodoCompletion}
                  onDelete={deleteTodo}
                />
              </div>
              
              {/* 할 일 추가 폼 */}
              <div className="order-1 lg:order-2 fade-in">
                <AddTodoForm onAddTodo={addTodo} />
              </div>
            </div>
          </div>
        )}
      </main>
      
      {/* 플로팅 액션 버튼 (모바일 전용) */}
      <div className="fixed right-6 bottom-6 lg:hidden">
        <button
          onClick={() => setIsAddingNew(!isAddingNew)}
          className="
            w-14 h-14 rounded-full bg-blue-600 text-white shadow-lg
            flex items-center justify-center focus:outline-none
            hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
            transition-all duration-300 elevation-3
          "
          aria-label="새 할 일 추가"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
      </div>
    </div>
  );
}