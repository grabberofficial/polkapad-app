import { object, string } from 'yup';

export const SendCodePageSchema = object()
  .shape({
    email: string().required('Email is required').email('Email is invalid'),
  })
  .required();
