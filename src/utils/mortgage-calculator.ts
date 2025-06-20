/**
 * Calculates mortgage details based on loan parameters.
 * @param loanAmount The total loan amount.
 * @param interestRate The annual interest rate (e.g., 4.5 for 4.5%).
 * @param loanTerm The loan term in years.
 * @param paymentFrequency The number of payments per year (e.g., 12 for monthly).
 * @returns An object containing payment details.
 */
export const calculateMortgage = (
  loanAmount: number,
  interestRate: number,
  loanTerm: number,
  paymentFrequency: number,
): {
  paymentAmount: number;
  totalPayment: number;
  totalInterest: number;
  totalPayments: number;
} => {
  // Convert annual interest rate to decimal and per payment period
  const periodicInterestRate = interestRate / 100 / paymentFrequency;

  // Calculate total number of payments
  const totalPayments = loanTerm * paymentFrequency;

  let monthlyPayment: number;
  // Handle zero interest rate case to avoid division by zero or NaN results
  if (periodicInterestRate === 0) {
    monthlyPayment = loanAmount / totalPayments;
  } else {
    // Calculate monthly payment using the formula: P = L[c(1 + c)^n]/[(1 + c)^n - 1]
    // Where P is the payment, L is the loan amount, c is the periodic interest rate, and n is the total number of payments
    monthlyPayment =
      (loanAmount *
        (periodicInterestRate *
          Math.pow(1 + periodicInterestRate, totalPayments))) /
      (Math.pow(1 + periodicInterestRate, totalPayments) - 1);
  }

  const totalPayment = monthlyPayment * totalPayments;
  const totalInterest = totalPayment - loanAmount;

  return {
    paymentAmount: monthlyPayment,
    totalPayment,
    totalInterest,
    totalPayments,
  };
};
