import * as React from 'react';
import PlanDetails from './PlanDetails';
import { planOptions } from '../constants';
import '../style.css';

const { useState } = React;

export default function OptionsList() {
  const [activePlans, setActivePlans] = useState(planOptions);
  const removePlanByTitle = (title: string) => {
    const filtered = activePlans.filter((p) => p.title !== title);
    setActivePlans(filtered);
  };
  return (
    <div>
      <h1>Loan Options</h1>
      {activePlans.map((option, index) => (
        <PlanDetails
          key={option.title}
          plan={option}
          onRemove={removePlanByTitle}
        />
      ))}
    </div>
  );
}
