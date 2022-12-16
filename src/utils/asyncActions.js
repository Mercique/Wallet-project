import axios from "axios";

export const getData = async (url) => {
  const response = await axios.get(url, {
    withCredentials: true,
    headers: {
      "Accept": "application/json",
      "Content-type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Could not fetch ${url}, received ${response.status}`);
  }

  return response.data;
};

export const sendRequest = async (url, method, body = null) => {
  const response = await fetch(url, {
    method: method,
    body: JSON.stringify(body),
    headers: {
      "Accept": "application/json",
      "Content-type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(`Could not send request ${url}, received ${response.status}`);
  }
  const result = await response.json();

  return result;
};
