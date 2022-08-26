import { environment } from '@/config/env';

export const isProduction = environment === 'PRODUCTION';
export const isDevelopment = environment === 'DEVELOPMENT';
