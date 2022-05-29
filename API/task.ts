import { getCookie } from 'cookies-next';
import API from '.';

export const createTask = async (data: any) => {
  const response = await API.post(`/tasks`, {
    data: { ...data },
  });

  return response.data.data;
};

export const updateTask = async (data: { id: string | number; body: any }) => {
  const response = await API.put(`/tasks/${data.id}`, {
    data: { ...data.body },
  });

  return response.data.data;
};

export const deleteTask = async (data: { id: string | number }) => {
  const response = await API.delete(`/tasks/${data.id}`);

  return response.data.data;
};

export const fetchTasks = async (jobId: string | number) => {
  const response = await API.get(
    `/tasks?filters[$and][0][userId][$eq]=${getCookie(
      'USER_ID'
    )}&filters[$and][1][jobId][$eq]=${jobId}&populate=*`
  );

  return response.data.data;
};

export const fetchTasksForAnalytics = async (boardId: string | number) => {
  const response = await API.get(
    `/tasks?filters[$and][0][userId][$eq]=${getCookie(
      'USER_ID'
    )}&filters[$and][1][boardId][$eq]=${boardId}&populate=*`
  );

  return response.data.data;
};
