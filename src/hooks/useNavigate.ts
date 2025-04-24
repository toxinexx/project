import { useCallback } from 'react';
import { useNavigate as useReactRouterNavigate } from 'react-router-dom';

export function useNavigate() {
  const navigate = useReactRouterNavigate();

  const goToDialer = useCallback((phoneNumber?: string) => {
    // Get the tab element
    const dialerTab = document.querySelector('[data-tab="dialer"]');
    
    // Simulate click to navigate to dialer tab
    if (dialerTab) {
      (dialerTab as HTMLElement).click();
      
      // If a phone number is provided, populate the dialer
      if (phoneNumber) {
        // In a real application, you would use a context or state management
        // For now, we'll just log it
        console.log('Dialing:', phoneNumber);
        
        // Attempt to find and set the dialer input
        setTimeout(() => {
          const dialerInput = document.querySelector('input[placeholder="Enter phone number"]');
          if (dialerInput) {
            (dialerInput as HTMLInputElement).value = phoneNumber;
            // Create a new input event to trigger change handlers
            const event = new Event('input', { bubbles: true });
            dialerInput.dispatchEvent(event);
          }
        }, 100);
      }
    }
  }, []);
  
  const goToSMS = useCallback((phoneNumber?: string) => {
    // Get the tab element
    const smsTab = document.querySelector('[data-tab="sms"]');
    
    // Simulate click to navigate to SMS tab
    if (smsTab) {
      (smsTab as HTMLElement).click();
      
      // If a phone number is provided, populate the SMS recipient field
      if (phoneNumber) {
        console.log('SMS to:', phoneNumber);
        
        // Attempt to find and set the SMS recipient input
        setTimeout(() => {
          const recipientInput = document.querySelector('input[placeholder="Enter phone number"]');
          if (recipientInput) {
            (recipientInput as HTMLInputElement).value = phoneNumber;
            // Create a new input event to trigger change handlers
            const event = new Event('input', { bubbles: true });
            recipientInput.dispatchEvent(event);
          }
        }, 100);
      }
    }
  }, []);
  
  const goToLeadDetail = useCallback((leadId: string) => {
    navigate(`/leads/${leadId}`);
  }, [navigate]);
  
  return {
    navigate,
    goToDialer,
    goToSMS,
    goToLeadDetail
  };
}