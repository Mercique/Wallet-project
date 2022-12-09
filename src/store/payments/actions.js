import { apiPayments } from "../../utils/constants";
import { sendRequest } from "../../utils/asyncAction";

export const GET_PAYMENTS_REQUEST = "PAYMENTS::GET_PAYMENTS_REQUEST";
export const GET_PAYMENTS_SUCCESS = "PAYMENTS::GET_PAYMENTS_SUCCESS";
export const GET_PAYMENTS_FAILURE = "PAYMENTS::GET_PAYMENTS_FAILURE";
export const POST_PAYMENTS_SUCCESS = "PAYMENTS::POST_PAYMENTS_SUCCESS";
export const PUT_PAYMENTS_SUCCESS = "PAYMENTS::PUT_PAYMENTS_SUCCESS";
export const DELETE_PAYMENTS_SUCCESS = "PAYMENTS::DELETE_PAYMENTS_SUCCESS";

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

export const postPaymentsSuccess = (payments) => ({
  type: POST_PAYMENTS_SUCCESS,
  payload: payments,
});

export const putPaymentsSuccess = (payments) => ({
  type: PUT_PAYMENTS_SUCCESS, 
  payload: payments,
});

export const deletePaymentsSuccess = (payments) => ({
  type: DELETE_PAYMENTS_SUCCESS,
  payload: payments,
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

export const addPayment = (url, method, body) => (dispatch) => {
  sendRequest(url, method, body)
    .then((result) => dispatch(postPaymentsSuccess(result)))
    .catch((err) => console.log("err", err));
};

export const editPayment = (url, method, body) => (dispatch) => {
  sendRequest(url, method, body)
    .then((result) => dispatch(putPaymentsSuccess(result)))
    .catch((err) => console.log("err", err));
};

export const deletePayment = (url, method, body) => (dispatch) => {
  sendRequest(url, method, body)
    .then((result) => dispatch(deletePaymentsSuccess(result)))
    .catch((err) => console.log("err", err));
};
