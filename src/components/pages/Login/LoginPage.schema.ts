import { object, string } from 'yup';

export const PasswordLoginPageSchema = object()
  .shape({
    email: string().required('Email is required').email('Email is invalid'),
    password: string().required('Password is required'),
  })
  .required();

export const CodeLoginPageSchema = object()
  .shape({
    email: string().required('Email is required').email('Email is invalid'),
  })
  .required();
