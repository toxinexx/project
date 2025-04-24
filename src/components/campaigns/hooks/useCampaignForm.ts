import { useState, useCallback } from 'react';
import { Campaign, CampaignType } from '../../../types/campaign';

interface UseCampaignFormProps {
  initialData?: Campaign;
  initialType?: CampaignType;
}

export function useCampaignForm({ initialData, initialType }: UseCampaignFormProps = {}) {
  const [formData, setFormData] = useState<Partial<Campaign>>({
    name: initialData?.name || '',
    type: initialData?.type || initialType || 'power-dialing',
    startDate: initialData?.startDate || '',
    startTime: initialData?.startTime || '',
    status: initialData?.status || 'draft',
    contacts: initialData?.contacts || [],
    fieldMapping: initialData?.fieldMapping || {},
    settings: initialData?.settings || {}
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const updateField = useCallback(<K extends keyof Campaign>(
    field: K,
    value: Campaign[K]
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleSave = useCallback(async () => {
    setIsSaving(true);
    setSaveError(null);

    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const campaign: Campaign = {
        id: initialData?.id || crypto.randomUUID(),
        ...formData as Omit<Campaign, 'id'>
      };

      // Save to localStorage for persistence
      const savedCampaigns = JSON.parse(localStorage.getItem('campaigns') || '[]');
      const updatedCampaigns = initialData
        ? savedCampaigns.map((c: Campaign) => c.id === campaign.id ? campaign : c)
        : [...savedCampaigns, campaign];
      
      localStorage.setItem('campaigns', JSON.stringify(updatedCampaigns));
      
      return campaign;
    } catch (error) {
      setSaveError('Failed to save campaign');
      throw error;
    } finally {
      setIsSaving(false);
    }
  }, [formData, initialData]);

  return {
    formData,
    isSaving,
    saveError,
    updateField,
    handleSave
  };
}