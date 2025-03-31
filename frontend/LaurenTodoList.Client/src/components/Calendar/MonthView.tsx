'use client';

import { useRef, useEffect, useState } from 'react';
import DayItem from './DayItem';

interface MonthViewProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

export default function MonthView({ selectedDate, onDateChange }: MonthViewProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date(selectedDate));

  // 월의 모든 일자 가져오기
  const getDaysInMonth = (year: number, month: number) => {
    const days = [];
    
    // 해당 월의 시작 요일 (0: 일요일, 1: 월요일, ...)
    const firstDay = new Date(year, month, 1).getDay();
    
    // 이전 달의 마지막 날짜들
    const prevMonthLastDate = new Date(year, month, 0).getDate();
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonthLastDate - i),
        isCurrentMonth: false
      });
    }
    
    // 현재 달의 날짜들
    const lastDay = new Date(year, month + 1, 0).getDate();
    for (let i = 1; i <= lastDay; i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true
      });
    }
    
    // 다음 달의 시작 날짜들 (6주 채우기)
    const daysNeeded = 42 - days.length; // 7일 x 6주 = 42
    for (let i = 1; i <= daysNeeded; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false
      });
    }
    
    return days;
  };
  
  const days = getDaysInMonth(currentMonth.getFullYear(), currentMonth.getMonth());
  
  // 현재 달의 날짜들만 추출
  const currentMonthDays = days.filter(day => day.isCurrentMonth).map(day => day.date);
  
  // 선택된 날짜로 스크롤
  useEffect(() => {
    if (scrollRef.current && currentMonthDays.length > 0) {
      const selectedDay = selectedDate.getDate();
      
      // 현재 보이는 월이 선택된 날짜와 같은 월인지 확인
      const isSameMonth = 
        selectedDate.getMonth() === currentMonth.getMonth() && 
        selectedDate.getFullYear() === currentMonth.getFullYear();
      
      if (isSameMonth) {
        const dayIndex = selectedDay - 1;
        if (dayIndex >= 0 && dayIndex < scrollRef.current.children.length) {
          const dayElement = scrollRef.current.children[dayIndex] as HTMLElement;
          
          if (dayElement) {
            const scrollLeft = dayElement.offsetLeft - scrollRef.current.clientWidth / 2 + dayElement.clientWidth / 2;
            scrollRef.current.scrollTo({
              left: scrollLeft,
              behavior: 'smooth',
            });
          }
        }
      }
    }
  }, [selectedDate, currentMonth, currentMonthDays]);

  // 이전 달, 다음 달로 이동
  const goToPreviousMonth = () => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() - 1);
    setCurrentMonth(newMonth);
  };

  const goToNextMonth = () => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + 1);
    setCurrentMonth(newMonth);
  };

  return (
    <div className="mb-6 bg-white elevation-1 rounded-lg">
      {/* 월 네비게이션 */}
      <div className="p-4 flex justify-between items-center border-b">
        <button 
          onClick={goToPreviousMonth}
          className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="이전 달"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <h2 className="text-lg font-medium text-gray-800">
          {currentMonth.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long' })}
        </h2>

        <button 
          onClick={goToNextMonth}
          className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="다음 달"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 text-center p-2">
        {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
          <div key={day} className="text-sm font-medium text-gray-600 py-2">
            {day}
          </div>
        ))}
      </div>

      {/* 캘린더 그리드 */}
      <div className="grid grid-cols-7 p-2">
        {days.map((day, index) => (
          <div
            key={index}
            className={`p-1 ${day.isCurrentMonth ? '' : 'opacity-30'}`}
          >
            <button
              onClick={() => onDateChange(day.date)}
              className={`
                w-full aspect-square rounded-full flex items-center justify-center
                text-sm transition-colors
                ${isSameDay(day.date, selectedDate) 
                  ? 'bg-blue-600 text-white' 
                  : day.isCurrentMonth
                    ? 'hover:bg-blue-100 text-gray-800'
                    : 'hover:bg-gray-100 text-gray-500'
                }
              `}
            >
              {day.date.getDate()}
            </button>
          </div>
        ))}
      </div>

      {/* 선택한 날짜를 위한 달력 스트립 */}
      <h3 className="px-4 py-2 text-sm font-medium text-gray-700">
        {selectedDate.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}
      </h3>
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto pb-4 pt-2 px-2 hide-scrollbar"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {currentMonthDays.map((day) => (
          <DayItem
            key={day.toISOString()}
            date={day}
            isSelected={isSameDay(day, selectedDate)}
            onClick={() => onDateChange(day)}
          />
        ))}
      </div>
    </div>
  );
}

// 두 날짜가 같은 날인지 확인하는 헬퍼 함수
function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
}