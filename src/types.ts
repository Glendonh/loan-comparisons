export interface PaymentPlan {
  title: string;
  startingBalance: number;
  rate: number;
  monthlyPayment: number;
}

export interface FormVals {
  startingBalance: string;
  rate: string;
  monthlyPayment: string;
}
