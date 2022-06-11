import { CURRENCIES, JOB_TYPES } from './data';
import { Options } from './GeneralProps';
import { removeCookies, setCookies } from 'cookies-next';
import { AUTH_ROUTES } from './routes';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

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

export const formatDateAgo = (date: Date) => {
  return dayjs(date).fromNow();
};

export const formatDataForBoard = (data: any, boardId?: string | number) => {
  const columnOrder =
    data?.attributes?.stage_order?.data?.attributes?.order.split(',');

  const columns = data?.attributes?.stages?.data
    .map((cd: any) => {
      return {
        id: cd?.id,
        slug: cd?.attributes?.slug,
        title: cd?.attributes?.title,
        taskIds: cd?.attributes?.job_ids
          ? cd?.attributes?.job_ids?.split(',')
          : [],
      };
    })
    .reduce((obj: any, cur: any) => ({ ...obj, [cur?.slug]: cur }), {});

  const tasks = data?.attributes?.jobs?.data
    ?.map((cd: any) => {
      if (
        Number(boardId) &&
        Number(cd?.attributes?.boardId) === Number(boardId)
      ) {
        return {
          id: cd?.id,
          ...cd.attributes,
        };
      } else {
        return {
          id: cd?.id,
          ...cd.attributes,
        };
      }
    })
    ?.reduce((obj: any, cur: any) => ({ ...obj, [cur?.slug]: cur }), {});

  return {
    columnOrder,
    columns,
    tasks,
  };
};
// remote_fulltime;
