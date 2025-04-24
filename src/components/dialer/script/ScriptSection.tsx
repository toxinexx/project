import React, { useState, useEffect } from 'react';
import { Plus, Check, Save, Trash2, Edit3, X, PlusCircle, CheckCircle, Circle, FilePlus, FileText } from 'lucide-react';
import { Script, ScriptSection as ScriptSectionType, ScriptField } from '../../../types/script';
import { ThreeDButton } from '../../ui/3DButton';

export function ScriptSection() {
  const [scripts, setScripts] = useState<Script[]>([]);
  const [activeScriptId, setActiveScriptId] = useState<string | null>(null);
  const [mode, setMode] = useState<'view' | 'edit' | 'use'>('view');
  const [scriptName, setScriptName] = useState('');
  const [sections, setSections] = useState<ScriptSectionType[]>([]);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  // Store responses during call
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [callNotes, setCallNotes] = useState('');

  // Load saved scripts from localStorage
  useEffect(() => {
    const savedScripts = localStorage.getItem('call_scripts');
    if (savedScripts) {
      const parsedScripts = JSON.parse(savedScripts);
      setScripts(parsedScripts);
      if (parsedScripts.length > 0) {
        setActiveScriptId(parsedScripts[0].id);
        setScriptName(parsedScripts[0].name);
        setSections(parsedScripts[0].sections);
      }
    } else {
      // Add a default script if none exist
      const defaultScript: Script = {
        id: crypto.randomUUID(),
        name: "Real Estate Lead Qualification",
        sections: [
          {
            title: "Introduction",
            content: "Hello [Prospect Name], this is [Your Name] from DealFone. I'm calling about the property inquiry you submitted. Do you have a few minutes to talk?",
            fields: []
          },
          {
            title: "Lead Source",
            content: "Before we get started, I'd like to ask how you found out about us?",
            fields: [
              {
                id: "leadSource",
                type: "checkbox",
                label: "How did you hear about us?",
                options: ["Social Media", "Google", "Zillow", "Referral", "Other"]
              },
              {
                id: "leadSourceOther",
                type: "text", 
                label: "If other, specify:",
                placeholder: "Enter lead source"
              }
            ]
          },
          {
            title: "Buyer Qualification",
            content: "I'd like to understand your real estate needs better:",
            fields: [
              {
                id: "buyingTimeframe",
                type: "radio",
                label: "Timeframe for buying:",
                options: ["Immediately", "1-3 months", "3-6 months", "6-12 months", "Just exploring"]
              },
              {
                id: "preApproved",
                type: "radio",
                label: "Pre-approved for financing?",
                options: ["Yes", "No", "Not applicable (cash buyer)"]
              },
              {
                id: "budget",
                type: "text",
                label: "Budget range:",
                placeholder: "e.g., $300,000 - $400,000"
              }
            ]
          },
          {
            title: "Property Preferences",
            content: "Let's talk about what you're looking for in a property:",
            fields: [
              {
                id: "propertyType",
                type: "checkbox",
                label: "Property type interested in:",
                options: ["Single Family", "Condo", "Townhouse", "Multi-family", "Commercial"]
              },
              {
                id: "bedrooms",
                type: "radio",
                label: "Preferred bedrooms:",
                options: ["1", "2", "3", "4", "5+"]
              },
              {
                id: "bathrooms",
                type: "radio",
                label: "Preferred bathrooms:",
                options: ["1", "1.5", "2", "2.5", "3+"]
              },
              {
                id: "locationPreference",
                type: "text",
                label: "Areas/neighborhoods interested in:",
                placeholder: "Enter location preferences"
              }
            ]
          },
          {
            title: "Closing Questions",
            content: "Based on our conversation today, I'd like to schedule a follow-up. What's the best way to reach you?",
            fields: [
              {
                id: "preferredContact",
                type: "checkbox",
                label: "Preferred contact method:",
                options: ["Phone", "Email", "Text"]
              },
              {
                id: "followUpScheduled",
                type: "radio",
                label: "Follow-up scheduled?",
                options: ["Yes", "No"]
              },
              {
                id: "followUpDate",
                type: "text",
                label: "Follow-up date/time:",
                placeholder: "e.g., Apr 15, 2pm"
              }
            ]
          },
          {
            title: "Notes",
            content: "Additional information or special requests from the prospect:",
            fields: [
              {
                id: "notes",
                type: "textarea",
                label: "Call notes:",
                placeholder: "Enter any additional notes here"
              }
            ]
          }
        ]
      };
      setScripts([defaultScript]);
      setActiveScriptId(defaultScript.id);
      setScriptName(defaultScript.name);
      setSections(defaultScript.sections);
      localStorage.setItem('call_scripts', JSON.stringify([defaultScript]));
    }
  }, []);

  // Load the selected script when activeScriptId changes
  useEffect(() => {
    if (activeScriptId) {
      const script = scripts.find(s => s.id === activeScriptId);
      if (script) {
        setScriptName(script.name);
        setSections(script.sections);
        setMode('view');
        // Reset responses when switching scripts
        setResponses({});
        setCallNotes('');
      }
    }
  }, [activeScriptId, scripts]);

  const createNewScript = () => {
    const newScript: Script = {
      id: crypto.randomUUID(),
      name: 'New Script',
      sections: [{ 
        title: 'Introduction', 
        content: '',
        fields: [] 
      }]
    };
    
    setScripts(prev => [...prev, newScript]);
    setActiveScriptId(newScript.id);
    setScriptName(newScript.name);
    setSections(newScript.sections);
    setMode('edit');
  };

  const addSection = () => {
    setSections(prev => [...prev, { 
      title: 'New Section', 
      content: '',
      fields: [] 
    }]);
  };

  const updateSection = (index: number, field: keyof ScriptSectionType, value: string | ScriptField[]) => {
    const newSections = [...sections];
    newSections[index] = { ...newSections[index], [field]: value };
    setSections(newSections);
  };

  const addField = (sectionIndex: number) => {
    const newSections = [...sections];
    const section = newSections[sectionIndex];
    
    const newField: ScriptField = {
      id: `field_${Date.now()}`,
      type: 'checkbox',
      label: 'New Field',
      options: ['Option 1', 'Option 2', 'Option 3']
    };
    
    newSections[sectionIndex] = {
      ...section,
      fields: [...(section.fields || []), newField]
    };
    
    setSections(newSections);
  };

  const updateField = (sectionIndex: number, fieldIndex: number, updates: Partial<ScriptField>) => {
    const newSections = [...sections];
    const section = newSections[sectionIndex];
    
    if (!section.fields) {
      section.fields = [];
    }
    
    section.fields[fieldIndex] = {
      ...section.fields[fieldIndex],
      ...updates
    };
    
    setSections(newSections);
  };

  const removeField = (sectionIndex: number, fieldIndex: number) => {
    const newSections = [...sections];
    const section = newSections[sectionIndex];
    
    if (section.fields) {
      section.fields = section.fields.filter((_, i) => i !== fieldIndex);
      setSections(newSections);
    }
  };

  const removeSection = (index: number) => {
    setSections(sections.filter((_, i) => i !== index));
  };

  const handleSaveScript = () => {
    if (!scriptName.trim()) return;
    
    setSaveStatus('saving');
    
    const updatedScript: Script = {
      id: activeScriptId || crypto.randomUUID(),
      name: scriptName,
      sections
    };
    
    // If editing an existing script, update it
    if (activeScriptId) {
      const updatedScripts = scripts.map(script => 
        script.id === activeScriptId ? updatedScript : script
      );
      setScripts(updatedScripts);
      localStorage.setItem('call_scripts', JSON.stringify(updatedScripts));
    }
    // If creating a new script, add it
    else {
      const newScripts = [...scripts, updatedScript];
      setScripts(newScripts);
      setActiveScriptId(updatedScript.id);
      localStorage.setItem('call_scripts', JSON.stringify(newScripts));
    }
    
    setMode('view');
    
    // Show saved indicator and reset after delay
    setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    }, 500);
  };

  const deleteScript = (id: string) => {
    if (scripts.length <= 1) {
      return; // Prevent deleting the last script
    }
    
    const filtered = scripts.filter(script => script.id !== id);
    setScripts(filtered);
    localStorage.setItem('call_scripts', JSON.stringify(filtered));
    
    // If the deleted script is the active one, select another
    if (id === activeScriptId) {
      const newActiveId = filtered[0]?.id;
      if (newActiveId) {
        setActiveScriptId(newActiveId);
        const newActive = filtered.find(s => s.id === newActiveId);
        if (newActive) {
          setScriptName(newActive.name);
          setSections(newActive.sections);
        }
      }
    }
  };

  const handleResponseChange = (fieldId: string, value: any) => {
    setResponses(prev => ({
      ...prev,
      [fieldId]: value
    }));
  };

  const handleOptionToggle = (fieldId: string, option: string) => {
    setResponses(prev => {
      // If field doesn't exist yet or isn't an array, initialize it
      if (!prev[fieldId] || !Array.isArray(prev[fieldId])) {
        return {
          ...prev,
          [fieldId]: [option]
        };
      }
      
      // If option is already selected, remove it
      if (prev[fieldId].includes(option)) {
        return {
          ...prev,
          [fieldId]: prev[fieldId].filter((item: string) => item !== option)
        };
      }
      
      // Otherwise add it
      return {
        ...prev,
        [fieldId]: [...prev[fieldId], option]
      };
    });
  };

  const handleRadioChange = (fieldId: string, option: string) => {
    setResponses(prev => ({
      ...prev,
      [fieldId]: option
    }));
  };

  const handleSaveCallData = () => {
    // In a real app, this would save the call data to your database
    const callData = {
      scriptId: activeScriptId,
      scriptName,
      responses,
      notes: callNotes,
      timestamp: new Date().toISOString()
    };
    
    console.log('Call data saved:', callData);
    
    // Reset for next call
    setResponses({});
    setCallNotes('');
    setMode('view');
    
    // You could store in localStorage for demo purposes
    const savedCalls = JSON.parse(localStorage.getItem('saved_calls') || '[]');
    savedCalls.push(callData);
    localStorage.setItem('saved_calls', JSON.stringify(savedCalls));
    
    alert('Call script responses saved!');
  };

  return (
    <div className="p-4">
      {/* Script Selector and Mode Controls */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <div className="flex-1 min-w-0">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Script
          </label>
          <select
            value={activeScriptId || ''}
            onChange={(e) => setActiveScriptId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {scripts.map(script => (
              <option key={script.id} value={script.id}>
                {script.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex gap-2 flex-wrap">
          {mode === 'view' && (
            <>
              <ThreeDButton
                variant="info"
                size="sm"
                icon={FileText}
                onClick={() => setMode('use')}
              >
                Use Script
              </ThreeDButton>
              
              <ThreeDButton
                variant="secondary"
                size="sm"
                icon={Edit3}
                onClick={() => setMode('edit')}
              >
                Edit
              </ThreeDButton>
            </>
          )}
          
          {mode === 'edit' && (
            <ThreeDButton
              variant="secondary"
              size="sm"
              icon={X}
              onClick={() => setMode('view')}
            >
              Cancel
            </ThreeDButton>
          )}
          
          {mode === 'use' && (
            <ThreeDButton
              variant="secondary"
              size="sm"
              icon={X}
              onClick={() => setMode('view')}
            >
              Exit
            </ThreeDButton>
          )}
          
          <ThreeDButton
            variant="success"
            size="sm"
            icon={FilePlus}
            onClick={createNewScript}
          >
            New Script
          </ThreeDButton>
        </div>
      </div>
      
      {/* Script Editor, Viewer or Interactive Mode */}
      <div className="border rounded-lg p-4 bg-gray-50">
        {mode === 'edit' ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Script Name
              </label>
              <input
                type="text"
                value={scriptName}
                onChange={(e) => setScriptName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter script name"
              />
            </div>
            
            <div className="space-y-4">
              {sections.map((section, sectionIndex) => (
                <div key={sectionIndex} className="p-4 bg-white rounded-lg border border-gray-200">
                  <div className="flex justify-between mb-2">
                    <input
                      type="text"
                      value={section.title}
                      onChange={(e) => updateSection(sectionIndex, 'title', e.target.value)}
                      className="font-medium text-gray-800 px-2 py-1 border border-gray-300 rounded"
                      placeholder="Section title"
                    />
                    <button
                      onClick={() => removeSection(sectionIndex)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <textarea
                    value={section.content}
                    onChange={(e) => updateSection(sectionIndex, 'content', e.target.value)}
                    className="w-full h-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 resize-vertical"
                    placeholder="Section content..."
                  />
                  
                  {/* Fields Editor */}
                  <div className="mt-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-gray-700">Interactive Fields</h4>
                      <button
                        onClick={() => addField(sectionIndex)}
                        className="text-sm text-purple-600 hover:text-purple-800 flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" />
                        Add Field
                      </button>
                    </div>
                    
                    {section.fields && section.fields.length > 0 ? (
                      <div className="space-y-3 pl-2 border-l-2 border-purple-200">
                        {section.fields.map((field, fieldIndex) => (
                          <div key={fieldIndex} className="bg-gray-50 p-3 rounded border border-gray-200">
                            <div className="flex justify-between mb-2">
                              <div className="flex-1 mr-2">
                                <input
                                  type="text"
                                  value={field.label}
                                  onChange={(e) => updateField(sectionIndex, fieldIndex, { label: e.target.value })}
                                  className="w-full text-sm px-2 py-1 border border-gray-300 rounded"
                                  placeholder="Field label"
                                />
                              </div>
                              
                              <select
                                value={field.type}
                                onChange={(e) => updateField(sectionIndex, fieldIndex, { type: e.target.value as any })}
                                className="text-sm px-2 py-1 border border-gray-300 rounded"
                              >
                                <option value="checkbox">Checkbox</option>
                                <option value="radio">Radio</option>
                                <option value="text">Text</option>
                                <option value="textarea">Textarea</option>
                              </select>
                              
                              <button
                                onClick={() => removeField(sectionIndex, fieldIndex)}
                                className="ml-2 text-red-500 hover:text-red-700 p-1"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                            
                            {(field.type === 'checkbox' || field.type === 'radio') && (
                              <div>
                                <label className="text-xs text-gray-600 mb-1 block">Options (comma-separated)</label>
                                <textarea
                                  value={field.options?.join(', ')}
                                  onChange={(e) => {
                                    const options = e.target.value.split(',').map(opt => opt.trim());
                                    updateField(sectionIndex, fieldIndex, { options });
                                  }}
                                  className="w-full text-sm px-2 py-1 border border-gray-300 rounded h-14 resize-none"
                                  placeholder="Option 1, Option 2, Option 3"
                                />
                              </div>
                            )}
                            
                            {(field.type === 'text' || field.type === 'textarea') && (
                              <div>
                                <label className="text-xs text-gray-600 mb-1 block">Placeholder</label>
                                <input
                                  type="text"
                                  value={field.placeholder || ''}
                                  onChange={(e) => updateField(sectionIndex, fieldIndex, { placeholder: e.target.value })}
                                  className="w-full text-sm px-2 py-1 border border-gray-300 rounded"
                                  placeholder="Enter placeholder text"
                                />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-sm text-gray-500 italic">
                        No interactive fields added yet
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between">
              <ThreeDButton
                variant="secondary"
                size="sm"
                icon={Plus}
                onClick={addSection}
              >
                Add Section
              </ThreeDButton>
              
              <ThreeDButton
                variant="primary"
                size="sm"
                icon={saveStatus === 'saved' ? Check : Save}
                onClick={handleSaveScript}
                disabled={saveStatus === 'saving'}
              >
                {saveStatus === 'saving' ? 'Saving...' : 
                 saveStatus === 'saved' ? 'Saved!' : 'Save Script'}
              </ThreeDButton>
            </div>
          </div>
        ) : mode === 'use' ? (
          // Interactive Script Mode
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-lg border-2 border-primary-100">
              <h3 className="text-xl font-semibold text-purple-800 mb-2">{scriptName}</h3>
              <p className="text-sm text-gray-600">Fill out this script during your call to track the conversation and record responses.</p>
            </div>
            
            <div className="space-y-6">
              {sections.map((section, sectionIndex) => (
                <div key={sectionIndex} className="bg-white p-5 rounded-lg border-l-4 border-purple-400 shadow-sm">
                  <h4 className="font-medium text-purple-700 mb-3">{section.title}</h4>
                  <p className="text-gray-700 mb-4">{section.content}</p>
                  
                  {section.fields && section.fields.length > 0 && (
                    <div className="mt-4 space-y-5 pl-3 border-l-2 border-gray-200">
                      {section.fields.map((field) => (
                        <div key={field.id} className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">
                            {field.label}
                          </label>
                          
                          {field.type === 'checkbox' && field.options && (
                            <div className="space-y-2">
                              {field.options.map((option) => (
                                <label key={option} className="flex items-center gap-2 text-gray-600 hover:bg-gray-50 p-1 rounded cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={Array.isArray(responses[field.id]) && responses[field.id].includes(option)}
                                    onChange={() => handleOptionToggle(field.id, option)}
                                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 h-4 w-4"
                                  />
                                  <span>{option}</span>
                                </label>
                              ))}
                            </div>
                          )}
                          
                          {field.type === 'radio' && field.options && (
                            <div className="space-y-2">
                              {field.options.map((option) => (
                                <label key={option} className="flex items-center gap-2 text-gray-600 hover:bg-gray-50 p-1 rounded cursor-pointer">
                                  <input
                                    type="radio"
                                    checked={responses[field.id] === option}
                                    onChange={() => handleRadioChange(field.id, option)}
                                    className="border-gray-300 text-purple-600 focus:ring-purple-500 h-4 w-4"
                                  />
                                  <span>{option}</span>
                                </label>
                              ))}
                            </div>
                          )}
                          
                          {field.type === 'text' && (
                            <input
                              type="text"
                              value={responses[field.id] || ''}
                              onChange={(e) => handleResponseChange(field.id, e.target.value)}
                              placeholder={field.placeholder || ''}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                          )}
                          
                          {field.type === 'textarea' && (
                            <textarea
                              value={responses[field.id] || ''}
                              onChange={(e) => handleResponseChange(field.id, e.target.value)}
                              placeholder={field.placeholder || ''}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 resize-vertical h-24"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Call Notes
              </label>
              <textarea
                value={callNotes}
                onChange={(e) => setCallNotes(e.target.value)}
                placeholder="Enter any additional notes about the call..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 resize-vertical h-24"
              />
            </div>
            
            <div className="flex justify-end">
              <ThreeDButton
                variant="primary"
                size="md"
                icon={Save}
                onClick={handleSaveCallData}
              >
                Save Call Data
              </ThreeDButton>
            </div>
          </div>
        ) : (
          // View Mode
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800">{scriptName}</h3>
            
            <div className="space-y-6">
              {sections.map((section, index) => (
                <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
                  <h4 className="font-medium text-purple-600 mb-2">{section.title}</h4>
                  
                  <div className="prose prose-sm">
                    {section.content.split('\n').map((line, i) => (
                      <p key={i} className="text-gray-700">{line}</p>
                    ))}
                  </div>
                  
                  {section.fields && section.fields.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-gray-100">
                      <h5 className="text-sm font-medium text-gray-600 mb-2">Interactive Fields:</h5>
                      <div className="space-y-2 pl-2">
                        {section.fields.map((field, i) => (
                          <div key={i} className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-purple-500 mt-0.5 mr-2" />
                            <div className="text-sm text-gray-600">
                              <span className="font-medium">{field.label}</span>
                              {field.type === 'checkbox' && (
                                <span className="text-xs text-gray-500 ml-2">
                                  [Multiple choice]
                                </span>
                              )}
                              {field.type === 'radio' && (
                                <span className="text-xs text-gray-500 ml-2">
                                  [Single choice]
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="flex justify-between mt-4">
              <ThreeDButton
                variant="danger"
                size="sm"
                icon={Trash2}
                onClick={() => activeScriptId && deleteScript(activeScriptId)}
                disabled={scripts.length <= 1}
              >
                Delete Script
              </ThreeDButton>
              
              <ThreeDButton
                variant="primary"
                size="sm"
                icon={FileText}
                onClick={() => setMode('use')}
              >
                Use This Script
              </ThreeDButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}