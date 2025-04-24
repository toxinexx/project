export interface Script {
  id: string;
  name: string;
  sections: ScriptSection[];
}

export interface ScriptSection {
  title: string;
  content: string;
  fields?: ScriptField[];
}

export interface ScriptField {
  id: string;
  type: 'checkbox' | 'radio' | 'text' | 'textarea';
  label: string;
  options?: string[];  // For checkbox and radio types
  placeholder?: string; // For text and textarea types
}

export interface ScriptResponse {
  scriptId: string;
  scriptName: string;
  responses: Record<string, any>;
  notes: string;
  timestamp: string;
}