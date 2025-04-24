export function formatPhoneNumber(number: string): string {
  const cleaned = number.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{4})$/);
  
  if (match) {
    return `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}`;
  }
  
  return number;
}

export function isValidPhoneNumber(number: string): boolean {
  const cleaned = number.replace(/\D/g, '');
  return cleaned.length >= 10 && cleaned.length <= 11;
}