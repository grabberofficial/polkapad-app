import { serviceUrl } from '@/config/env';

const BASE_ROUTE = `https://${serviceUrl}`;

// PAGES
export const HOME_ROUTE = '/';
export const AUTH_EMAIL_ROUTE = '/auth/email';
export const AUTH_VERIFY_CODE_ROUTE = '/auth/verify-code';
export const LOGIN_ROUTE = '/auth/login';
export const REGISTER_ROUTE = '/auth/register';
export const WAIT_ROUTE = '/auth/wait';
export const LOCKER_ROUTE = '/locker';
export const STAKING_ROUTE = '/staking';
export const SALE_ROUTE = '/sale';
export const TEST_SALE_ROUTE = '/test-sale';
export const MOBILE_KYC_ROUTE = '/mobile-kyc';
export const MOBILE_WALLET_ROUTE = '/mobile-wallet';
export const PROFILE_ROUTE = '/profile';
export const WALLET_ROUTE = '/profile?wallet=true';
export const KYC_ROUTE = '/profile?kyc=true';

// API
export const API_SEND_CODE_ROUTE = `${BASE_ROUTE}/auth/send-code`;
export const API_VERIFY_CODE_ROUTE = `${BASE_ROUTE}/auth/verify-code`;
export const API_LOGIN_ROUTE = `${BASE_ROUTE}/auth/authorize`;
export const API_REGISTER_ROUTE = `${BASE_ROUTE}/auth/register`;
export const API_ANALYTICS_ROUTE = `${BASE_ROUTE}/analytics`;
export const API_USER_ROUTE = `${BASE_ROUTE}/users/currentUser`;
export const API_KYC_ROUTE = `${BASE_ROUTE}/kyc/verification-url`;
export const API_KYC_STATUS_ROUTE = `${BASE_ROUTE}/kyc/status`;
