import API from '.';

export const loginOp = async (data: any) => {
  const response = await API.post(`/auth/local`, { ...data });
  return response.data;
};

export const signupOp = async (data: any) => {
  const response = await API.post(`/auth/local/register`, { ...data });
  return response.data;
};

export const forgotPasswordOp = async (data: any) => {
  const response = await API.post(`/auth/forgot-password`, { ...data });
  return response.data;
};

export const resetPasswordOp = async (data: any) => {
  const response = await API.post(`/auth/reset-password`, { ...data });
  return response.data;
};
