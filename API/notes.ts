import { getCookie } from 'cookies-next';
import API from '.';

export const createNote = async (data: any) => {
  const response = await API.post(`/notes`, {
    data: { ...data },
  });

  return response.data.data;
};

export const updateNote = async (data: { id: string | number; body: any }) => {
  const response = await API.put(`/notes/${data.id}`, {
    data: { ...data.body },
  });

  return response.data.data;
};

export const deleteNote = async (data: { id: string | number }) => {
  const response = await API.delete(`/notes/${data.id}`);

  return response.data.data;
};

export const fetchNotes = async (jobId: string | number) => {
  const response = await API.get(
    `/notes?filters[$and][0][userId][$eq]=${getCookie(
      'USER_ID'
    )}&filters[$and][1][jobId][$eq]=${jobId}&populate=*`
  );

  return response.data.data;
};
