import axios from "axios";


const BACKEND_API = 'http://localhost:8000/';

function reqHeaders() {
  if (localStorage.getItem('token') !== null && localStorage.getItem('token') !== '' && localStorage.getItem('token') !== 'undefined') {
    const accesstoken = localStorage.getItem('token');
    console.log("accesstoken", accesstoken)
    axios.defaults.headers.common['Authorization'] = `Bearer ${accesstoken}`;
    axios.defaults.headers.common['Content-Type'] = 'application/json';
  }
}


export function postRequestAPI({ url = '', data = {} }) {
  reqHeaders();
  return axios.post(`${BACKEND_API}${url}`, data);
}

export function getRequestAPI({ url = '', params = {} }) {
  reqHeaders();
  return axios.get(`${BACKEND_API}${url}`, params);
}

export function postWithoutHeaderRequestAPI({ url = '', data = {} }) {
  return  axios.post(`${BACKEND_API}${url}`, data);
}

export function getWithoutHeaderRequestAPI({ url = '', params = {} }) {
  return axios.get(`${BACKEND_API}${url}`, params);
}

export function deleteRequestApi({ url = '', data = {} }) {
  return axios.delete(`${BACKEND_API}${url}`, data);
}