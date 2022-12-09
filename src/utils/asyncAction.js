export const sendRequest = async (url, method, body = null) => {
  const response = await fetch(url, {
    method: method,
    body: JSON.stringify(body),
    headers: {
      "Content-type": "application/json",
    },
  });
  if (!response.status) {
    throw new Error(`Could not fetch ${url}, received ${response.status}`);
  }
  const result = await response.json();
  return result;
};
