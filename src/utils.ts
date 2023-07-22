import { PaymentPlan } from './types';
import { basePlan } from './constants';

const getTimeAndTotal = (plan: PaymentPlan) => {
  const { startingBalance, rate, monthlyPayment } = plan;
  const percentageAdded = rate / 100 / 12;
  let currentBalance: number = startingBalance;
  let amountPaid = 0;
  let totalPayments = 0;
  while (currentBalance > 0) {
    const amountAdded =
      Math.round(currentBalance * percentageAdded * 100) / 100;
    const actualPayment = Math.min(monthlyPayment, currentBalance);
    currentBalance =
      Math.round((currentBalance + amountAdded - actualPayment) * 100) / 100;
    amountPaid = amountPaid + actualPayment;
    totalPayments++;
  }
  return { amountPaid, totalPayments };
};

export const generateDetails = (plan: PaymentPlan) => {
  const { totalPayments, amountPaid } = getTimeAndTotal(plan);
  const years = Math.floor(totalPayments / 12);
  const months = totalPayments % 12;
  return { amountPaid, years, months };
};

const { amountPaid: baseTotal, totalPayments: baseTime } =
  getTimeAndTotal(basePlan);

export const findSavings = (plan: PaymentPlan) => {
  const { amountPaid, totalPayments } = getTimeAndTotal(plan);
  const moneySaved = baseTotal - amountPaid;
  const timeSaved = baseTime - totalPayments;
  const yearsSaved = Math.floor(timeSaved / 12);
  const monthsSaved = timeSaved % 12;
  return { moneySaved, yearsSaved, monthsSaved };
};

export const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});
