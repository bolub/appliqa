import { JOB_TYPES } from './data';
import { Options } from './GeneralProps';

export const getRange = (currency: string, min: string, max: string) => {
  return `${currency}${min} - ${currency}${max}`;
};

export const getJobType = (value: string) => {
  return JOB_TYPES.find((jt: Options) => jt.value === value)?.label;
};

// remote_fulltime;
