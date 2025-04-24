import { useState, useCallback } from 'react';
import { Script } from '../../../../types/script';

const DEFAULT_SCRIPTS: Script[] = [
  {
    id: '1',
    name: 'Sales Introduction',
    sections: [
      {
        title: 'Introduction',
        content: 'Hi, this is [Your Name] from [Company]. I noticed you recently...'
      },
      {
        title: 'Value Proposition',
        content: 'We help businesses like yours to...'
      },
      {
        title: 'Closing',
        content: 'Would you be interested in learning more about how we can help?'
      }
    ]
  }
];

export function useScripts() {
  const [scripts, setScripts] = useState<Script[]>(() => {
    const saved = localStorage.getItem('call_scripts');
    return saved ? JSON.parse(saved) : DEFAULT_SCRIPTS;
  });

  const [activeScriptId, setActiveScriptId] = useState<string>(scripts[0]?.id);

  const saveScripts = useCallback((newScripts: Script[]) => {
    setScripts(newScripts);
    localStorage.setItem('call_scripts', JSON.stringify(newScripts));
  }, []);

  const createScript = useCallback((script?: Script) => {
    const newScript = script || {
      id: crypto.randomUUID(),
      name: 'New Script',
      sections: []
    };
    
    saveScripts([...scripts, newScript]);
    setActiveScriptId(newScript.id);
  }, [scripts, saveScripts]);

  const updateScript = useCallback((updatedScript: Script) => {
    const newScripts = scripts.map(script => 
      script.id === updatedScript.id ? updatedScript : script
    );
    saveScripts(newScripts);
  }, [scripts, saveScripts]);

  const deleteScript = useCallback((id: string) => {
    const newScripts = scripts.filter(script => script.id !== id);
    saveScripts(newScripts);
    if (activeScriptId === id) {
      setActiveScriptId(newScripts[0]?.id);
    }
  }, [scripts, activeScriptId, saveScripts]);

  const selectScript = useCallback((id: string) => {
    setActiveScriptId(id);
  }, []);

  return {
    scripts,
    activeScript: scripts.find(s => s.id === activeScriptId),
    createScript,
    updateScript,
    deleteScript,
    selectScript
  };
}