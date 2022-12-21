import { getData, sendRequest } from "../../utils/asyncActions";
import { apiPayments } from "../../utils/constants";

export const GET_PAYMENTS_REQUEST = "PAYMENTS::GET_PAYMENTS_REQUEST";
export const GET_PAYMENTS_SUCCESS = "PAYMENTS::GET_PAYMENTS_SUCCESS";
export const GET_PAYMENTS_FAILURE = "PAYMENTS::GET_PAYMENTS_FAILURE";
export const SORT_PAYMENTS_SUCCESS = "PAYMENTS::SORT_PAYMENTS_SUCCESS";
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

export const sortPaymentsSuccess = (payments) => ({
  type: SORT_PAYMENTS_SUCCESS,
  payload: payments,
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

export const getPayments = () => (dispatch) => {
  dispatch(getPaymentsRequest());

  getData(apiPayments)
    .then((result) => dispatch(getPaymentsSuccess(result)))
    .catch((err) => {
      console.warn(err);
      dispatch(getPaymentsFailure("Ошибка загрузки расходов!"));
    });
};

export const sortPayments = (url) => (dispatch) => {
  getData(url)
    .then((result) => dispatch(sortPaymentsSuccess(result)))
    .catch((err) => console.warn("Sort", err));
};

export const addPayment = (url, method, body) => (dispatch) => {
  sendRequest(url, method, body)
    .then((result) => dispatch(postPaymentsSuccess(result)))
    .catch((err) => console.log("POST err", err));
};

export const editPayment = (url, method, body) => (dispatch) => {
  sendRequest(url, method, body)
    .then((result) => dispatch(putPaymentsSuccess(result)))
    .catch((err) => console.log("PUT err", err));
};

export const deletePayment = (url, method, body) => (dispatch) => {
  sendRequest(url, method, body)
    .then((result) => dispatch(deletePaymentsSuccess(result)))
    .catch((err) => console.log("DELETE err", err));
};
