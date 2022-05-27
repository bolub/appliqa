import { getCookie } from 'cookies-next';
import API from '.';

export const createInterview = async (data: any) => {
  const response = await API.post(`/interviews`, {
    data: { ...data },
  });

  return response.data.data;
};

export const updateInterview = async (data: {
  id: string | number;
  body: any;
}) => {
  const response = await API.put(`/interviews/${data.id}`, {
    data: { ...data.body },
  });

  return response.data.data;
};

export const deleteInterview = async (data: { id: string | number }) => {
  const response = await API.delete(`/interviews/${data.id}`);

  return response.data.data;
};

export const fetchInterviews = async (jobId: string | number) => {
  const response = await API.get(
    `/interviews?filters[$and][0][userId][$eq]=${getCookie(
      'USER_ID'
    )}&filters[$and][1][jobId][$eq]=${jobId}&populate=*`
  );

  return response.data.data;
};
