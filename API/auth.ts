import API from '.';

export const loginOp = async (data: any) => {
  const response = await API.post(`/auth/local`, { ...data });
  return response.data;
};

export const signupOp = async (data: any) => {
  const response = await API.post(`/auth/local/register`, { ...data });
  return response.data;
};
