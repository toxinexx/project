import React, { useState } from 'react';
import { Save, Plus, Trash2 } from 'lucide-react';
import { useScripts } from './hooks/useScripts';
import { Script, ScriptSection } from '../../../types/script';

export function ScriptEditor() {
  const { scripts, activeScript, updateScript, createScript, deleteScript } = useScripts();
  const [editMode, setEditMode] = useState(false);
  const [scriptName, setScriptName] = useState(activeScript?.name || '');
  const [sections, setSections] = useState<ScriptSection[]>(activeScript?.sections || []);

  const handleSave = () => {
    if (!scriptName.trim()) return;
    
    const updatedScript: Script = {
      id: activeScript?.id || crypto.randomUUID(),
      name: scriptName,
      sections
    };

    if (activeScript) {
      updateScript(updatedScript);
    } else {
      createScript(updatedScript);
    }
    setEditMode(false);
  };

  const addSection = () => {
    setSections([...sections, { title: '', content: '' }]);
  };

  const updateSection = (index: number, field: keyof ScriptSection, value: string) => {
    const newSections = [...sections];
    newSections[index] = { ...newSections[index], [field]: value };
    setSections(newSections);
  };

  const removeSection = (index: number) => {
    setSections(sections.filter((_, i) => i !== index));
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b flex items-center justify-between">
        {editMode ? (
          <input
            type="text"
            value={scriptName}
            onChange={(e) => setScriptName(e.target.value)}
            placeholder="Script name"
            className="px-2 py-1 border rounded-md text-sm"
          />
        ) : (
          <h3 className="font-medium text-gray-800">{activeScript?.name || 'New Script'}</h3>
        )}
        
        <div className="flex items-center gap-2">
          {editMode ? (
            <button
              onClick={handleSave}
              disabled={!scriptName.trim()}
              className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md 
                hover:bg-blue-700 transition-colors flex items-center gap-2
                disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4" />
              Save
            </button>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 
                rounded-md transition-colors"
            >
              Edit
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {editMode ? (
          <div className="space-y-4">
            {sections.map((section, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <input
                    type="text"
                    value={section.title}
                    onChange={(e) => updateSection(index, 'title', e.target.value)}
                    placeholder="Section title"
                    className="px-2 py-1 border rounded-md text-sm"
                  />
                  <button
                    onClick={() => removeSection(index)}
                    className="p-1 text-red-500 hover:bg-red-50 rounded-md"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <textarea
                  value={section.content}
                  onChange={(e) => updateSection(index, 'content', e.target.value)}
                  placeholder="Section content"
                  className="w-full px-3 py-2 text-sm border rounded-md h-24"
                />
              </div>
            ))}
            
            <button
              onClick={addSection}
              className="w-full px-3 py-2 text-sm text-gray-600 border border-dashed 
                rounded-md hover:bg-gray-50 transition-colors flex items-center 
                justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Section
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {sections.map((section, index) => (
              <div key={index} className="space-y-2">
                <h4 className="font-medium text-gray-700">{section.title}</h4>
                <p className="text-sm text-gray-600 whitespace-pre-wrap">
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}