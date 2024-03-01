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

export type hostintType = {
  id: number;
  name: string;
  slug: string;
  uid: string;
  whmcs_pid: number;
  product_url: string;
  details: string[];
} & Something;

type Something =
  | {
      price?: any;
    }
  | {
      product_pricing?: any;
    };

let test: hostintType = {
  id: 1,
  name: "hel",
  slug: "hel",
  uid: "hel",
  whmcs_pid: 5,
  product_url: "hel",
  details: ["w", "wef"],
};

if ("price" in test) {
  console.log(test.price);
}

if ("product_pricing" in test) {
  console.log(test.product_pricing);
}
