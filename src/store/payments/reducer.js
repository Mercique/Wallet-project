import { FETCH_STATUSES, sortPaymentDate } from "../../utils/constants";
import {
  DELETE_PAYMENTS_SUCCESS,
  GET_PAYMENTS_FAILURE,
  GET_PAYMENTS_REQUEST,
  GET_PAYMENTS_SUCCESS,
  POST_PAYMENTS_FAILURE,
  POST_PAYMENTS_SUCCESS,
  PUT_PAYMENTS_FAILURE,
  PUT_PAYMENTS_SUCCESS,
  SORT_PAYMENTS_SUCCESS,
} from "./actions";

const initialState = {
  data: {},
  error: null,
  postError: null,
  putError: null,
  status: FETCH_STATUSES.IDLE,
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
        postError: null,
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
    case SORT_PAYMENTS_SUCCESS: {
      return {
        ...state,
        data: sortPaymentDate(action.payload),
        status: FETCH_STATUSES.SUCCESS,
      };
    }
    case POST_PAYMENTS_SUCCESS: {
      return {
        data: sortPaymentDate(action.payload),
        error: null,
        postError: null,
        status: FETCH_STATUSES.SUCCESS,
      };
    }
    case POST_PAYMENTS_FAILURE: {
      return {
        ...state,
        postError: action.payload,
        status: FETCH_STATUSES.FAILURE,
      };
    }
    case PUT_PAYMENTS_SUCCESS: {
      return {
        data: sortPaymentDate(action.payload),
        error: null,
        putError: null,
        status: FETCH_STATUSES.SUCCESS,
      };
    }
    case PUT_PAYMENTS_FAILURE: {
      return {
        ...state,
        putError: action.payload,
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
