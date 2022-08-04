import { getCookie } from 'cookies-next';
import API from '.';
import { singleInterviewProps } from '../utils/GeneralProps';

export const createInterview = async (data: singleInterviewProps) => {
  const response = await API.post(`/interviews`, {
    data: { ...data },
  });

  return response.data.data;
};

export const updateInterview = async (data: {
  id: string | number;
  body: Omit<singleInterviewProps, 'userId' | 'jobId' | 'job' | 'boardId'>;
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

export const fetchInterviewsForAnalytics = async (
  boardId: string | number | undefined
) => {
  const response = await API.get(
    `/interviews?filters[$and][0][userId][$eq]=${getCookie(
      'USER_ID'
    )}&filters[$and][1][boardId][$eq]=${boardId}&populate=*`
  );

  return response.data.data;
};
