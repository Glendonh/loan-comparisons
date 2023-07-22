import * as React from 'react';
import { findSavings, formatter } from '../utils';
import { basePlan, modifiedPlans } from '../constants';
import { PaymentPlan } from '../types';
import '../style.css';

const getTimeSavedString = (years: number, months: number) => {
  let string = '';

  if (years > 0) {
    string += years > 1 ? `${years} Years` : '1 Year';
    if (months > 0) {
      string += `, ${months} Months`;
    }
  }
  return string;
};

const TableRow = ({ plan }: { plan: PaymentPlan }) => {
  const { moneySaved, yearsSaved, monthsSaved } = findSavings(plan);
  return (
    <tr>
      <td>{plan.title}</td>
      <td>{plan.rate}</td>
      <td>{formatter.format(plan.monthlyPayment)}</td>
      <td>
        {plan.startingBalance === basePlan.startingBalance ? 'NO' : 'YES'}
      </td>
      <td>{formatter.format(moneySaved)}</td>
      <td>{getTimeSavedString(yearsSaved, monthsSaved)}</td>
    </tr>
  );
};

const ComparisonTable = () => {
  const [activePlans, setActivePlans] = React.useState<PaymentPlan[]>([]);
  const togglePlanByTitle = (title: string) => () => {
    if (activePlans.some((p) => p.title === title)) {
      const newPlans = activePlans.filter((p) => p.title !== title);
      setActivePlans(newPlans);
    } else {
      const planToAdd = modifiedPlans.find((p) => p.title === title);
      const newPlans = [...activePlans, planToAdd];
      setActivePlans(newPlans);
    }
  };
  return (
    <>
      <table>
        <tr>
          <th>Plan</th>
          <th>Rate</th>
          <th>Payment</th>
          <th>Forgiveness</th>
          <th>Money Saved</th>
          <th>Time Saved</th>
        </tr>
        <tr>
          <td>{basePlan.title}</td>
          <td>{basePlan.rate}</td>
          <td>{formatter.format(basePlan.monthlyPayment)}</td>
          <td>NO</td>
          <td>N/A</td>
          <td>N/A</td>
        </tr>
        {activePlans.map((plan) => (
          <TableRow plan={plan} />
        ))}
      </table>
      <div className="row">
        {modifiedPlans.map(({ title }) => {
          const btnClass = activePlans.some((p) => p.title === title)
            ? 'toggle-btn-active'
            : 'toggle-btn';
          return (
            <button onClick={togglePlanByTitle(title)} className={btnClass}>
              {title}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default ComparisonTable;
