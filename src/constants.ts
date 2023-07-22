import { PaymentPlan } from './types';

export const baseInterest = 6.8;
export const baseBalance = 85477.59;
export const basePayment = 1000;
const lowRate = 5;
const highPayment = 1200;
const smallerBalance = 75477.59;

export const basePlan: PaymentPlan = {
  title: 'Base Plan',
  startingBalance: baseBalance,
  rate: baseInterest,
  monthlyPayment: basePayment,
};

export const higherPayments: PaymentPlan = {
  ...basePlan,
  title: 'Higher Payments',
  monthlyPayment: highPayment,
};

export const lowerInterest: PaymentPlan = {
  ...basePlan,
  title: 'Lower Interest',
  rate: lowRate,
};

export const forgiveness: PaymentPlan = {
  ...basePlan,
  title: '10k Forgiveness',
  startingBalance: smallerBalance,
};

const highPaymentLowInterest: PaymentPlan = {
  title: 'Higher Payments & Lower Interest',
  startingBalance: baseBalance,
  rate: lowRate,
  monthlyPayment: highPayment,
};

const lowInterestForgiveness: PaymentPlan = {
  title: 'Lower Interest & Forgiveness',
  rate: lowRate,
  startingBalance: smallerBalance,
  monthlyPayment: basePayment,
};

const highPaymentForgiveness: PaymentPlan = {
  title: 'Higher Payments & Forgiveness',
  rate: baseInterest,
  startingBalance: smallerBalance,
  monthlyPayment: highPayment,
};

const tripleWhammy: PaymentPlan = {
  title: 'Higher Payments & Lower Interest & Forgiveness',
  rate: lowRate,
  startingBalance: smallerBalance,
  monthlyPayment: highPayment,
};

export const planOptions = [
  basePlan,
  higherPayments,
  lowerInterest,
  forgiveness,
  highPaymentLowInterest,
  lowInterestForgiveness,
  highPaymentForgiveness,
  tripleWhammy,
];

export const modifiedPlans = [
  higherPayments,
  lowerInterest,
  forgiveness,
  highPaymentLowInterest,
  lowInterestForgiveness,
  highPaymentForgiveness,
  tripleWhammy,
];
