import API from '.';

export const loginOp = async (data: {
  identifier: string;
  password: string;
}) => {
  const response = await API.post(`/auth/local`, { ...data });
  return response.data;
};

export const signupOp = async (data: {
  email: string;
  password: string;
  fullname: string;
  username: string;
}) => {
  const response = await API.post(`/auth/local/register`, { ...data });
  return response.data;
};

export const reSendEmailConfirmation = async (data: { email: string }) => {
  const response = await API.post(`/auth/send-email-confirmation`, { ...data });
  return response.data;
};

export const forgotPasswordOp = async (data: { email: string }) => {
  const response = await API.post(`/auth/forgot-password`, { ...data });
  return response.data;
};

export const resetPasswordOp = async (data: {
  password: string;
  code: string;
  passwordConfirmation: string;
}) => {
  const response = await API.post(`/auth/reset-password`, { ...data });
  return response.data;
};
