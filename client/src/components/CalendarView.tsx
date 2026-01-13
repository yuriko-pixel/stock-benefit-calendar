import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StockBenefit } from '@/lib/data';
import { useState } from 'react';

interface CalendarViewProps {
  data: StockBenefit[];
  currentDate: Date;
  onMonthChange: (date: Date) => void;
  onDateClick: (date: string) => void;
}

export function CalendarView({ data, currentDate, onMonthChange, onDateClick }: CalendarViewProps) {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Get first day of month and number of days
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Group data by date
  const exRightDates = new Set<string>();
  const exDividendDates = new Set<string>();

  data.forEach((item) => {
    const itemMonth = new Date(item.exRightDate).getMonth();
    const itemYear = new Date(item.exRightDate).getFullYear();
    if (itemYear === year && itemMonth === month) {
      exRightDates.add(item.exRightDate);
    }

    const divMonth = new Date(item.exDividendDate).getMonth();
    const divYear = new Date(item.exDividendDate).getFullYear();
    if (divYear === year && divMonth === month) {
      exDividendDates.add(item.exDividendDate);
    }
  });

  const handlePrevMonth = () => {
    onMonthChange(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    onMonthChange(new Date(year, month + 1, 1));
  };

  const monthName = new Date(year, month, 1).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
  });

  // Create calendar grid
  const calendarDays: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  const getDateString = (day: number): string => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  return (
    <div className="card-nordic p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">{monthName}</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrevMonth}
            className="rounded-lg"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNextMonth}
            className="rounded-lg"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {['日', '月', '火', '水', '木', '金', '土'].map((day) => (
          <div key={day} className="text-center font-semibold text-muted-foreground text-sm py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-2">
        {calendarDays.map((day, idx) => {
          if (day === null) {
            return <div key={`empty-${idx}`} className="aspect-square" />;
          }

          const dateStr = getDateString(day);
          const hasExRight = exRightDates.has(dateStr);
          const hasExDividend = exDividendDates.has(dateStr);

          return (
            <button
              key={day}
              onClick={() => onDateClick(dateStr)}
              className={`
                aspect-square rounded-lg p-1 text-sm font-medium transition-all
                flex flex-col items-center justify-center relative
                ${hasExRight || hasExDividend ? 'cursor-pointer hover:shadow-md' : 'cursor-default'}
              `}
              style={{
                backgroundColor: hasExRight
                  ? 'var(--color-ex-right)'
                  : hasExDividend
                    ? 'var(--color-ex-dividend)'
                    : 'var(--secondary)',
                color: hasExRight || hasExDividend ? 'white' : 'var(--foreground)',
              }}
            >
              <span>{day}</span>
              {(hasExRight || hasExDividend) && (
                <span className="text-xs mt-0.5">
                  {hasExRight && hasExDividend ? '両' : hasExRight ? '確' : '落'}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex gap-4 mt-6 text-sm">
        <div className="flex items-center gap-2">
          <div
            className="w-4 h-4 rounded"
            style={{ backgroundColor: 'var(--color-ex-right)' }}
          />
          <span className="text-muted-foreground">権利確定日</span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-4 h-4 rounded"
            style={{ backgroundColor: 'var(--color-ex-dividend)' }}
          />
          <span className="text-muted-foreground">権利落ち日</span>
        </div>
      </div>
    </div>
  );
}
