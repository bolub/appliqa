import { CURRENCIES, JOB_TYPES } from './data';
import { Options } from './GeneralProps';
import { removeCookies, setCookies } from 'cookies-next';
import { AUTH_ROUTES } from './routes';

export const formatNumber = (num: number, currency: string) => {
  const formattedNumber = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
  }).format(num);

  return formattedNumber;
};

export const getRange = (
  currency: string = 'USD',
  min: string,
  max: string
) => {
  return `${formatNumber(Number(min), currency)} - ${formatNumber(
    Number(max),
    currency
  )}`;
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
