export interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
  source: string;
  tags?: string[];
  notes?: string;
  createdAt: string;
  status: 'active' | 'inactive';
  lastActivity?: string;
  groupIds?: string[]; // IDs of groups this contact belongs to
}

export interface ContactGroup {
  id: string;
  name: string;
  description?: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  contactCount: number;
}