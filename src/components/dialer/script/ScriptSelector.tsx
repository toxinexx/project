import React from 'react';
import { Plus } from 'lucide-react';
import { useScripts } from './hooks/useScripts';

export function ScriptSelector() {
  const { scripts, activeScript, selectScript, createScript } = useScripts();

  return (
    <div className="border-b">
      <div className="p-4 flex items-center gap-2">
        <select
          value={activeScript?.id || ''}
          onChange={(e) => selectScript(e.target.value)}
          className="flex-1 px-3 py-1.5 text-sm border rounded-md"
        >
          <option value="">Select a script</option>
          {scripts.map((script) => (
            <option key={script.id} value={script.id}>
              {script.name}
            </option>
          ))}
        </select>
        
        <button
          onClick={() => createScript()}
          className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 
            rounded-md transition-colors"
          title="Create new script"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}