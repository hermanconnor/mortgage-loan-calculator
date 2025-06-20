export interface AmortizationScheduleEntry {
  paymentNumber: number;
  paymentDate: Date;
  paymentAmount: number;
  principalPayment: number;
  interestPayment: number;
  remainingBalance: number;
}
