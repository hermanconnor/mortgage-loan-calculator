import './style.css';
import { Chart } from 'chart.js';
import type { AmortizationScheduleEntry } from './types';
import { formatCurrency, formatDate } from './utils/formatters';

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

  // CHART INITIALIZATION
  let paymentChart: any;

  // PAGINATION STATE VARIABLES
  let amortizationSchedule: AmortizationScheduleEntry[] = [];
  let currentPage: number = 1;
  const paymentsPerPage: number = 12;

  const updateChart = (principal: number, interest: number): void => {
    const canvas = document.getElementById(
      'payment-chart',
    ) as HTMLCanvasElement;

    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    // Destroy previous chart if it exists to prevent memory leaks and issues with re-rendering
    if (paymentChart) {
      paymentChart.destroy();
    }

    paymentChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Principal', 'Interest'],
        datasets: [
          {
            data: [principal, interest],
            backgroundColor: ['#155dfb', '#ef4444'],
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, // Allows the chart to fill its container
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              font: {
                size: 14,
              },
            },
          },
          tooltip: {
            callbacks: {
              label: (context: any) => {
                const label = context.label || '';
                const value = context.raw;
                return `${label}: ${formatCurrency(value)}`;
              },
            },
          },
        },
      },
    });
  };

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
        <td class="p-3 text-left border-b">${payment.paymentNumber}</td>
        <td>${formatDate(payment.paymentDate)}</td>
        <td>${formatCurrency(payment.paymentAmount)}</td>
        <td>${formatCurrency(payment.principalPayment)}</td>
        <td>${formatCurrency(payment.interestPayment)}</td>
        <td>${formatCurrency(payment.remainingBalance)}</td>
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
});
