import { useState, useCallback } from 'react';
import { Contact, FieldMapping } from '../../../types/campaign';

export function useFieldMapping() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [detectedFields, setDetectedFields] = useState<string[]>([]);
  const [fieldMapping, setFieldMapping] = useState<FieldMapping>({});
  const [isMappingConfirmed, setIsMappingConfirmed] = useState(false);

  const handleContactsUpload = useCallback((newContacts: Contact[]) => {
    setContacts(newContacts);
    
    // Detect fields from the first contact
    if (newContacts.length > 0) {
      const fields = Object.keys(newContacts[0]);
      setDetectedFields(fields);

      // Auto-map fields based on common patterns
      const autoMapping: FieldMapping = {};
      fields.forEach(field => {
        const lowerField = field.toLowerCase();
        if (lowerField.includes('name')) autoMapping.name = field;
        if (lowerField.includes('phone')) autoMapping.phone = field;
        if (lowerField.includes('email')) autoMapping.email = field;
        if (lowerField.includes('address')) autoMapping.address = field;
      });
      setFieldMapping(autoMapping);
    }
  }, []);

  const updateFieldMapping = useCallback((field: string, mappedTo: string) => {
    setFieldMapping(prev => ({
      ...prev,
      [field]: mappedTo
    }));
  }, []);

  const confirmMapping = useCallback(() => {
    setIsMappingConfirmed(true);
  }, []);

  return {
    contacts,
    detectedFields,
    fieldMapping,
    isMappingConfirmed,
    setContacts: handleContactsUpload,
    updateFieldMapping,
    confirmMapping
  };
}