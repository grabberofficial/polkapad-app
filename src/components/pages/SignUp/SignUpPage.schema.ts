import { object, ref, string } from 'yup';

export const SignUpPageSchema = object()
  .shape({
    email: string().required('Email is required').email('Email is invalid'),
    password: string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.{8,})(^\S*$)/,
        'Must have at least one uppercase and one lowercase',
      )
      .matches(/^(?=.*[0-9])(^\S*$)/, 'Must have at least one number'),
    confirmPassword: string()
      .oneOf([ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
  })
  .required();
