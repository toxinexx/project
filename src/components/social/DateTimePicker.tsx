import React from 'react';
import { Calendar, Clock } from 'lucide-react';

interface DateTimePickerProps {
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void;
  minDate?: Date;
}

export function DateTimePicker({ selectedDate, onDateChange, minDate = new Date() }: DateTimePickerProps) {
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value);
    if (selectedDate) {
      date.setHours(selectedDate.getHours(), selectedDate.getMinutes());
    }
    onDateChange(date);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedDate) {
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      onDateChange(now);
      return;
    }
    
    const [hours, minutes] = e.target.value.split(':');
    const newDate = new Date(selectedDate);
    newDate.setHours(parseInt(hours), parseInt(minutes));
    onDateChange(newDate);
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const formatTime = (date: Date) => {
    return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Calendar className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="date"
          value={selectedDate ? formatDate(selectedDate) : ''}
          min={formatDate(minDate)}
          onChange={handleDateChange}
          className="pl-8 pr-2 py-1.5 border rounded-md text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        />
      </div>
      
      <div className="relative">
        <Clock className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="time"
          value={selectedDate ? formatTime(selectedDate) : ''}
          onChange={handleTimeChange}
          className="pl-8 pr-2 py-1.5 border rounded-md text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        />
      </div>
    </div>
  );
}