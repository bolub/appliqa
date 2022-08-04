import API from '.';
import { getCookie } from 'cookies-next';
import { singleBoardProps, singleJobProps } from '../utils/GeneralProps';

export const fetchAllBoards = async () => {
  const response = await API.get(
    `/boards/?filters[userId][$eq]=${getCookie('USER_ID')}&populate=*`
  );

  return response.data.data;
};

export const fetchSingleBoard = async (id: string | number) => {
  const response = await API.get(
    `/boards/${id}?filters[userId][$eq]=${getCookie('USER_ID')}&populate=*`
  );

  return response.data.data;
};

export const createBoard = async (data: singleBoardProps) => {
  const response = await API.post(`/boards`, {
    data: { ...data },
  });

  return response.data.data;
};

export const updateBoard = async (data: {
  id: string | string[] | undefined | number;
  body: {
    jobs: string[];
  };
}) => {
  const response = await API.put(`/boards/${data.id}`, {
    data: { ...data.body },
  });

  return response.data.data;
};

export const updateStage = async (data: {
  id: string | number;
  body: {
    job_ids: string;
  };
}) => {
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

export const createJob = async (data: singleJobProps) => {
  const response = await API.post(`/jobs`, { data: { ...data } });

  return response.data.data;
};

export const deleteJob = async (data: { id: string | number }) => {
  const response = await API.delete(`/jobs/${data.id}`);

  return response.data.data;
};

export const updateJob = async (data: {
  id: string | number;
  body: Partial<singleJobProps>;
}) => {
  const response = await API.put(`/jobs/${data.id}`, {
    data: { ...data.body },
  });

  return response.data.data;
};
