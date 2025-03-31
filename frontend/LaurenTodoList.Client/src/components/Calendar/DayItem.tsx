'use client';

interface DayItemProps {
  date: Date;
  isSelected: boolean;
  onClick: () => void;
}

export default function DayItem({ date, isSelected, onClick }: DayItemProps) {
  const dayOfWeek = date.toLocaleDateString('ko-KR', { weekday: 'short' });
  const dayOfMonth = date.getDate();
  
  // 주말 체크
  const isWeekend = date.getDay() === 0 || date.getDay() === 6;
  
  // 오늘 날짜 체크
  const isToday = new Date().toDateString() === date.toDateString();

  return (
    <div 
      className={`
        flex flex-col items-center justify-center p-1 mx-1 rounded-md w-16 h-20
        cursor-pointer transition-all duration-200 ease-in-out ripple
        ${isSelected 
          ? 'bg-blue-600 text-white elevation-1' 
          : isToday
            ? 'bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200'
            : 'bg-white hover:bg-gray-100 text-gray-800 elevation-1'}
      `}
      onClick={onClick}
      style={{ scrollSnapAlign: 'center' }}
    >
      <span className={`
        text-xs font-medium mb-1
        ${isSelected 
          ? 'text-blue-100' 
          : isWeekend
            ? 'text-red-500'
            : 'text-gray-500'}
      `}>
        {dayOfWeek}
      </span>
      <span className={`
        text-xl font-bold
        ${isSelected
          ? '' 
          : isToday
            ? 'text-blue-700'
            : ''}
      `}>
        {dayOfMonth}
      </span>
    </div>
  );
}