export function generateTwilioToken(identity: string): string {
  // In a real application, this would make an API call to your backend
  // For now, we return a dummy token since we're not actually connecting to Twilio
  return `dummy-token-${identity}-${Date.now()}`;
}

export function parseConnection(connection: any) {
  return {
    callerId: connection.parameters.From,
    direction: connection.parameters.Direction,
    status: connection.status()
  };
}