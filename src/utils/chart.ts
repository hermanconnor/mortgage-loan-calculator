import {
  Chart,
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { formatCurrency } from './formatters';

Chart.register(ArcElement, Tooltip, Legend, DoughnutController);

let paymentChart: Chart<'doughnut', number[], string>;

/**
 * Updates the doughnut chart with new principal and interest values.
 * @param principal The total principal paid.
 * @param interest The total interest paid.
 */
export const updateChart = (principal: number, interest: number): void => {
  const canvas = document.getElementById('payment-chart') as HTMLCanvasElement;

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
