import { CURRENCIES, JOB_TYPES } from './data';
import { Options } from './GeneralProps';
import { removeCookies, setCookies } from 'cookies-next';
import { AUTH_ROUTES } from './routes';

export const getRange = (
  currency: string | undefined,
  min: string,
  max: string
) => {
  return `${currency}${min} - ${currency}${max}`;
};

export const getJobType = (value: string) => {
  return JOB_TYPES.find((jt: Options) => jt.value === value)?.label;
};

export const getCurrencySymbol = (value: any) => {
  return CURRENCIES.find((cd: Options) => cd?.label === value)?.value;
};

export const getCurrencyLabel = (value: any) => {
  return CURRENCIES.find((cd: Options) => cd?.value === value)?.label;
};

export const logout = () => {
  removeCookies('USER_TOKEN');
  removeCookies('USER_ID');
  setCookies('USER_AUTHENTICATED', 'false');

  window.location.href = AUTH_ROUTES.LOGIN;
};
// remote_fulltime;
