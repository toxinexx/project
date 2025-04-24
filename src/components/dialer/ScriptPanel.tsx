import React, { useState } from 'react';
import { FileText, ChevronLeft, ChevronRight } from 'lucide-react';
import { ScriptSelector } from './script/ScriptSelector';
import { ScriptEditor } from './script/ScriptEditor';

interface ScriptPanelProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function ScriptPanel({ isOpen, onToggle }: ScriptPanelProps) {
  // Don't render anything initially if the panel is not open
  if (!isOpen) {
    return (
      // Only render the toggle button when closed
      <button
        onClick={onToggle}
        className="fixed top-24 right-0 bg-white border border-primary-100 shadow-sm rounded-l-lg p-2
          hover:bg-gray-50 transition-all duration-300 z-50"
        title="Show script"
      >
        <div className="flex items-center gap-2 text-gray-600">
          <FileText className="w-4 h-4" />
          <ChevronLeft className="w-4 h-4" />
        </div>
      </button>
    );
  }
  
  return (
    <>
      {/* Overlay when open */}
      <div 
        className="fixed inset-0 bg-black/20 z-40"
        onClick={onToggle}
      />

      {/* Toggle button when open */}
      <button
        onClick={onToggle}
        className="fixed top-24 right-[400px] bg-white border border-primary-100 shadow-sm rounded-l-lg p-2
          hover:bg-gray-50 transition-all duration-300 z-50"
        title="Hide script"
      >
        <ChevronRight className="w-4 h-4 text-gray-600" />
      </button>

      {/* Script panel */}
      <div
        className="fixed top-0 right-0 h-screen w-[400px] bg-white border-l border-primary-100 shadow-xl z-50"
      >
        <ScriptSelector />
        <div className="h-[calc(100vh-64px)] overflow-y-auto">
          <ScriptEditor />
        </div>
      </div>
    </>
  );
}