import API from '.';
import { getCookie } from 'cookies-next';

export const fetchGoals = async () => {
  const response = await API.get(
    `/goals?filters[userId][$eq]=${getCookie('USER_ID')}&populate=*`
  );

  return response.data.data;
};

export const createGoal = async (data: any) => {
  const response = await API.post(`/goals`, {
    data: { ...data },
  });

  return response.data.data;
};
