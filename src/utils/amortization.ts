import type { AmortizationScheduleEntry } from '../types';

/**
 * Generates the full amortization schedule for the loan.
 * @param loanAmount The total loan amount.
 * @param interestRate The annual interest rate.
 * @param loanTerm The loan term in years.
 * @param paymentFrequency The number of payments per year.
 * @param paymentAmount The calculated payment amount per period.
 * @returns An array of AmortizationScheduleEntry objects.
 */
export const generateAmortizationSchedule = (
  loanAmount: number,
  interestRate: number,
  loanTerm: number,
  paymentFrequency: number,
  paymentAmount: number,
): AmortizationScheduleEntry[] => {
  const schedule: AmortizationScheduleEntry[] = [];
  const periodicInterestRate = interestRate / 100 / paymentFrequency;
  const totalPayments = loanTerm * paymentFrequency;
  const startDate = new Date();
  let remainingBalance: number = loanAmount;

  // Calculate payment interval in days for approximating payment dates, as months have different days.
  const paymentIntervalDays = Math.round(365 / paymentFrequency);

  for (let paymentNumber = 1; paymentNumber <= totalPayments; paymentNumber++) {
    // Calculate interest for this period
    const interestPayment = remainingBalance * periodicInterestRate;

    // Calculate principal for this period
    const principalPayment = paymentAmount - interestPayment;

    // Update remaining balance
    remainingBalance -= principalPayment;

    // Ensure we don't have negative balance due to floating point inaccuracies; cap at zero
    if (remainingBalance < 0) {
      remainingBalance = 0;
    }

    // Calculate payment date: Add days to the start date for each payment
    const paymentDate = new Date(startDate);

    paymentDate.setDate(
      paymentDate.getDate() + paymentNumber * paymentIntervalDays,
    );

    // Add to schedule
    schedule.push({
      paymentNumber,
      paymentDate,
      paymentAmount,
      principalPayment,
      interestPayment,
      remainingBalance,
    });
  }

  return schedule;
};
