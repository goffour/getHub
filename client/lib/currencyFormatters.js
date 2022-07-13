// Formatting fro currnecy is currently in en-us. Could consider checkcing 
// the actuall settings for the browser? 
export const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2
});
