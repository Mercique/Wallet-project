import { FETCH_STATUSES } from "../../utils/constants";
import {
  DELETE_PAYMENTS_SUCCESS,
  GET_PAYMENTS_FAILURE,
  GET_PAYMENTS_REQUEST,
  GET_PAYMENTS_SUCCESS,
  POST_PAYMENTS_SUCCESS,
  PUT_PAYMENTS_SUCCESS,
} from "./actions";

const initialState = {
  data: {},
  error: null,
  status: FETCH_STATUSES.IDLE,
};

const getMonthName = (date) => {
  const months = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];

  const inputDate = {
    day: date.slice(-2),
    month: months[date.slice(5, 7) - 1],
    year: date.slice(0, 4)
  }

  return `${inputDate.day} ${inputDate.month} ${inputDate.year}`;
};

const sortPaymentDate = (paymentList) => {
  const uniquePaymentDate = new Set(Array.from(paymentList, ({created_at}) => created_at.slice(0, 10)));

  const payments = paymentList.reduce(acc => {

    for (let date of uniquePaymentDate) {
      acc[getMonthName(date)] = [...paymentList.filter((payment) => payment.created_at.slice(0, 10) === date)];
    }

    return acc;
  }, {});

  return payments;
};

export const paymentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PAYMENTS_REQUEST: {
      return {
        ...state,
        error: null,
        status: FETCH_STATUSES.REQUEST,
      };
    }
    case GET_PAYMENTS_SUCCESS: {
      return {
        ...state,
        data: sortPaymentDate(action.payload),
        status: FETCH_STATUSES.SUCCESS,
      };
    }
    case GET_PAYMENTS_FAILURE: {
      return {
        ...state,
        error: action.payload,
        status: FETCH_STATUSES.FAILURE,
      };
    }
    case POST_PAYMENTS_SUCCESS: {
      return {
        data: sortPaymentDate(action.payload),
        error: null,
        status: FETCH_STATUSES.SUCCESS,
      };
    }
    case PUT_PAYMENTS_SUCCESS: {
      return {
        data: sortPaymentDate(action.payload),
        error: null,
        status: FETCH_STATUSES.SUCCESS,
      };
    }
    case DELETE_PAYMENTS_SUCCESS: {
      return {
        data: sortPaymentDate(action.payload),
        error: null,
        status: FETCH_STATUSES.SUCCESS,
      };
    }
    default: {
      return state;
    }
  }
};
