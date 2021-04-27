import axios from "axios";

export const fetchJsonData = async (url) => {
  const res = await axios.get(url);
  return res.data;
};

export const postJsonData = async (url, jsonData) => {
  const res = await axios.post(url, jsonData);
  return res.data;
};

export const deleteJsonData = async (url) => {
  const res = await axios.delete(url);
  return res.data;
};
