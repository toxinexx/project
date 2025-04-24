import { Contact } from './contact';

export interface Lead extends Contact {
  temperature?: 'cold' | 'warm' | 'hot';
  assignedTo?: string;
  stage?: string;
  probability?: number;
  dealSize?: number;
  propertyType?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  leadSource?: string;
  lastContactDate?: string;
}