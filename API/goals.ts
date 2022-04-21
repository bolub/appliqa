import API from '.';

export const fetchGoals = async () => {
  const response = await API.get(`/goals`);

  return response.data.data;
};

export const createGoal = async (data: any) => {
  const response = await API.post(`/goals`, { data: { ...data } });

  return response.data.data;
};
