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

export const updateGoal = async (data: { id: string | number; body: any }) => {
  const response = await API.put(`/goals/${data.id}`, {
    data: { ...data.body },
  });

  return response.data.data;
};

export const deleteGoal = async (data: { id: string | number }) => {
  const response = await API.delete(`/goals/${data.id}`);

  return response.data.data;
};
