import './style.css';
import type { AmortizationScheduleEntry } from './types';
import { formatCurrency, formatDate } from './utils/formatters';
import { calculateMortgage } from './utils/mortgage-calculator';
import { generateAmortizationSchedule } from './utils/amortization';
import { updateChart } from './utils/chart';

document.addEventListener('DOMContentLoaded', () => {
  const mortgageForm = document.getElementById(
    'mortgage-form',
  ) as HTMLFormElement;
  const loanAmountInput = document.getElementById(
    'loan-amount',
  ) as HTMLInputElement;
  const interestRateInput = document.getElementById(
    'interest-rate',
  ) as HTMLInputElement;
  const loanTermInput = document.getElementById(
    'loan-term',
  ) as HTMLInputElement;
  const paymentFrequencySelect = document.getElementById(
    'payment-frequency',
  ) as HTMLSelectElement;
  const downPaymentInput = document.getElementById(
    'down-payment',
  ) as HTMLInputElement;
  const monthlyPaymentEl = document.getElementById(
    'monthly-payment',
  ) as HTMLElement;
  const totalPaymentEl = document.getElementById(
    'total-payment',
  ) as HTMLElement;
  const totalInterestEl = document.getElementById(
    'total-interest',
  ) as HTMLElement;
  const amortizationTable = document
    .getElementById('amortization-table')
    ?.querySelector('tbody') as HTMLTableSectionElement;

  const prevPageButton = document.getElementById(
    'prev-page',
  ) as HTMLButtonElement;
  const nextPageButton = document.getElementById(
    'next-page',
  ) as HTMLButtonElement;
  const pageInfoEl = document.getElementById('page-info') as HTMLElement;

  // PAGINATION STATE VARIABLES
  let amortizationSchedule: AmortizationScheduleEntry[] = [];
  let currentPage: number = 1;
  const paymentsPerPage: number = 12;

  const displayCurrentPage = (): void => {
    amortizationTable.innerHTML = '';

    const totalPages = Math.ceil(amortizationSchedule.length / paymentsPerPage);

    pageInfoEl.textContent = `Page ${currentPage} of ${totalPages}`;

    prevPageButton.disabled = currentPage === 1;
    nextPageButton.disabled = currentPage === totalPages;

    const startIndex = (currentPage - 1) * paymentsPerPage;
    const endIndex = Math.min(
      startIndex + paymentsPerPage,
      amortizationSchedule.length,
    );

    for (let i = startIndex; i < endIndex; i++) {
      const payment = amortizationSchedule[i];

      const row = document.createElement('tr');
      row.classList.add('hover:bg-gray-50');

      row.innerHTML = `
        <td class="p-3 text-left border-b border-b-gray-300">${
          payment.paymentNumber
        }</td>
        <td class="p-3 text-left border-b border-b-gray-300">${formatDate(
          payment.paymentDate,
        )}</td>
        <td class="p-3 text-left border-b border-b-gray-300">${formatCurrency(
          payment.paymentAmount,
        )}</td>
        <td class="p-3 text-left border-b border-b-gray-300">${formatCurrency(
          payment.principalPayment,
        )}</td>
        <td class="p-3 text-left border-b border-b-gray-300">${formatCurrency(
          payment.interestPayment,
        )}</td>
        <td class="p-3 text-left border-b border-b-gray-300">${formatCurrency(
          payment.remainingBalance,
        )}</td>
      `;

      amortizationTable.appendChild(row);
    }
  };

  const updateAmortizationTable = (
    schedule: AmortizationScheduleEntry[],
  ): void => {
    // Store the full schedule globally for pagination
    amortizationSchedule = schedule;

    // Reset to first page when recalculating
    currentPage = 1;

    // Update the table with the current page
    displayCurrentPage();
  };

  // ::: EVENT LISTENERS :::
  //
  prevPageButton.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      displayCurrentPage();
    }
  });

  nextPageButton.addEventListener('click', () => {
    const totalPages = Math.ceil(amortizationSchedule.length / paymentsPerPage);

    if (currentPage < totalPages) {
      currentPage++;
      displayCurrentPage();
    }
  });

  mortgageForm.addEventListener('submit', (e: SubmitEvent) => {
    e.preventDefault();

    const loanAmountRaw = parseFloat(loanAmountInput.value) || 0;
    const downPaymentRaw = parseFloat(downPaymentInput.value || '0') || 0;
    const loanAmount: number = loanAmountRaw - downPaymentRaw;
    const interestRate = parseFloat(interestRateInput.value) || 0;
    const loanTerm = parseInt(loanTermInput.value) || 0;
    const paymentFrequency = parseInt(paymentFrequencySelect.value) || 0;

    if (
      loanAmount <= 0 ||
      interestRate < 0 ||
      loanTerm <= 0 ||
      paymentFrequency <= 0
    ) {
      console.warn(
        'Please enter valid positive values for Loan Amount, Interest Rate, Loan Term, and Payment Frequency.',
      );

      monthlyPaymentEl.textContent = '$0.00';
      totalPaymentEl.textContent = '$0.00';
      totalInterestEl.textContent = '$0.00';
      updateChart(0, 0);
      updateAmortizationTable([]);
      return;
    }

    // Calculate mortgage
    const { paymentAmount, totalPayment, totalInterest } = calculateMortgage(
      loanAmount,
      interestRate,
      loanTerm,
      paymentFrequency,
    );

    // Update results in the DOM
    monthlyPaymentEl.textContent = formatCurrency(paymentAmount);
    totalPaymentEl.textContent = formatCurrency(totalPayment);
    totalInterestEl.textContent = formatCurrency(totalInterest);

    // Generate amortization schedule
    const schedule = generateAmortizationSchedule(
      loanAmount,
      interestRate,
      loanTerm,
      paymentFrequency,
      paymentAmount,
    );

    // Update chart with the loan's principal and total interest
    updateChart(loanAmount, totalInterest);

    // Update amortization table with the generated schedule
    updateAmortizationTable(schedule);
  });

  // Initialize with default values by dispatching a submit event on page load
  mortgageForm.dispatchEvent(new Event('submit'));
});
