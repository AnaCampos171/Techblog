// Helper function to format a date as MM/DD/YYYY
const format_date = (date) => {
    return date.toLocaleDateString();
  };
  
  // Helper function to format an amount with commas for readability
  const format_amount = (amount) => {
    return parseInt(amount).toLocaleString();
  };
  
  // Export the helper functions
  module.exports = {
    format_date,
    format_amount
  };
  