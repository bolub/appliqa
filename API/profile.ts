import API from '.';

export const fetchProfile = async () => {
  const response = await API.get(`/users/me`);
  return response.data;
};

export const updateProfile = async (data: {
  id: string | number;
  body: {
    fullname: string;
  };
}) => {
  const response = await API.put(`/users/${data.id}`, {
    ...data.body,
  });

  return response.data.data;
};

export const changePassword = async (userId: string | number) => {
  const response = await API.put(`/users/${userId}`);

  return response.data.data;
};
