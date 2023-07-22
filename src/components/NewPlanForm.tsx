import * as React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FormVals, PaymentPlan } from '../types';

interface NewPlanFormProps {
  submitForm: (vals: PaymentPlan) => void;
}

const NewPlanForm = (props: NewPlanFormProps) => {
  const { register, handleSubmit } = useForm<FormVals>();
  const submitHandler: SubmitHandler<FormVals> = (vals) => {
    const newVals: PaymentPlan = {
      title: '',
      startingBalance: 0,
      rate: 0,
      monthlyPayment: 0,
    };
    for (const val in vals) {
      newVals[val] = Number(vals[val]);
    }
    props.submitForm(newVals);
  };
  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className="column">
        <label>Starting Balance</label>
        <input {...register('startingBalance')} type="number" />
        <label>Interest Rate</label>
        <input {...register('rate')} type="number" step="0.1" />
        <label>Monthly Payment</label>
        <input {...register('monthlyPayment')} type="number" />
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default NewPlanForm;
