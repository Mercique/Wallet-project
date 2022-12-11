export const getData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Could not fetch ${url}, received ${response.status}`);
  }
  const result = await response.json();

  return result;
};

export const sendRequest = async (url, method, body = null) => {
  const response = await fetch(url, {
    method: method,
    body: JSON.stringify(body),
    headers: {
      "Content-type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(`Could not send request ${url}, received ${response.status}`);
  }
  const result = await response.json();

  return result;
};
