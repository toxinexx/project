import React from 'react';

interface KeypadButtonProps {
  digit: string | number;
  onClick: (digit: string | number) => void;
  letters?: string;
}

export function KeypadButton({ digit, onClick, letters }: KeypadButtonProps) {
  return (
    <button
      onClick={() => onClick(digit)}
      className="w-16 h-16 sm:w-20 sm:h-20 mx-auto flex flex-col items-center justify-center 
        bg-gray-200/80 rounded-full hover:bg-gray-300 active:bg-gray-400
        transition-colors duration-150 text-gray-800"
    >
      <span className="text-2xl sm:text-3xl font-light">{digit}</span>
      {letters && (
        <span className="text-[8px] sm:text-[10px] text-gray-600 mt-1 tracking-widest">{letters}</span>
      )}
    </button>
  );
}