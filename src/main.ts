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
});
