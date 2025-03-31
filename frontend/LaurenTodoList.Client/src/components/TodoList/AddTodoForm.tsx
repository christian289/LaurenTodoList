'use client';

import { useState } from 'react';

interface AddTodoFormProps {
  onAddTodo: (title: string, description: string) => Promise<void>;
}

export default function AddTodoForm({ onAddTodo }: AddTodoFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsAdding(true);
    try {
      await onAddTodo(title, description);
      setTitle('');
      setDescription('');
      setIsExpanded(false);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="bg-white rounded-lg elevation-2 overflow-hidden">
      <div className="px-4 py-3 bg-blue-50 border-b border-gray-100">
        <div className="flex items-center">
          <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <h3 className="text-base font-medium text-blue-700">새 할 일 추가</h3>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-4">
        <div className="space-y-4">
          {/* 제목 입력 */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              제목
              <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="relative rounded-md shadow-sm">
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="
                  block w-full py-2 px-3 border border-gray-300 rounded-md
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                  transition-colors duration-200
                "
                placeholder="할 일 제목을 입력하세요"
                onClick={() => !isExpanded && setIsExpanded(true)}
                required
              />
            </div>
          </div>

          {/* 설명 입력 (확장 시) */}
          <div 
            className={`
              transition-all duration-300 overflow-hidden
              ${isExpanded ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 -mt-4 pointer-events-none'}
            `}
          >
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              설명 (선택사항)
            </label>
            <div className="relative rounded-md shadow-sm">
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="
                  block w-full py-2 px-3 border border-gray-300 rounded-md
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                  transition-colors duration-200
                "
                rows={3}
                placeholder="할 일에 대한 추가 설명을 입력하세요"
              />
            </div>
          </div>

          {/* 제출 버튼 */}
          <div className={`flex justify-end ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              className="
                mr-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white
                border border-gray-300 rounded-md shadow-sm
                hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500
                transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed
              "
              disabled={isAdding}
            >
              취소
            </button>
            <button
              type="submit"
              disabled={!title.trim() || isAdding}
              className="
                px-4 py-2 text-sm font-medium text-white bg-blue-600
                border border-transparent rounded-md shadow-sm
                hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500
                transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed
              "
            >
              {isAdding ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  추가 중...
                </span>
              ) : '추가하기'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}