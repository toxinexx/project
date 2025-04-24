import React from 'react';
import { Building2, Mail, Globe, MapPin, Phone, User } from 'lucide-react';
import { Input } from '../../controls/Input';
import { SaveButton } from './SaveButton';
import { useCompanyForm } from './useCompanyForm';
import { CompanyInfo } from '../../../../types/company';

export function CompanyDetails() {
  const {
    formData,
    isSaving,
    saveSuccess,
    handleInputChange,
    handleSave
  } = useCompanyForm();

  const isFormValid = Object.values(formData).some(value => value.trim() !== '');

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Company Name"
          icon={Building2}
          placeholder="Enter company name"
          value={formData.name}
          onChange={(value) => handleInputChange('name', value)}
        />
        <Input
          label="Contact Person"
          icon={User}
          placeholder="Enter contact person name"
          value={formData.contactPerson}
          onChange={(value) => handleInputChange('contactPerson', value)}
        />
        <Input
          label="Email"
          icon={Mail}
          type="email"
          placeholder="company@example.com"
          value={formData.email}
          onChange={(value) => handleInputChange('email', value)}
        />
        <Input
          label="Phone"
          icon={Phone}
          placeholder="+1 (555) 123-4567"
          value={formData.phone}
          onChange={(value) => handleInputChange('phone', value)}
        />
        <Input
          label="Website"
          icon={Globe}
          placeholder="https://example.com"
          value={formData.website}
          onChange={(value) => handleInputChange('website', value)}
        />
        <Input
          label="Address"
          icon={MapPin}
          placeholder="Enter company address"
          value={formData.address}
          onChange={(value) => handleInputChange('address', value)}
        />
      </div>
      
      <div className="flex justify-end">
        <SaveButton
          onClick={handleSave}
          isSaving={isSaving}
          showSuccess={saveSuccess}
          disabled={!isFormValid}
        />
      </div>
    </div>
  );
}