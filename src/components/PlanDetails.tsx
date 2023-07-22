import * as React from 'react';
import { PaymentPlan } from '../types';
import { baseBalance, baseInterest, basePayment } from '../constants';

interface PlanDetailsProps {
  plan: PaymentPlan;
  onRemove: (title: string) => void;
}

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const generateDetails = (plan: PaymentPlan) => {
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
  const years = Math.floor(totalPayments / 12);
  const months = totalPayments % 12;
  return { amountPaid, years, months };
};

const PlanDetails = ({ plan, onRemove }: PlanDetailsProps) => {
  const details = generateDetails(plan);
  const balanceClass = plan.startingBalance === baseBalance ? '' : 'green-text';
  const rateClass = plan.rate === baseInterest ? '' : 'green-text';
  const paymentClass = plan.monthlyPayment === basePayment ? '' : 'green-text';
  const handleRemove = () => {
    onRemove(plan.title);
  };
  return (
    <div>
      <div className="details-box">
        <div className="title-row">
          <span className="plan-title">{plan.title}</span>
          {plan.title !== 'Base Plan' && (
            <button className="close-button" onClick={handleRemove}>
              &#10005;
            </button>
          )}
        </div>

        <div className="plan-format">
          <span
            className={balanceClass}
          >{`Starting Balance: $${plan.startingBalance}`}</span>
          <span className={rateClass}>{`Interest Rate: ${plan.rate}%`}</span>
          <span className={paymentClass}>{`Monthly Payment:: ${formatter.format(
            plan.monthlyPayment
          )}`}</span>
        </div>
        <table>
          <tr>
            <th>Total Paid:</th>
            <td>{`${formatter.format(details.amountPaid)}`}</td>
          </tr>
          <tr>
            <th>Duration:</th>
            <td>{`${details.years} years, ${details.months} months`}</td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default PlanDetails;
