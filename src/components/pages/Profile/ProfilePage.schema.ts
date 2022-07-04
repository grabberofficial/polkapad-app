import { object, string } from 'yup';

export const ProfilePageSchema = object()
  .shape({
    email: string().required('Email is required').email('Email is invalid'),
    name: string().required('Name is required'),
  })
  .required();
