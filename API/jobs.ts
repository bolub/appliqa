import axios from 'axios';
import { getCookie } from 'cookies-next';

export const fetchAllJobs = async (page = 1) => {
  const response = await axios.get(
    `https://www.themuse.com/api/public/jobs?category=Design%20and%20UX&category=Software%20Engineer&category=UX&page=${page}`
  );

  return response.data;
};
