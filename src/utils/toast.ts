import toast from 'react-hot-toast';

export const success = (text: string) => {
  toast.success(text);
};

export const error = (text: string) => {
  toast.error(text);
};

export const info = (text: string) => {
  toast(text);
};
