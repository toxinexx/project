import { useState } from 'react';
import { CompanyInfo } from '../../../../types/company';

export function useCompanyForm(initialData?: Partial<CompanyInfo>) {
  const [formData, setFormData] = useState<CompanyInfo>({
    name: initialData?.name || '',
    contactPerson: initialData?.contactPerson || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    website: initialData?.website || '',
    address: initialData?.address || '',
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleInputChange = (field: keyof CompanyInfo, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      localStorage.setItem('company_info', JSON.stringify(formData));
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Failed to save company info:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return {
    formData,
    isSaving,
    saveSuccess,
    handleInputChange,
    handleSave
  };
}