import React from 'react';
import { Calendar, Clock, FileSpreadsheet } from 'lucide-react';
import { Campaign } from '../../../types/campaign';
import { CampaignTypeSelector } from './CampaignTypeSelector';
import { FileUploader } from './FileUploader';
import { FieldMapper } from './FieldMapper';
import { SaveButton } from './SaveButton';
import { PowerDialingSettings } from './PowerDialingSettings';
import { useFieldMapping } from '../hooks/useFieldMapping';
import { useCampaignForm } from '../hooks/useCampaignForm';
import { TeamSelector } from './TeamSelector';
import { useTeamMembers } from '../../settings/sections/team/useTeamMembers';
import { BulkSMSSettings } from './BulkSMSSettings';
import { ContactSelector } from './ContactSelector';
import { useContactGroups } from '../../../hooks/useContactGroups';

interface CampaignFormProps {
  initialData?: Campaign;
  onSubmit: (campaign: Campaign) => void;
  onCancel: () => void;
  initialType?: 'power-dialing' | 'bulk-sms';
}

export function CampaignForm({ initialData, onSubmit, onCancel, initialType }: CampaignFormProps) {
  const {
    formData,
    isSaving,
    saveError,
    updateField,
    handleSave
  } = useCampaignForm({ initialData, initialType });

  const {
    contacts,
    fieldMapping,
    detectedFields,
    setContacts,
    updateFieldMapping,
    confirmMapping
  } = useFieldMapping();

  const { members } = useTeamMembers();
  const { groups } = useContactGroups();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const savedCampaign = await handleSave();
      onSubmit(savedCampaign);
    } catch (error) {
      console.error('Failed to save campaign:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {saveError && (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg">
          {saveError}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Campaign Name
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => updateField('name', e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="Enter campaign name"
          required
        />
      </div>

      <CampaignTypeSelector
        value={formData.type!}
        onChange={(type) => updateField('type', type)}
      />

      {formData.type === 'power-dialing' && (
        <PowerDialingSettings
          useVoicemailDrop={formData.settings?.useVoicemailDrop || false}
          voicemailDropId={formData.voicemailDropId}
          onUseVoicemailDropChange={(use) => 
            updateField('settings', { ...formData.settings, useVoicemailDrop: use })
          }
          onVoicemailDropChange={(id) => updateField('voicemailDropId', id)}
        />
      )}

      {formData.type === 'bulk-sms' && (
        <BulkSMSSettings
          messageTemplate={formData.settings?.messageTemplate || ''}
          onMessageTemplateChange={(template) =>
            updateField('settings', { ...formData.settings, messageTemplate: template })
          }
        />
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) => updateField('startDate', e.target.value)}
              className="w-full pl-10 pr-3 py-2 border rounded-md"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start Time
          </label>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="time"
              value={formData.startTime}
              onChange={(e) => updateField('startTime', e.target.value)}
              className="w-full pl-10 pr-3 py-2 border rounded-md"
              required
            />
          </div>
        </div>
      </div>

      <TeamSelector
        members={members}
        selectedMembers={formData.assignedTeam || []}
        onChange={(team) => updateField('assignedTeam', team)}
      />

      <div className="border-t pt-6">
        <div className="flex items-center gap-2 mb-4">
          <FileSpreadsheet className="w-5 h-5 text-gray-500" />
          <h3 className="text-lg font-medium text-gray-800">Contact List</h3>
        </div>
        
        <ContactSelector
          selectedContacts={contacts}
          onContactsChange={setContacts}
          groups={groups}
          onUpload={setContacts}
        />

        {detectedFields.length > 0 && (
          <FieldMapper
            detectedFields={detectedFields}
            mapping={fieldMapping}
            onChange={updateFieldMapping}
            onConfirm={confirmMapping}
          />
        )}
      </div>

      <div className="flex justify-end gap-4 pt-6 border-t">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
        >
          Cancel
        </button>
        <SaveButton
          onClick={handleSubmit}
          isSaving={isSaving}
          label={initialData ? 'Update Campaign' : 'Create Campaign'}
        />
      </div>
    </form>
  );
}