import { useState } from 'react';

interface SocialMessage {
  id: string;
  platform: string;
  name: string;
  avatar: string;
  content: string;
  time: string;
}

export function useSocialMessages() {
  const [messages] = useState<SocialMessage[]>([]);
  return { messages };
}