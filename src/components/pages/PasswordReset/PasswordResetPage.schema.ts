import { object, ref, string } from 'yup';

export const PasswordResetPageSchema = object()
  .shape({
    newPassword: string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters'),
    confirmNewPassword: string()
      .oneOf([ref('newPassword'), null], 'Passwords must match')
      .required('Confirm password is required'),
  })
  .required();
