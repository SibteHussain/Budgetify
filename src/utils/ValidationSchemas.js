import * as yup from 'yup';

export const ExpenseValidationSchema = yup.object().shape({
  name: yup.string().required('You must choose a beneficiary.'),
  amount: yup
    .number('Amount must be a number')
    .required('Amount must be a number'),
  reason: yup.string().required('Please select a reason for transaction'),
  transactionType: yup
    .string()
    .required('Select a Valid Transaction Type to continue.'),
});
