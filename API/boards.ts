import API from '.';
import { getCookie } from 'cookies-next';

// export const fetchJobs = async () => {
//   const response = await API.get(`/jobs`);

//   return response.data.data;
// };

// export const fetchStages = async () => {
//   const response = await API.get(`/stages`);

//   return response.data.data;
// };
// export const fetchStageOrders = async () => {
//   const response = await API.get(`/stage-orders`);

//   return response.data.data;
// };

export const fetchAllBoards = async () => {
  const response = await API.get(
    `/boards/?filters[userId][$eq]=${getCookie('USER_ID')}&populate=*`
  );

  return response.data.data;
};

export const fetchSingleBoard = async (id: string | number) => {
  const response = await API.get(`/boards/${id}?populate=*`);

  return response.data.data;
};

export const updateStage = async (data: { id: string | number; body: any }) => {
  const response = await API.put(`/stages/${data.id}`, {
    data: { ...data.body },
  });

  return response.data.data;
};

export const updateStageOrder = async (data: {
  id: string | number;
  body: string[];
}) => {
  const response = await API.put(`/stages/${data.id}`, {
    data: { ...data.body },
  });

  return response.data.data;
};

export const createJob = async (data: any) => {
  const response = await API.post(`/jobs`, { data: { ...data } });

  return response.data.data;
};

export const updateBoard = async (data: { id: string | number; body: any }) => {
  const response = await API.put(`/boards/${data.id}`, {
    data: { ...data.body },
  });

  return response.data.data;
};
