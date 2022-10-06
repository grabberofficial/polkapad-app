import { AUTH_TOKEN_KEY } from '@/constants/localStorage';

export function getToken() {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function setToken(token: string) {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
}

export function logout() {
  localStorage.removeItem(AUTH_TOKEN_KEY);
}
