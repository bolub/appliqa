import axios from "axios";
import API from ".";

export const fetchAllJobs = async (page = 1, filters?: string) => {
  const response = await axios.get(
    // `https://www.themuse.com/api/public/jobs?category=Design%20and%20UX&category=Software%20Engineer&category=UX&page=${page}`
    `https://www.themuse.com/api/public/jobs?page=${page}&${filters}`
  );
  return response.data;
};

export const fetchJobSites = async () => {
  const response = await API.get(`/job-sites`);
  return response.data;
};

export const fetchJobTips = async () => {
  const response = await API.get(`/job-tips`);
  return response.data;
};
