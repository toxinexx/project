export interface VoicemailDrop {
  id: string;
  name: string;
  duration: number;
  type: 'recorded' | 'ai';
}