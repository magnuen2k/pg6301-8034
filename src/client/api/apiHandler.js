import axios from "axios";

export const fetchJsonData = async (url) => {
  const res = await axios.get(url);
  //checkResult(res, url);
  return res.data;
};

export const postJsonData = async (url, jsonData) => {
  const res = await axios.post(url, jsonData);
  return res.data;
  //checkResult(res, url);
};

export const deleteJsonData = async (url) => {
  const res = await axios.delete(url);
  return res.data;
  //checkResult(res, url);
};

const checkResult = (res, url) => {
  if (!res.ok) {
    throw new HttpException(res, url);
  }
};

class HttpException extends Error {
  constructor(res, url) {
    super(`Error while loading ${url}: ${res.status} ${res.statusText}`);
    this.status = res.status;
  }
}
