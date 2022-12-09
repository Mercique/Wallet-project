import { apiPayments } from "../../utils/constants";

export const GET_PAYMENTS_REQUEST = "PAYMENTS::GET_PAYMENTS_REQUEST";
export const GET_PAYMENTS_SUCCESS = "PAYMENTS::GET_PAYMENTS_SUCCESS";
export const GET_PAYMENTS_FAILURE = "PAYMENTS::GET_PAYMENTS_FAILURE";

export const getPaymentsRequest = () => ({
  type: GET_PAYMENTS_REQUEST,
});

export const getPaymentsSuccess = (payments) => ({
  type: GET_PAYMENTS_SUCCESS,
  payload: payments,
});

export const getPaymentsFailure = (error) => ({
  type: GET_PAYMENTS_FAILURE,
  payload: error,
});

export const getPayments = () => async (dispatch) => {
  dispatch(getPaymentsRequest());

  try {
    const response = await fetch(apiPayments);
    if (!response.status) {
      console.log(response.status);
      throw new Error(`Could not fetch ${apiPayments}, received ${response.status}`);
    }
    const result = await response.json();
    dispatch(getPaymentsSuccess(result));
  } catch (err) {
    dispatch(getPaymentsFailure(`${err.name}: Ошибка загрузки списка трат!`));
    console.warn(err);
  }
};

const sendRequest = async (url, method, body = null) => {
  const response = await fetch(url, {
    method: method,
    body: JSON.stringify(body),
    headers: {
      "Content-type": "application/json",
    }
  });
  if (!response.status) {
    throw new Error(`Could not fetch ${url}, received ${response.status}`);
  }
  const result = await response.json();
  return result;
};

export const addNewPayment = (url, method, body) => async (dispatch) => {
  sendRequest(url, method, body)
    .then((result) => console.log("res", result))
    .catch((err) => console.log("err", err));
};
