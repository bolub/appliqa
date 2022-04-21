import { CURRENCIES, JOB_TYPES } from './data';
import { Options } from './GeneralProps';

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
  console.log(value);
  return CURRENCIES.find((cd: Options) => cd?.value === value)?.label;
};

// remote_fulltime;
