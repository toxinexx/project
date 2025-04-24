export interface Integration {
  id: string;
  name: string;
  status: 'connected' | 'not_connected';
  apiKey?: string;
}

export interface IntegrationConfig {
  clientId?: string;
  clientSecret?: string;
  apiKey?: string;
  domain?: string;
  [key: string]: string | undefined;
}