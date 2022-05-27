import axios from 'axios';

export const fetchAllJobs = async (page = 1, filters?: string) => {
  const response = await axios.get(
    // `https://www.themuse.com/api/public/jobs?category=Design%20and%20UX&category=Software%20Engineer&category=UX&page=${page}`
    `https://www.themuse.com/api/public/jobs?page=${page}&${filters}`
  );
  return response.data;
};
