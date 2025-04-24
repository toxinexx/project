interface EnvConfig {
  TWILIO_ACCOUNT_SID: string;
  TWILIO_AUTH_TOKEN: string;
  TWILIO_PHONE_NUMBER: string;
}

export const env: EnvConfig = {
  TWILIO_ACCOUNT_SID: import.meta.env.VITE_TWILIO_ACCOUNT_SID || '',
  TWILIO_AUTH_TOKEN: import.meta.env.VITE_TWILIO_AUTH_TOKEN || '',
  TWILIO_PHONE_NUMBER: import.meta.env.VITE_TWILIO_PHONE_NUMBER || ''
};