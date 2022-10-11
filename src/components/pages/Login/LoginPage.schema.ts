import { object, string } from 'yup';

export const LoginPageSchema = object()
  .shape({
    email: string().required('Email is required').email('Email is invalid'),
    password: string().required('Password is required'),
  })
  .required();

export const LoginPageSchema2 = object()
  .shape({
    email: string().required('Email is required').email('Email is invalid'),
  })
  .required();
