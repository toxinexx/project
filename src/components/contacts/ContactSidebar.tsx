import React, { useState } from 'react';
import { 
  Calendar, Clock, User, Phone, CheckSquare, Plus, MessageSquare,
  Mail, ChevronRight, Check, CheckCircle, Circle, Edit3, Trash2, FileText
} from 'lucide-react';
import { Contact } from '../../types/contact';
import { ThreeDButton } from '../ui/3DButton';

interface ContactSidebarProps {
  contactId: string;
  contact: Contact;
}

export function ContactSidebar({ contactId, contact }: ContactSidebarProps) {
  const [newTask, setNewTask] = useState('');
  
  // Sample tasks
  const tasks = [
    {
      id: '1',
      title: 'Schedule follow-up call',
      due: 'Tomorrow',
      completed: false,
      assigned: 'Alice Johnson'
    },
    {
      id: '2',
      title: 'Send product information',
      due: 'Today',
      completed: true,
      assigned: 'Alice Johnson'
    }
  ];
  
  // Sample upcoming appointments
  const appointments = [
    {
      id: '1',
      title: 'Product Demo',
      date: 'Apr 15th 2025',
      time: '2:00 PM',
      location: '123 Business Ave, Suite 101, New York, NY 10001',
      participants: ['Alice Johnson', contact.name]
    }
  ];
  
  // Sample notes
  const notes = [
    {
      id: '1',
      content: 'Interested in our premium service package with support options.',
      date: 'Apr 8, 2023',
      author: 'Alice Johnson'
    }
  ];
  
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    
    // In a real app, this would add the task to the database
    console.log('Adding new task:', newTask);
    setNewTask('');
  };
  
  return (
    <div className="space-y-4">
      {/* Tasks Section */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-purple-600" />
            <h2 className="font-medium text-gray-800">Tasks (2)</h2>
          </div>
          <ThreeDButton
            variant="info"
            size="sm"
            icon={Plus}
          >
            New
          </ThreeDButton>
        </div>
        
        <div className="p-4">
          <form onSubmit={handleAddTask} className="mb-4">
            <div className="relative">
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Add a new task..."
                className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <Circle className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
          </form>
          
          <div className="space-y-3">
            {tasks.map((task) => (
              <div key={task.id} className={`p-3 rounded-lg ${task.completed ? 'bg-gray-50' : 'bg-purple-50'}`}>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    {task.completed ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <Circle className="w-5 h-5 text-purple-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className={`font-medium ${task.completed ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
                      {task.title}
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {task.due}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {task.assigned}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <button className="text-xs text-gray-500 hover:text-gray-700">
                        <Check className="w-3 h-3" />
                      </button>
                      <button className="text-xs text-gray-500 hover:text-gray-700">
                        <Edit3 className="w-3 h-3" />
                      </button>
                      <button className="text-xs text-gray-500 hover:text-red-500">
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Appointments Section */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-purple-600" />
            <h2 className="font-medium text-gray-800">Appointments (1)</h2>
          </div>
          <ThreeDButton
            variant="info"
            size="sm"
            icon={Plus}
          >
            Schedule
          </ThreeDButton>
        </div>
        
        <div className="p-4">
          {appointments.length > 0 ? (
            <div className="space-y-3">
              {appointments.map((appointment) => (
                <div key={appointment.id} className="p-3 bg-blue-50 rounded-lg">
                  <div className="font-medium text-gray-800">{appointment.title}</div>
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {appointment.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {appointment.time}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                    <User className="w-3 h-3" />
                    <span>Participants: {appointment.participants.join(', ')}</span>
                  </div>
                  <div className="mt-2 flex gap-2">
                    <ThreeDButton
                      variant="secondary"
                      size="sm"
                      icon={Phone}
                    >
                      Call
                    </ThreeDButton>
                    <ThreeDButton
                      variant="info"
                      size="sm"
                      icon={MessageSquare}
                    >
                      SMS
                    </ThreeDButton>
                    <ThreeDButton
                      variant="primary"
                      size="sm"
                      icon={Mail}
                    >
                      Email
                    </ThreeDButton>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-4">
              <p>No upcoming appointments</p>
              <p className="mt-1 text-sm">
                <a href="#" className="text-purple-600 hover:text-purple-800">
                  View past appointments
                </a>
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Notes Section */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-purple-600" />
            <h2 className="font-medium text-gray-800">Notes</h2>
          </div>
          <ThreeDButton
            variant="info"
            size="sm"
            icon={Plus}
          >
            Add
          </ThreeDButton>
        </div>
        
        <div className="divide-y">
          {notes.map((note) => (
            <div key={note.id} className="p-4 hover:bg-gray-50">
              <p className="text-gray-700">{note.content}</p>
              <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                <span>{note.date}</span>
                <span>{note.author}</span>
              </div>
            </div>
          ))}
          {notes.length === 0 && (
            <div className="p-4 text-center text-gray-500">
              No notes yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
}