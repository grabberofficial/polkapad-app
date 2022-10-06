import { boolean, object, string } from 'yup';

export const AuthEmailPageSchema = object()
  .shape({
    email: string().required('Email is required').email('Email is invalid'),
    terms: boolean()
      .required('You must accept the terms and conditions')
      .oneOf([true], 'You must accept the terms and conditions'),
  })
  .required();
