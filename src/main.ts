import './style.css';
import { Chart } from 'chart.js';
import type { AmortizationScheduleEntry } from './types';

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
});
