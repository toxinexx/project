import React from 'react';
import { X, Mail, MessageSquare, User, Tag } from 'lucide-react';
import { Contact } from '../../types/contact';
import { useNavigate } from 'react-router-dom';
import { ThreeDButton } from '../ui/3DButton';

interface ContactListItemProps {
  contact: Contact;
  onPhoneClick: (phone: string) => void;
  onEmailClick: (email: string) => void;
  onSmsClick: (phone: string) => void;
  isSelected?: boolean;
  onSelect?: () => void;
}

export function ContactListItem({ 
  contact, 
  onPhoneClick, 
  onEmailClick, 
  onSmsClick,
  isSelected = false,
  onSelect
}: ContactListItemProps) {
  const navigate = useNavigate();

  const handleRowClick = () => {
    console.log('Navigating to contact profile:', contact.id);
    navigate(`/contacts/${contact.id}`);
  };

  const handleNameClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleRowClick();
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'not interested':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <tr 
      className={`hover:bg-gray-50 transition-colors cursor-pointer ${isSelected ? 'bg-purple-50' : ''}`}
      onClick={handleRowClick}
    >
      <td className="py-4 pl-6 pr-3 whitespace-nowrap">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => {
            e.stopPropagation();
            if (onSelect) onSelect();
          }}
          className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
        />
      </td>
      
      <td className="py-4 pl-3 pr-3 whitespace-nowrap">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 flex items-center justify-center bg-purple-100 text-purple-600 rounded-full">
            <User className="w-5 h-5" />
          </div>
          <span 
            className="font-medium text-gray-900 hover:text-purple-600 transition-colors"
            onClick={handleNameClick}
          >
            {contact.name}
          </span>
        </div>
      </td>

      <td className="px-3 py-4 whitespace-nowrap">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(contact.status)}`}>
          {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
        </span>
      </td>
      
      <td className="px-3 py-4 whitespace-nowrap">
        <div className="flex items-center gap-1">
          <ThreeDButton
            variant="info"
            size="sm"
            icon={MessageSquare}
            isCircle
            onClick={(e) => {
              e.stopPropagation();
              onSmsClick(contact.phone);
            }}
            title="SMS"
          />
          <span className="ml-2 text-gray-600">{contact.phone}</span>
        </div>
      </td>
      
      <td className="px-3 py-4 whitespace-nowrap">
        <div className="flex items-center gap-1">
          <ThreeDButton
            variant="info"
            size="sm"
            icon={Mail}
            isCircle
            onClick={(e) => {
              e.stopPropagation();
              onEmailClick(contact.email);
            }}
            title="Email"
          />
          <span className="ml-2 text-gray-600">{contact.email}</span>
        </div>
      </td>
      
      <td className="px-3 py-4 whitespace-nowrap">
        <span className="text-gray-600">{contact.source}</span>
      </td>
      
      <td className="px-3 py-4 whitespace-nowrap">
        <div className="flex flex-wrap gap-1">
          {contact.tags?.map((tag, index) => (
            <span 
              key={index}
              className="inline-flex items-center gap-1 px-2 py-0.5 bg-purple-100 text-xs text-purple-800 rounded-full"
              onClick={(e) => e.stopPropagation()} // Prevent row click when clicking on tags
            >
              <Tag className="w-3 h-3" />
              {tag}
            </span>
          ))}
        </div>
      </td>
    </tr>
  );
}