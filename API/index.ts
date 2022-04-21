import axios from 'axios';
import { getCookie } from 'cookies-next';

const tokenAuth = { Authorization: `Bearer ${getCookie('USER_TOKEN')}` };
const emptyHeader = {};

const headerData = getCookie('USER_TOKEN') ? tokenAuth : emptyHeader;

export default axios.create({
  baseURL: 'http://localhost:1337/api',
  headers: headerData,
});
