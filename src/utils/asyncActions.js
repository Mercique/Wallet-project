export const getData = async (url) => {
  const response = await fetch(url, {
    credentials: "include",
    headers: {
      "Accept": "application/json",
      "Content-type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Could not getData ${url}, received ${response.status}`);
  }

  const result = await response.json();
  return result;
};

export const sendRequest = async (url, method, body = null) => {
  const response = await fetch(url, {
    method: method,
    body: JSON.stringify(body),
    credentials: "include",
    headers: {
      "Accept": "application/json",
      "Content-type": "application/json",
    },
  });

  const result = await response.json();
  return result;
};
